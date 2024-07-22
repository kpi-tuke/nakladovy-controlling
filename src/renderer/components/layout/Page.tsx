import { Box, styled } from '@mui/material';
import React from 'react';

const MainPage = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 7vh;
`;

type Props = {
  children: React.ReactNode;
};

const Page: React.FC<Props> = ({ children }) => {
  return <MainPage>{children}</MainPage>;
};

export default Page;
