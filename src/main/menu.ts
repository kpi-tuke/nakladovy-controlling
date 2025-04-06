import { app, BrowserWindow, Menu, shell } from 'electron';

export default class MenuBuilder {
  private mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu(): Menu {
    const template: any = [
      ...(process.platform === 'darwin'
        ? [
            {
              label: app.name,
              submenu: [
                {
                  label: 'O Nákladovom kontrolingu',
                  click: () => app.showAboutPanel(),
                },
                { type: 'separator' },
                { label: 'Služby', role: 'services', submenu: [] },
                { type: 'separator' },
                {
                  label: 'Skryť Nákladový kontroling',
                  accelerator: 'Cmd+H',
                  role: 'hide',
                },
                {
                  label: 'Skryť ostatné',
                  accelerator: 'Cmd+Alt+H',
                  role: 'hideOthers',
                },
                { label: 'Zobraziť všetky', role: 'unhide' },
                { type: 'separator' },
                { label: 'Zavrieť', accelerator: 'Cmd+Q', role: 'quit' },
              ],
            },
          ]
        : []),

      // File Menu
      {
        label: 'Súbor',
        submenu: [
          {
            label: 'Nový',
            accelerator: 'CmdOrCtrl+N',
            click: () => this.mainWindow.webContents.send('menu-new-project'),
          },
          {
            label: 'Otvoriť',
            accelerator: 'CmdOrCtrl+O',
            click: () => this.mainWindow.webContents.send('menu-open-project'),
          },
          {
            label: 'Uložiť',
            accelerator: 'CmdOrCtrl+S',
            click: () => this.mainWindow.webContents.send('menu-save-project'),
          },
          {
            label: 'Tlačiť',
            accelerator: 'CmdOrCtrl+P',
            click: () => this.mainWindow.webContents.send('menu-print-project'),
          },
          { type: 'separator' },
          {
            label: 'Zobraziť report',
            accelerator: 'CmdOrCtrl+R',
            click: () => this.mainWindow.webContents.send('menu-open-report'),
          },

          {
            label: 'Zavrieť',
            role: process.platform === 'darwin' ? 'close' : 'quit',
          },
        ],
      },

      // Edit Menu
      {
        label: 'Upraviť',
        submenu: [
          { label: 'Späť', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
          { label: 'Znova', accelerator: 'CmdOrCtrl+Shift+Z', role: 'redo' },
          { type: 'separator' },
          { label: 'Vystrihnúť', accelerator: 'CmdOrCtrl+X', role: 'cut' },
          { label: 'Kopírovať', accelerator: 'CmdOrCtrl+C', role: 'copy' },
          { label: 'Vložiť', accelerator: 'CmdOrCtrl+V', role: 'paste' },
          {
            label: 'Vybrať všetko',
            accelerator: 'CmdOrCtrl+A',
            role: 'selectAll',
          },
        ],
      },

      // Window Menu (macOS only)
      ...(process.platform === 'darwin'
        ? [
            {
              label: 'Okno',
              submenu: [
                {
                  label: 'Minimalizovať',
                  accelerator: 'Cmd+M',
                  role: 'minimize',
                },
                { label: 'Priblížiť', role: 'zoom' },
                { type: 'separator' },
                { label: 'Presunúť všetko dopredu', role: 'front' },
              ],
            },
          ]
        : []),

      // Help Menu
      {
        label: 'Pomoc',
        submenu: [
          {
            label: 'Dokumentácia',
            click: () =>
              shell.openExternal(
                'https://github.com/kpi-tuke/nakladovy-controlling',
              ),
          },
        ],
      },
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }
}
