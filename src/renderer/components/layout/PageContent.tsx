import { Box, styled } from '@mui/material';
import React from 'react';

const Content = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.background.default};
  overflow-y: auto;
  min-height: 93vh;
  padding-top: 7vh;

  @media print {
    background-color: ${({ theme }) => theme.palette.backgroundPrint.default};
    padding-top: 0;
  }
`;

const Container = styled(Box)`
  flex: 1;
  padding: 2rem;

  @media print {
    padding: 0;
  }
`;

type Props = {
  children: React.ReactNode;
};

const PageContent: React.FC<Props> = ({ children }) => {
  return (
    <Content>
      <Container>{children}</Container>
    </Content>
  );
};

export default PageContent;
