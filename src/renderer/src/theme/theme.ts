import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    pageHeader: {
      height: number;
    };
  }
  interface ThemeOptions {
    pageHeader: {
      height: number;
    };
  }
  interface Palette {
    backgroundPrint: {
      default: string;
    };
    title: {
      default: string;
    };
  }
  interface PaletteOptions {
    backgroundPrint: {
      default: string;
    };
    title: {
      default: string;
    };
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f2f1f6',
    },
    backgroundPrint: {
      default: '#fff',
    },
    title: {
      default: '#000',
    },
  },
  pageHeader: {
    height: 60,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#242526',
    },
    backgroundPrint: {
      default: '#fff',
    },
    title: {
      default: '#fff',
    },
  },
  pageHeader: {
    height: 64,
  },
  components: {
    MuiCardHeader: {
      styleOverrides: {
        title: {
          color: 'rgba(0, 0, 0, 0.65)',
        },
      },
    },
  },
});
