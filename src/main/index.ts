import {
  app,
  shell,
  BrowserWindow,
  ipcMain,
  dialog,
  PrintToPDFOptions,
} from 'electron';
import { join } from 'path';

import { optimizer, is, electronApp } from '@electron-toolkit/utils';
import icon from '../../assets/icon.png?asset';
import MenuBuilder from './menu';
import path from 'path';
import fs from 'fs';

let mainWindow: BrowserWindow | null;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (import.meta.env.DEV) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      // @ts-ignore
      enableRemoteModule: true,
    },
  });

  mainWindow.on('ready-to-show', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.maximize();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // Open urls in the user's browser
  // @ts-ignore
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');

  app.setAboutPanelOptions({
    applicationName: 'Nákladový kontroling',
    applicationVersion: app.getVersion(),
    copyright: 'Copyright © 2025 TUKE',
    website:
      'https://git.kpi.fei.tuke.sk/kpi-zp/2025/dp.filip.katusin/diplomovka',
    credits: 'Aurel Holotňák and Filip Katušin',
  });

  createWindow();

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// ---- IPC ---
ipcMain.on('open', async (event) => {
  const file = await dialog.showOpenDialog({
    title: 'Zvoľte súbor',
    buttonLabel: 'Otvoriť',
    filters: [
      {
        name: 'JSON',
        extensions: ['json'],
      },
    ],
    properties: ['openFile'],
  });

  if (!file.canceled) {
    // @ts-ignore
    fs.open(file.filePaths[0], 'r', function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Opened Successfully');
      }
    });
    // @ts-ignore
    fs.readFile(file.filePaths[0], 'utf8', function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);

        event.reply('open', data);
      }
    });
  }
});

ipcMain.handle('chooseFilePath', async () => {
  const { filePath } = await dialog.showSaveDialog({
    title: 'Zvoľte umiestnenie súboru',
    buttonLabel: 'Uložiť',
    defaultPath: 'nákladový_controlling',
    filters: [
      {
        name: 'JSON',
        extensions: ['json'],
      },
    ],
    properties: [],
  });

  return filePath;
});

ipcMain.handle('save', async (_, state) => {
  const { path, data } = JSON.parse(state);

  if (path) {
    // @ts-ignore
    fs.open(path, 'w+', function (err) {
      if (err) {
        console.log(err);
        return false;
      } else {
        console.log('Opened Successfully');
      }
    });
    // @ts-ignore
    fs.writeFile(path, JSON.stringify(data), function (err) {
      if (err) {
        console.log(err);
        return false;
      } else {
        console.log('Saved Successfully');
      }
    });

    return true;
  }

  return false;
});

ipcMain.handle('printToPDF', async (_, fileName: string) => {
  let maximized = false;
  let fullScreened = false;
  if (mainWindow?.isFullScreen()) {
    mainWindow?.setFullScreen(false);
    fullScreened = true;
    console.log('fullScreened');
  } else if (mainWindow?.isMaximized()) {
    mainWindow?.unmaximize();
    maximized = true;
    console.log('maximized');
  }

  const [width, height] = mainWindow?.getSize() ?? [0, 0];

  mainWindow?.setSize(800, height);

  const options: PrintToPDFOptions = {
    pageSize: 'A4',
    printBackground: true,
    landscape: false,
  };

  const file = await dialog.showSaveDialog({
    title: 'Zvoľte umiestnenie súboru',
    buttonLabel: 'Uložiť',
    defaultPath: fileName,
    filters: [
      {
        name: 'PDF',
        extensions: ['pdf'],
      },
    ],
    properties: [],
  });

  if (!file.canceled) {
    try {
      const data = await mainWindow?.webContents.printToPDF(options);

      // @ts-ignore
      fs.open(file.filePath.toString(), 'w+', (err) => {
        if (err) {
          console.log(err);
          return false;
        } else {
          console.log('PDF Opened Successfully');
        }
      });
      // @ts-ignore
      fs.writeFile(file.filePath.toString(), data, (err) => {
        if (err) {
          console.log(err);
          return false;
        } else {
          console.log('PDF Generated Successfully');
          return 'okej';
        }
      });

      if (maximized) {
        mainWindow?.maximize();
      } else if (fullScreened) {
        mainWindow?.setFullScreen(true);
      } else {
        mainWindow?.setSize(width, height);
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  } else {
    return false;
  }

  return true;
});

ipcMain.handle('getAppVersion', () => {
  return app.getVersion();
});

ipcMain.on('quit', async () => {
  mainWindow?.close();
});
