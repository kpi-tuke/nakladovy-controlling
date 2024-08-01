import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';

const TitleText = styled(Typography)`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

type Props = {
  children: string;
  className?: string;
};

const SectionTitle: React.FC<Props> = ({ children, className }) => {
  return (
    <TitleText
      className={className}
      variant="h2"
      sx={{
        color: (theme) => theme.palette.title.default,
      }}
    >
      {children}
    </TitleText>
  );
};

export default SectionTitle;
