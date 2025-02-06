"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  printToPdf: (fileName) => electron.ipcRenderer.invoke("printToPDF", fileName),
  chooseFilePath: () => electron.ipcRenderer.invoke("chooseFilePath"),
  saveProject: (state) => electron.ipcRenderer.invoke("save", state),
  openProject: () => electron.ipcRenderer.send("open"),
  onOpen(channel, func) {
    const validChannels = ["open"];
    if (validChannels.includes(channel)) {
      electron.ipcRenderer.on(channel, (_, ...args) => func(...args));
    }
  },
  getAppVersion: () => electron.ipcRenderer.invoke("getAppVersion"),
  quit: () => electron.ipcRenderer.send("quit"),
  ipcRenderer: {
    on: (channel, listener) => {
      electron.ipcRenderer.on(channel, listener);
    },
    removeListener: (channel, listener) => {
      electron.ipcRenderer.removeListener(channel, listener);
    },
    removeAllListeners: (channel) => {
      electron.ipcRenderer.removeAllListeners(channel);
    }
  }
});
