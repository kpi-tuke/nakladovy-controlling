import { Box } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Page: React.FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </Box>
  );
};

export default Page;
