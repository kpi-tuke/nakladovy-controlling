import { Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    vars: {
      [x: string]: any;
      primaryColor: string;
      secondaryColor: string;
      borderRadius: string;
    };
  }

  // Allow configuration using `createTheme`
  interface ThemeOptions {
    vars?: {
      primaryColor?: string;
      secondaryColor?: string;
      borderRadius?: string;
      shape: any;
    };
    shape: any;
  }
}
