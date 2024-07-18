import { colors, createTheme, PaletteColorOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {}
  interface ThemeOptions {}
  interface Palette {
    backgroundPrint: {
      default: string;
    };
  }
  interface PaletteOptions {
    backgroundPrint: {
      default: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    background: {
      default: '#f2f1f6',
    },
    backgroundPrint: {
      default: '#fff',
    },
  },
});
