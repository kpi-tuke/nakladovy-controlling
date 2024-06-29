import { Box } from '@mui/material';
import React from 'react';

type Props = {
  height: number;
};

const Spacer: React.FC<Props> = ({ height }) => {
  return (
    <Box
      sx={{
        height: `${height}px`,
      }}
    ></Box>
  );
};

export default Spacer;
