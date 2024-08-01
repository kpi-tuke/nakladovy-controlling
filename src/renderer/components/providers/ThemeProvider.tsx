import { ThemeProvider as MuiThemeProvider, PaletteMode } from '@mui/material';
import React from 'react';
import { darkTheme, lightTheme } from 'renderer/theme/theme';

const ThemeContext = React.createContext<{
  switchColorMode: VoidFunction;
  mode: 'light' | 'dark';
}>({
  switchColorMode: () => {},
  mode: 'light',
});

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  const theme = mode === 'light' ? lightTheme : darkTheme;

  const switchColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ switchColorMode, mode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => React.useContext(ThemeContext);
