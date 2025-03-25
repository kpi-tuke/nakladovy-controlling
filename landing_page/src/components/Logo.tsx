import React from 'react';
import { Stack } from '@mui/material';

type Props = {
  size: number;
};

const SitemarkIcon: React.FC<Props> = ({ size }) => {
  return (
    <Stack direction={'row'} alignItems={'center'} gap={4}>
      <img src={'/logo.png'} alt="Logo" width={size} height={size} />
    </Stack>
  );
};

export default SitemarkIcon;
