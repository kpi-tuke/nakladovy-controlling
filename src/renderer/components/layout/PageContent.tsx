import { Box } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const PageContent: React.FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f2f1f6',
      }}
    >
      <Box
        sx={{
          flex: 1,
          padding: 6,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageContent;
