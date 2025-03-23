import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Nákladový kontroling',
  description:
    'Desktopová aplikácia pre finančný kontroling, navrhnutá s dôrazom na jednoduchosť, rýchlosť a multiplatformovú dostupnosť. Sleduj náklady, analyzuj údaje a exportuj reporty – všetko v jednom modernom nástroji',
};

type Props = React.PropsWithChildren;

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="sk" suppressHydrationWarning>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
};

export default RootLayout;
