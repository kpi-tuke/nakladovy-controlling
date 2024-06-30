import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import { getRouteDetails, RouteName } from 'renderer/routes';
import React, { useMemo } from 'react';
import { ArrowBack, Print, Save } from '@mui/icons-material';
import { useAnalysisSave } from './providers/AnalysisSaveProvider';

type Props = {
  reportId: number;
};

// TODO: pouzit props tu
const HeaderBar: React.FC<any> = () => {
  const { save, economicChanged, onceSaved } = useAnalysisSave();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const routeDetails = React.useMemo(() => {
    return getRouteDetails(pathname);
  }, [pathname]);

  // TODO: tu to bolo ako NUMBER... neviem preco
  function printToPDF(id: string) {
    // @ts-ignore
    window.electron.printToPdf(id, (arg) => console.log(arg));
  }

  function goBack() {
    navigate(-1);
  }

  const isSaveDisabled = useMemo(() => {
    if (!onceSaved) {
      return false;
    }

    switch (pathname) {
      case RouteName.ECONOMIC_ANALYSIS: {
        return !economicChanged;
      }
      default: {
        return false;
      }
    }
  }, [economicChanged, onceSaved]);

  return (
    <Grid
      container
      sx={{
        paddingLeft: 2,
        paddingRight: 2,
        alignItems: 'center',
        height: '7vh',
        boxShadow: '0px 15px 10px -15px rgba(0, 0, 0, 0.2)',
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
            text="Tlačiť do PDF"
            icon={<Print />}
            onClick={() => printToPDF(routeDetails?.title ?? '')}
          />
        )}

        {routeDetails?.save && (
          <ResponsiveButton
            text={isSaveDisabled ? 'Uložené' : 'Uložiť'}
            onClick={save}
            icon={<Save />}
            disabled={isSaveDisabled}
          />
        )}
      </Grid>
    </Grid>
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
