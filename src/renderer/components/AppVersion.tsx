import { Typography } from '@mui/material';
import { right } from '@popperjs/core';

const AppVersion = () => {
  return (
    <Typography
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 10,
      }}
    >
      verzia 2.0.0
    </Typography>
  );
};

export default AppVersion;
