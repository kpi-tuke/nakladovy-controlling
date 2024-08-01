import { colors, createTheme, PaletteColorOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {}
  interface ThemeOptions {}
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
