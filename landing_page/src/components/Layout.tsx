'use client';

import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import AppTheme from '@/shared-theme/AppTheme';
import AppAppBar from '@/components/AppAppBar';
import Footer from '@/components/Footer';
import { GlobalStyles } from '@mui/material';

type Props = React.PropsWithChildren;

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <InitColorSchemeScript attribute="class" />
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <AppTheme>
          <CssBaseline />
          <GlobalStyles
            styles={{
              a: {
                textDecoration: 'none',
                color: 'inherit',
              },
              html: {
                scrollBehavior: 'smooth',
              },
            }}
          />
          <AppAppBar />
          {children}
          <Footer />
        </AppTheme>
      </AppRouterCacheProvider>
    </>
  );
};

export default Layout;
