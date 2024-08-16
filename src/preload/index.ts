import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },

  printToPdf: (fileName) => ipcRenderer.invoke('printToPDF', fileName),

  chooseFilePath: () => ipcRenderer.invoke('chooseFilePath'),

  saveProject: (state) => ipcRenderer.invoke('save', state),

  openProject: () => ipcRenderer.send('open'),

  onOpen(channel, func) {
    const validChannels = ['open'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },

  quit: () => ipcRenderer.send('quit'),
});
