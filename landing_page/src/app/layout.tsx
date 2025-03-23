"use client";

import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import AppTheme from "@/shared-theme/AppTheme";
import AppAppBar from "@/components/AppAppBar";
import Footer from "@/components/Footer";
import { GlobalStyles } from "@mui/material";

type Props = React.PropsWithChildren;

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="sk" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AppTheme>
            <CssBaseline />
            <GlobalStyles
              styles={{
                a: {
                  textDecoration: "none",
                  color: "inherit",
                },
              }}
            />
            <AppAppBar />
            {children}
            <Footer />
          </AppTheme>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
