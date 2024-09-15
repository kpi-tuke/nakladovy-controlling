import { Typography } from '@mui/material';

const AppVersion = () => {
  return (
    <Typography
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 10,
        color: (theme) => theme.palette.text.primary,
      }}
    >
      verzia 2.0.2
    </Typography>
  );
};

export default AppVersion;
