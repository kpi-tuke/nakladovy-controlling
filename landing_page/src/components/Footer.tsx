'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GithubIcon from '@mui/icons-material/GitHub';
import Logo from './Logo';

const Footer = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', sm: '60%' },
              display: 'flex',
              justifyContent: {
                xs: 'center',
                sm: 'flex-start',
              },
            }}
          >
            <Logo size={100} />
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Produkt
          </Typography>

          <MuiLink
            href="/#features"
            color="text.secondary"
            variant="body2"
            component={Link}
          >
            Funkcie
          </MuiLink>
          <MuiLink
            href="/#faq"
            color="text.secondary"
            variant="body2"
            component={Link}
          >
            FAQ
          </MuiLink>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Tvorcovia
          </Typography>
          <MuiLink
            href="https://github.com/filip65"
            target="_blank"
            color="text.secondary"
            variant="body2"
            component={Link}
          >
            Filip Katušin
          </MuiLink>
          <MuiLink
            href="https://github.com/AurelHolotnak"
            target="_blank"
            color="text.secondary"
            variant="body2"
            component={Link}
          >
            Aurel holotňak
          </MuiLink>

          <MuiLink
            href="https://kpi.fei.tuke.sk/"
            target="_blank"
            color="text.secondary"
            variant="body2"
            component={Link}
          >
            KPI FEI TUKE
          </MuiLink>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          {'Copyright © '}
          <MuiLink
            color="text.secondary"
            href="https://kpi.fei.tuke.sk/"
            target="_blank"
            component={Link}
          >
            KPI FEI TUKE
          </MuiLink>
          &nbsp;
          {new Date().getFullYear()}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ justifyContent: 'left', color: 'text.secondary' }}
        >
          <IconButton
            color="inherit"
            size="small"
            href="https://github.com/kpi-tuke/nakladovy-controlling"
            target="_blank"
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
          >
            <GithubIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
};

export default Footer;
