/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import fs from 'fs';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

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

ipcMain.on('printToPDF', async (event, fileName: string) => {
  let maximized = false;
  let fullScreened = false;
  if (mainWindow?.isFullScreen()) {
    mainWindow?.setFullScreen(false);
    fullScreened = true;
  }
  if (mainWindow?.isMaximized()) {
    mainWindow?.unmaximize();
    maximized = true;
  }
  // @ts-ignore
  const [width, height] = mainWindow?.getSize();
  mainWindow?.setSize(850, height);

  const options = {
    marginsType: 0,
    pageSize: 'A4',
    printBackground: true,
    printSelectionOnly: false,
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
    mainWindow?.webContents
      .printToPDF(options)
      .then((data) => {
        // @ts-ignore
        fs.open(file.filePath.toString(), 'w+', function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('PDF Opened Successfully');
          }
        });
        // @ts-ignore
        fs.writeFile(file.filePath.toString(), data, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('PDF Generated Successfully');
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  if (maximized) mainWindow?.maximize();
  if (fullScreened) mainWindow?.setFullScreen(true);
  else mainWindow?.setSize(width, height);
  event.reply('printToPDF', 'printed');
});

ipcMain.on('quit', async () => {
  mainWindow?.close();
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1600,
    height: 900,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      // @ts-ignore
      enableRemoteModule: true,
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));
  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.maximize();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
