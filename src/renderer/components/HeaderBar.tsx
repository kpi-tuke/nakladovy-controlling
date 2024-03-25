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
    navigate('/evaluation');
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
      <Grid item xs={2}>
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
      <Grid item xs={8}>
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
        xs={2}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {routeDetails?.addToReport &&
          (tasks.includes(reportId) ? (
            <Button
              variant="contained"
              color="error"
              startIcon={<Remove />}
              onClick={() => removeFromReport(reportId)}
            >
              Odstrániť z reportu
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              startIcon={<Add />}
              onClick={() => addToReport(reportId)}
            >
              Zahrnúť v reporte
            </Button>
          ))}

        {routeDetails?.printToPDF && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => printToPDF(routeDetails?.title ?? '')}
            startIcon={<Print />}
          >
            Tlačiť do PDF
          </Button>
        )}

        {routeDetails?.save && (
          <>
            {tasks.length > 0 && (
              <Button
                variant="contained"
                onClick={goToReport}
                startIcon={<Summarize />}
              >
                Report
              </Button>
            )}

            <Button variant="contained" onClick={save} startIcon={<Save />}>
              Uložiť
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default HeaderBar;
