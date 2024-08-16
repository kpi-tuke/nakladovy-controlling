import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from '@renderer/theme/theme';
import React from 'react';

export type ColorMode = 'light' | 'dark';

const ThemeContext = React.createContext<{
  setMode: (mode: ColorMode) => void;
  mode: ColorMode;
}>({
  setMode: () => {},
  mode: 'light',
});

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = React.useState<ColorMode>('light');

  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ setMode, mode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => React.useContext(ThemeContext);
