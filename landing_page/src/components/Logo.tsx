import React from 'react';
import { Stack, Typography } from '@mui/material';
import Image from 'next/image';

type Props = {
  size: number;
};

const SitemarkIcon: React.FC<Props> = ({ size }) => {
  return (
    <Stack direction={'row'} alignItems={'center'} gap={4}>
      <Image src={'icon.png'} alt="Logo" width={size} height={size} />
    </Stack>
  );
};

export default SitemarkIcon;
