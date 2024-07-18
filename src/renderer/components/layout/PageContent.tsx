import { Box, styled } from '@mui/material';
import React from 'react';

const Content = styled(Box)`
  height: 93vh;
  display: flex;
  flex-direction: column;
  /* background-color: #f2f1f6; */
  background-color: ${({ theme }) => theme.palette.background.default};
  overflow-y: auto;
`;

type Props = {
  children: React.ReactNode;
};

const PageContent: React.FC<Props> = ({ children }) => {
  return (
    <Content>
      <Box
        sx={{
          flex: 1,
          padding: 6,
        }}
      >
        {children}
      </Box>
    </Content>
  );
};

export default PageContent;
