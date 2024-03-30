import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectCVP } from '../pages/cvp/cvpSlice';
import { selectEconomic } from '../pages/economic/economicSlice';
import { selectIndex } from '../pages/index/indexSlice';
import { selectPareto } from '../pages/pareto/paretoSlice';
import { selectSortiment } from '../pages/sortiment/sortimentSlice';
import { selectStructure } from '../pages/structure/structureSlice';
import {
  evaluationActions,
  selectEvaluation,
} from '../pages/report/evaluationSlice';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import { getRouteDetails, RouteName } from 'renderer/routes';
import React from 'react';
import {
  ArrowBack,
  Add,
  Remove,
  Print,
  Save,
  Summarize,
} from '@mui/icons-material';

type Props = {
  reportId: number;
};

// TODO: pouzit props tu
const HeaderBar: React.FC<any> = ({ reportId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const routeDetails = React.useMemo(() => {
    return getRouteDetails(pathname);
  }, [pathname]);

  function addToReport(id: number) {
    dispatch(evaluationActions.addTask(id));
  }

  function removeFromReport(id: number) {
    dispatch(evaluationActions.removeTask(id));
    console.log(id);
  }

  // TODO: tu to bolo ako NUMBER... neviem preco
  function printToPDF(id: string) {
    // @ts-ignore
    window.electron.printToPdf(id, (arg) => console.log(arg));
  }

  function goBack() {
    navigate(-1);
  }

  const economic = useAppSelector(selectEconomic);
  const structure = useAppSelector(selectStructure);
  const cvp = useAppSelector(selectCVP);
  const sortiment = useAppSelector(selectSortiment);
  const chain = useAppSelector(selectIndex);
  const pareto = useAppSelector(selectPareto);
  const { tasks } = useAppSelector(selectEvaluation);

  function save() {
    const json = JSON.stringify({
      economic,
      sortiment,
      structure,
      chain,
      cvp,
      pareto,
      tasks,
    });
    // @ts-ignore
    window.electron.saveProject(json);
  }

  function goToReport() {
    navigate(RouteName.EVALUATION);
  }

  return (
    <Grid
      container
      sx={{
        paddingLeft: 2,
        paddingRight: 2,
        alignItems: 'center',
        height: '7vh',
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
        {routeDetails?.addToReport &&
          (tasks.includes(reportId) ? (
            <ResponsiveButton
              text="Odstrániť z reportu"
              icon={<Remove />}
              onClick={() => removeFromReport(reportId)}
            />
          ) : (
            <ResponsiveButton
              text="Zahrnúť v reporte"
              icon={<Add />}
              onClick={() => addToReport(reportId)}
            />
          ))}

        {routeDetails?.printToPDF && (
          <ResponsiveButton
            text="Tlačiť do PDF"
            icon={<Print />}
            onClick={() => printToPDF(routeDetails?.title ?? '')}
          />
        )}

        {routeDetails?.save && (
          <>
            {tasks.length > 0 && (
              <ResponsiveButton
                text="Report"
                icon={<Summarize />}
                onClick={goToReport}
              />
            )}

            <ResponsiveButton text="Uložiť" onClick={save} icon={<Save />} />
          </>
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
};

const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({
  text,
  icon,
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      onClick={() => onClick()}
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
            xl: 'flex',
          },
          fontSize: 14,
        }}
      >
        {text}
      </Typography>
    </Button>
  );
};
