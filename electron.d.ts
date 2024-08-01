export {};

declare global {
  interface Window {
    electron: {
      printToPdf: (
        defaultFileName: string,
        callback: (arg: any) => void
      ) => void;
    };
  }
}
