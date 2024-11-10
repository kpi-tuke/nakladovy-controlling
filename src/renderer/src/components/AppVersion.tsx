import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const AppVersion = () => {
  const [version, setVersion] = useState('');

  useEffect(() => {
    const fetchVersion = async () => {
      const appVersion = await window.electron.getAppVersion();
      setVersion(appVersion);
    };

    fetchVersion();
  }, []);

  return (
    <Typography
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 10,
        color: (theme) => theme.palette.text.primary,
      }}
    >
      {version}
    </Typography>
  );
};

export default AppVersion;
