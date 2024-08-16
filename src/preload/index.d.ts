import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: {
      printToPdf: (fileName: string) => Promise<void>;
      chooseFilePath: () => Promise<string>;
      saveProject: (state: string) => Promise<boolean>;
      openProject: () => void;
      onOpen: (channel: string, func: (data: any) => void) => void;
      quit: () => void;
    };
  }
}
