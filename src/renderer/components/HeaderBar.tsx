import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import { routes, RouteName } from 'renderer/routes';
import React from 'react';
import { ArrowBack, Print, Save } from '@mui/icons-material';
import { useAnalysisSave } from './providers/AnalysisSaveProvider';
import { useSnackbar } from './providers/SnackbarProvider';
import ColorModeButton from './ColorModeButton';

const Wrapper = styled(Box)`
  height: 7vh;
  box-shadow: 0px 15px 10px -15px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.palette.background.paper};
  z-index: 100;
`;

const HeaderBar = () => {
  const { save, saveButtonDisabled } = useAnalysisSave();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { open } = useSnackbar();

  const routeDetails = routes[pathname as RouteName];

  const printToPDF = async (defaultFileName: string) => {
    const isGenerated = await window.electron.printToPdf(defaultFileName);

    if (isGenerated) {
      open('PDF sa úspešne vygenerovalo');
    } else {
      open('PDF sa nepodarilo vygenerovať');
    }
  };

  function goBack() {
    navigate(-1);
  }

  return (
    <Wrapper className="hideInPrint">
      <Box
        sx={{
          height: '100%',
        }}
        className="hideInPrint"
      >
        <Grid
          container
          sx={{
            height: '100%',
            paddingLeft: 2,
            paddingRight: 2,
            alignItems: 'center',
            zIndex: 2,
          }}
        >
          {/* Left side */}
          <Grid item xs={4}>
            {pathname !== RouteName.HOME && (
              <>
                <IconButton
                  color="primary"
                  onClick={goBack}
                  sx={{
                    display: {
                      md: 'none',
                    },
                  }}
                >
                  <ArrowBack />
                </IconButton>
                <Button
                  onClick={goBack}
                  startIcon={<ArrowBack />}
                  variant="outlined"
                  sx={{
                    display: {
                      xs: 'none',
                      md: 'flex',
                    },
                  }}
                >
                  Späť
                </Button>
              </>
            )}
          </Grid>

          {/* Middle side */}
          <Grid item xs={4}>
            <Typography
              variant="h1"
              sx={{
                textAlign: 'center',
                fontSize: 24,
                fontWeight: 600,
                color: (theme) => theme.palette.title.default,
              }}
            >
              {routeDetails?.title}
            </Typography>
          </Grid>

          {/* Right side */}
          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
            }}
          >
            {routeDetails?.printToPDF && (
              <ResponsiveButton
                text="Tlačiť"
                icon={<Print />}
                onClick={() => printToPDF(routeDetails?.title ?? '')}
              />
            )}

            {routeDetails?.save && (
              <ResponsiveButton
                text={saveButtonDisabled ? 'Uložené' : 'Uložiť'}
                onClick={save}
                icon={<Save />}
                disabled={saveButtonDisabled}
              />
            )}

            {pathname === RouteName.HOME && <ColorModeButton />}
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  );
};

export default HeaderBar;

type ResponsiveButtonProps = {
  text: string;
  icon: React.ReactNode;
  onClick: VoidFunction;
  disabled?: boolean;
};

const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({
  text,
  icon,
  onClick,
  disabled,
}) => {
  return (
    <Button
      variant="contained"
      onClick={() => onClick()}
      disabled={disabled}
      sx={{
        display: 'flex',
        gap: 1,
      }}
    >
      {icon}
      <Typography
        sx={{
          display: {
            xs: 'none',
            lg: 'flex',
          },
          fontSize: 14,
        }}
      >
        {text}
      </Typography>
    </Button>
  );
};
