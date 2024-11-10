import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  printToPdf: (fileName) => ipcRenderer.invoke('printToPDF', fileName),

  chooseFilePath: () => ipcRenderer.invoke('chooseFilePath'),

  saveProject: (state) => ipcRenderer.invoke('save', state),

  openProject: () => ipcRenderer.send('open'),

  onOpen(channel, func) {
    const validChannels = ['open'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (_, ...args) => func(...args));
    }
  },

  getAppVersion: () => ipcRenderer.invoke('getAppVersion'),

  quit: () => ipcRenderer.send('quit'),
});
