import { Box } from '@mui/material';
import React from 'react';

type Props = {
  height: number;
  hideInPrint?: boolean;
};

const Spacer: React.FC<Props> = ({ height, hideInPrint }) => {
  return (
    <Box
      className={`spacer ${hideInPrint ? 'hideInPrint' : ''}`}
      sx={{
        height: `${height}px`,
      }}
    ></Box>
  );
};

export default Spacer;
