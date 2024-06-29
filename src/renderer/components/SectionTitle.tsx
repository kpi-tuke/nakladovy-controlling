import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';

const TitleText = styled(Typography)`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 16px;
  text-align: center;
`;

type Props = {
  children: string;
};

const SectionTitle: React.FC<Props> = ({ children }) => {
  return <TitleText variant="h2">{children}</TitleText>;
};

export default SectionTitle;
