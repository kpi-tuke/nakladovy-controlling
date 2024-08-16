'use strict';
const electron = require('electron');
electron.contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      electron.ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        electron.ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        electron.ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
  printToPdf: (fileName) => electron.ipcRenderer.invoke('printToPDF', fileName),
  chooseFilePath: () => electron.ipcRenderer.invoke('chooseFilePath'),
  saveProject: (state) => electron.ipcRenderer.invoke('save', state),
  openProject: () => electron.ipcRenderer.send('open'),
  onOpen(channel, func) {
    const validChannels = ['open'];
    if (validChannels.includes(channel)) {
      electron.ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  quit: () => electron.ipcRenderer.send('quit'),
});
