'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import Link from 'next/link';

const StyledBox = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: '6px solid',
  outlineColor: 'hsla(220, 25%, 80%, 0.2)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

const StyledImage = styled('img')`
  width: 100%;
`;

const Hero = () => {
  const theme = useTheme();

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        }),
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 2, sm: 4 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
              textAlign: 'center',
            }}
          >
            Nákladový kontroling
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
            }}
          >
            Sleduj, analyzuj a optimalizuj firemné výdavky s jednoduchým
            nástrojom na nákladový kontroling. Automatizované výpočty, prehľadné
            reporty a jednoduché rozhodovanie –{' '}
            <Typography color="primary" fontWeight={600} component="span">
              všetko na jednom mieste
            </Typography>
          </Typography>
          <Link href="/download">
            <Button variant="contained" size="large">
              Vyskúšať
            </Button>
          </Link>
        </Stack>

        <StyledBox id="image">
          <StyledImage
            src={
              theme.palette.mode === 'light' ? 'app_light.png' : 'app_dark.png'
            }
            alt=""
          />
        </StyledBox>
      </Container>
    </Box>
  );
};

export default Hero;
