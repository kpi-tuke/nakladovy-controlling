"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const fs = require("fs");
const icon = path.join(__dirname, "../../resources/icon.png");
class MenuBuilder {
  mainWindow;
  constructor(mainWindow2) {
    this.mainWindow = mainWindow2;
  }
  buildMenu() {
    if (process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true") {
      this.setupDevelopmentEnvironment();
    }
    const template = process.platform === "darwin" ? this.buildDarwinTemplate() : this.buildDefaultTemplate();
    const menu = electron.Menu.buildFromTemplate(template);
    electron.Menu.setApplicationMenu(menu);
    return menu;
  }
  setupDevelopmentEnvironment() {
    this.mainWindow.webContents.on("context-menu", (_, props) => {
      const { x, y } = props;
      electron.Menu.buildFromTemplate([
        {
          label: "Inspect element",
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          }
        }
      ]).popup({ window: this.mainWindow });
    });
  }
  buildDarwinTemplate() {
    const subMenuAbout = {
      label: "Electron",
      submenu: [
        {
          label: "About ElectronReact",
          selector: "orderFrontStandardAboutPanel:"
        },
        { type: "separator" },
        { label: "Services", submenu: [] },
        { type: "separator" },
        {
          label: "Hide ElectronReact",
          accelerator: "Command+H",
          selector: "hide:"
        },
        {
          label: "Hide Others",
          accelerator: "Command+Shift+H",
          selector: "hideOtherApplications:"
        },
        { label: "Show All", selector: "unhideAllApplications:" },
        { type: "separator" },
        {
          label: "Quit",
          accelerator: "Command+Q",
          click: () => {
            electron.app.quit();
          }
        }
      ]
    };
    const subMenuEdit = {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "Command+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+Command+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "Command+X", selector: "cut:" },
        { label: "Copy", accelerator: "Command+C", selector: "copy:" },
        { label: "Paste", accelerator: "Command+V", selector: "paste:" },
        {
          label: "Select All",
          accelerator: "Command+A",
          selector: "selectAll:"
        }
      ]
    };
    const subMenuViewDev = {
      label: "View",
      submenu: [
        {
          label: "Reload",
          accelerator: "Command+R",
          click: () => {
            this.mainWindow.webContents.reload();
          }
        },
        {
          label: "Toggle Full Screen",
          accelerator: "Ctrl+Command+F",
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        },
        {
          label: "Toggle Developer Tools",
          accelerator: "Alt+Command+I",
          click: () => {
            this.mainWindow.webContents.toggleDevTools();
          }
        }
      ]
    };
    const subMenuViewProd = {
      label: "View",
      submenu: [
        {
          label: "Toggle Full Screen",
          accelerator: "Ctrl+Command+F",
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        }
      ]
    };
    const subMenuWindow = {
      label: "Window",
      submenu: [
        {
          label: "Minimize",
          accelerator: "Command+M",
          selector: "performMiniaturize:"
        },
        { label: "Close", accelerator: "Command+W", selector: "performClose:" },
        { type: "separator" },
        { label: "Bring All to Front", selector: "arrangeInFront:" }
      ]
    };
    const subMenuHelp = {
      label: "Help",
      submenu: [
        {
          label: "Learn More",
          click() {
            electron.shell.openExternal("https://electronjs.org");
          }
        },
        {
          label: "Documentation",
          click() {
            electron.shell.openExternal(
              "https://github.com/electron/electron/tree/main/docs#readme"
            );
          }
        },
        {
          label: "Community Discussions",
          click() {
            electron.shell.openExternal("https://www.electronjs.org/community");
          }
        },
        {
          label: "Search Issues",
          click() {
            electron.shell.openExternal("https://github.com/electron/electron/issues");
          }
        }
      ]
    };
    const subMenuView = process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true" ? subMenuViewDev : subMenuViewProd;
    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
  }
  buildDefaultTemplate() {
    return [
      {
        label: "&File",
        submenu: [
          {
            label: "&Open",
            accelerator: "Ctrl+O"
          },
          {
            label: "&Close",
            accelerator: "Ctrl+W",
            click: () => {
              this.mainWindow.close();
            }
          }
        ]
      },
      {
        label: "&View",
        submenu: process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true" ? [
          {
            label: "&Reload",
            accelerator: "Ctrl+R",
            click: () => {
              this.mainWindow.webContents.reload();
            }
          },
          {
            label: "Toggle &Full Screen",
            accelerator: "F11",
            click: () => {
              this.mainWindow.setFullScreen(
                !this.mainWindow.isFullScreen()
              );
            }
          },
          {
            label: "Toggle &Developer Tools",
            accelerator: "Alt+Ctrl+I",
            click: () => {
              this.mainWindow.webContents.toggleDevTools();
            }
          }
        ] : [
          {
            label: "Toggle &Full Screen",
            accelerator: "F11",
            click: () => {
              this.mainWindow.setFullScreen(
                !this.mainWindow.isFullScreen()
              );
            }
          }
        ]
      },
      {
        label: "Help",
        submenu: [
          {
            label: "Learn More",
            click() {
              electron.shell.openExternal("https://electronjs.org");
            }
          },
          {
            label: "Documentation",
            click() {
              electron.shell.openExternal(
                "https://github.com/electron/electron/tree/main/docs#readme"
              );
            }
          },
          {
            label: "Community Discussions",
            click() {
              electron.shell.openExternal("https://www.electronjs.org/community");
            }
          },
          {
            label: "Search Issues",
            click() {
              electron.shell.openExternal("https://github.com/electron/electron/issues");
            }
          }
        ]
      }
    ];
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
const isDevelopment = process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true";
const createWindow = async () => {
  if (isDevelopment) {
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
electron.ipcMain.on("quit", async () => {
  mainWindow?.close();
});
