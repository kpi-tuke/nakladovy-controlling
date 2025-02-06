"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const fs = require("fs");
const icon = path.join(__dirname, "./chunks/icon-D6bAUhBQ.png");
class MenuBuilder {
  mainWindow;
  constructor(mainWindow2) {
    this.mainWindow = mainWindow2;
  }
  buildMenu() {
    const template = [
      ...process.platform === "darwin" ? [
        {
          label: electron.app.name,
          submenu: [
            {
              label: "O Nákladovom kontrolingu",
              click: () => electron.app.showAboutPanel()
            },
            { type: "separator" },
            { label: "Služby", role: "services", submenu: [] },
            { type: "separator" },
            {
              label: "Skryť Nákladový kontroling",
              accelerator: "Cmd+H",
              role: "hide"
            },
            {
              label: "Skryť ostatné",
              accelerator: "Cmd+Alt+H",
              role: "hideOthers"
            },
            { label: "Zobraziť všetky", role: "unhide" },
            { type: "separator" },
            { label: "Zavrieť", accelerator: "Cmd+Q", role: "quit" }
          ]
        }
      ] : [],
      // File Menu
      {
        label: "Súbor",
        submenu: [
          {
            label: "Nový",
            accelerator: "CmdOrCtrl+N",
            click: () => this.mainWindow.webContents.send("menu-new-project")
          },
          {
            label: "Otvoriť",
            accelerator: "CmdOrCtrl+O",
            click: () => this.mainWindow.webContents.send("menu-open-project")
          },
          {
            label: "Uložiť",
            accelerator: "CmdOrCtrl+S",
            click: () => this.mainWindow.webContents.send("menu-save-project")
          },
          {
            label: "Tlačiť",
            accelerator: "CmdOrCtrl+P",
            click: () => this.mainWindow.webContents.send("menu-print-project")
          },
          { type: "separator" },
          {
            label: "Zobraziť report",
            accelerator: "CmdOrCtrl+R",
            click: () => this.mainWindow.webContents.send("menu-open-report")
          },
          {
            label: "Zavrieť",
            role: process.platform === "darwin" ? "close" : "quit"
          }
        ]
      },
      // Edit Menu
      {
        label: "Upraviť",
        submenu: [
          { label: "Späť", accelerator: "CmdOrCtrl+Z", role: "undo" },
          { label: "Znova", accelerator: "CmdOrCtrl+Shift+Z", role: "redo" },
          { type: "separator" },
          { label: "Vystrihnúť", accelerator: "CmdOrCtrl+X", role: "cut" },
          { label: "Kopírovať", accelerator: "CmdOrCtrl+C", role: "copy" },
          { label: "Vložiť", accelerator: "CmdOrCtrl+V", role: "paste" },
          {
            label: "Vybrať všetko",
            accelerator: "CmdOrCtrl+A",
            role: "selectAll"
          }
        ]
      },
      // Window Menu (macOS only)
      ...process.platform === "darwin" ? [
        {
          label: "Okno",
          submenu: [
            {
              label: "Minimalizovať",
              accelerator: "Cmd+M",
              role: "minimize"
            },
            { label: "Priblížiť", role: "zoom" },
            { type: "separator" },
            { label: "Presunúť všetko dopredu", role: "front" }
          ]
        }
      ] : [],
      // Help Menu
      {
        label: "Pomoc",
        submenu: [
          {
            label: "Dokumentácia",
            click: () => electron.shell.openExternal(
              "https://git.kpi.fei.tuke.sk/kpi-zp/2025/dp.filip.katusin/diplomovka"
            )
          }
        ]
      }
    ];
    const menu = electron.Menu.buildFromTemplate(template);
    electron.Menu.setApplicationMenu(menu);
    return menu;
  }
}
let mainWindow;
const installExtensions = async () => {
  const installer = require("electron-devtools-installer");
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"];
  return installer.default(
    extensions.map((name) => installer[name]),
    forceDownload
  ).catch(console.log);
};
const createWindow = async () => {
  {
    await installExtensions();
  }
  const RESOURCES_PATH = electron.app.isPackaged ? path.join(process.resourcesPath, "assets") : path.join(__dirname, "../../assets");
  const getAssetPath = (...paths) => {
    return path.join(RESOURCES_PATH, ...paths);
  };
  mainWindow = new electron.BrowserWindow({
    width: 1600,
    height: 900,
    show: false,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    icon: getAssetPath("icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false,
      nodeIntegration: true,
      // @ts-ignore
      enableRemoteModule: true
    }
  });
  mainWindow.on("ready-to-show", () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.maximize();
    }
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  mainWindow.webContents.on("new-window", (event, url) => {
    event.preventDefault();
    electron.shell.openExternal(url);
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
};
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.setAboutPanelOptions({
    applicationName: "Nákladový kontroling",
    applicationVersion: electron.app.getVersion(),
    copyright: "Copyright © 2025 TUKE",
    website: "https://git.kpi.fei.tuke.sk/kpi-zp/2025/dp.filip.katusin/diplomovka",
    credits: "Aurel Holotňák and Filip Katušin"
  });
  createWindow();
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.ipcMain.on("open", async (event) => {
  const file = await electron.dialog.showOpenDialog({
    title: "Zvoľte súbor",
    buttonLabel: "Otvoriť",
    filters: [
      {
        name: "JSON",
        extensions: ["json"]
      }
    ],
    properties: ["openFile"]
  });
  if (!file.canceled) {
    fs.open(file.filePaths[0], "r", function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Opened Successfully");
      }
    });
    fs.readFile(file.filePaths[0], "utf8", function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        event.reply("open", data);
      }
    });
  }
});
electron.ipcMain.handle("chooseFilePath", async () => {
  const { filePath } = await electron.dialog.showSaveDialog({
    title: "Zvoľte umiestnenie súboru",
    buttonLabel: "Uložiť",
    defaultPath: "nákladový_controlling",
    filters: [
      {
        name: "JSON",
        extensions: ["json"]
      }
    ],
    properties: []
  });
  return filePath;
});
electron.ipcMain.handle("save", async (_, state) => {
  const { path: path2, data } = JSON.parse(state);
  if (path2) {
    fs.open(path2, "w+", function(err) {
      if (err) {
        console.log(err);
        return false;
      } else {
        console.log("Opened Successfully");
      }
    });
    fs.writeFile(path2, JSON.stringify(data), function(err) {
      if (err) {
        console.log(err);
        return false;
      } else {
        console.log("Saved Successfully");
      }
    });
    return true;
  }
  return false;
});
electron.ipcMain.handle("printToPDF", async (_, fileName) => {
  let maximized = false;
  let fullScreened = false;
  if (mainWindow?.isFullScreen()) {
    mainWindow?.setFullScreen(false);
    fullScreened = true;
    console.log("fullScreened");
  } else if (mainWindow?.isMaximized()) {
    mainWindow?.unmaximize();
    maximized = true;
    console.log("maximized");
  }
  const [width, height] = mainWindow?.getSize() ?? [0, 0];
  mainWindow?.setSize(800, height);
  const options = {
    pageSize: "A4",
    printBackground: true,
    landscape: false
  };
  const file = await electron.dialog.showSaveDialog({
    title: "Zvoľte umiestnenie súboru",
    buttonLabel: "Uložiť",
    defaultPath: fileName,
    filters: [
      {
        name: "PDF",
        extensions: ["pdf"]
      }
    ],
    properties: []
  });
  if (!file.canceled) {
    try {
      const data = await mainWindow?.webContents.printToPDF(options);
      fs.open(file.filePath.toString(), "w+", (err) => {
        if (err) {
          console.log(err);
          return false;
        } else {
          console.log("PDF Opened Successfully");
        }
      });
      fs.writeFile(file.filePath.toString(), data, (err) => {
        if (err) {
          console.log(err);
          return false;
        } else {
          console.log("PDF Generated Successfully");
          return "okej";
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
electron.ipcMain.handle("getAppVersion", () => {
  return electron.app.getVersion();
});
electron.ipcMain.on("quit", async () => {
  mainWindow?.close();
});
