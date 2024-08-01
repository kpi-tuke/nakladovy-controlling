import { Box, styled } from '@mui/material';
import React from 'react';

const MainPage = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

type Props = {
  children: React.ReactNode;
  id?: string;
};

const Page: React.FC<Props> = ({ children, id }) => {
  return <MainPage id={id}>{children}</MainPage>;
};

export default Page;
