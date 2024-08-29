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
  quit: () => electron.ipcRenderer.send("quit")
});
