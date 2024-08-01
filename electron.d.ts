export {};

declare global {
  interface Window {
    electron: {
      printToPdf: (defaultFileName: string) => Promise<boolean>;
      chooseFilePath: () => Promise<string>;
      saveProject: (json: string) => Promise<boolean>;
    };
  }
}
