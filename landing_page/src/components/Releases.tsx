'use client';

import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, Stack } from '@mui/material';

type Props = {
  releases: {
    tag: string;
    windowsUrl?: string;
    linuxUrl?: string;
  }[];
};

const FAQ: React.FC<Props> = ({ releases }) => {
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(
        isExpanded
          ? [...expanded, panel]
          : expanded.filter((item) => item !== panel),
      );
    };

  return (
    <Container
      id="releases"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: 'text.primary',
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        Staršie verzie na stiahnutie
      </Typography>
      <Box sx={{ width: '100%' }}>
        {releases.map((release, index) => (
          <Accordion
            key={index}
            expanded={expanded.includes(release.tag)}
            onChange={handleChange(release.tag)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography variant="h5">Verzia: {release.tag}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ maxWidth: { sm: '100%', md: '70%' } }}
              >
                <Stack gap={1}>
                  {release.windowsUrl && (
                    <Typography
                      sx={{
                        fontSize: '1.1rem',
                      }}
                    >
                      Windows:{' '}
                      <Link href={release.windowsUrl} color="primary.main">
                        stiahnuť
                      </Link>
                    </Typography>
                  )}
                  {release.linuxUrl && (
                    <Typography
                      sx={{
                        fontSize: '1.1rem',
                      }}
                    >
                      Linux:{' '}
                      <Link href={release.linuxUrl} color="primary.main">
                        stiahnuť
                      </Link>
                    </Typography>
                  )}
                </Stack>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default FAQ;
