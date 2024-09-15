import HeaderBar from '../components/HeaderBar';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { projectActions, selectProject } from '../store/projectSlice';
import { CVPActions } from './cvp/cvpSlice';
import { economicActions } from './economic/economicSlice';
import { indexActions } from './index/indexSlice';
import { paretoActions } from './pareto/paretoSlice';
import { sortimentActions } from './sortiment/sortimentSlice';
import { structureActions } from './structure/structureSlice';
import { evaluationActions } from './report/evaluationSlice';
import { Box, Button, Grid, Paper, styled, Typography } from '@mui/material';
import AppVersion from '@renderer/components/AppVersion';
import Page from '@renderer/components/layout/Page';
import PageContent from '@renderer/components/layout/PageContent';
import { RouteName } from '@renderer/routes';

const Wrapper = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

export default function WelcomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function newProject() {
    dispatch(economicActions.reset());
    dispatch(structureActions.reset());
    dispatch(CVPActions.reset());
    dispatch(indexActions.reset());
    dispatch(sortimentActions.reset());
    dispatch(paretoActions.reset());
    dispatch(evaluationActions.reset());
    dispatch(projectActions.setCreated());
    navigate('/taskselect');
  }

  function openProject() {
    window.electron.openProject();
    window.electron.onOpen('open', (arg) => {
      const json = JSON.parse(arg);
      dispatch(economicActions.openProject(json.economic));
      dispatch(structureActions.openProject(json.structure));
      dispatch(CVPActions.openProject(json.cvp));
      dispatch(indexActions.openProject(json.chain));
      dispatch(sortimentActions.openProject(json.sortiment));
      dispatch(paretoActions.openProject(json.pareto));
      dispatch(evaluationActions.openProject(json.tasks));
      dispatch(projectActions.setCreated());
      navigate('/taskselect');
    });
  }

  const { created } = useAppSelector(selectProject);

  function continueProject() {
    navigate('/taskselect');
  }

  const openReport = () => {
    navigate(RouteName.EVALUATION);
  };

  function quit() {
    window.electron.quit();
  }

  return (
    <Page>
      <HeaderBar />
      <PageContent>
        <Wrapper>
          <Paper
            sx={{
              maxWidth: 800,
              padding: 3,
            }}
          >
            <Typography>
              Vitajte v aplikácii Nákladový Controlling. Softvérová aplikácia
              Nákladový Controlling je podsystém systému riadenia a podporný
              prostriedok rozhodovacieho procesu. Slúži na koordináciu procesov
              plánovania, kalkulovania, rozpočtovania a kontroly podnikových
              výrobných faktorov. Obsahuje rôzne typy ekonomických,
              štatistických finančných analýz orientovaných na ekonomické
              veličiny vyjadrujúce úroveň výkonnosti výrobných podnikov.
              Nákladový Controlling je softvérová aplikácia, ktorá „MÁ PODNIK
              POD KONTROLOU“.
            </Typography>
          </Paper>

          <Box>
            <Grid container spacing={2}>
              {created && (
                <Grid item xs={12}>
                  <WelcomeButton onClick={continueProject}>
                    Pokračovať
                  </WelcomeButton>
                </Grid>
              )}
              <Grid item xs={12} md={6}>
                <WelcomeButton onClick={newProject}>Nový projekt</WelcomeButton>
              </Grid>
              <Grid item xs={12} md={6}>
                <WelcomeButton onClick={openProject}>
                  Otvoriť projekt
                </WelcomeButton>
              </Grid>
              {created && (
                <Grid item xs={12}>
                  <WelcomeButton onClick={openReport}>Report</WelcomeButton>
                </Grid>
              )}
              <Grid item xs={12}>
                <WelcomeButton onClick={quit}>Ukončiť projekt</WelcomeButton>
              </Grid>
            </Grid>
          </Box>
        </Wrapper>

        <AppVersion />
      </PageContent>
    </Page>
  );
}

const WelcomeButton: React.FC<{ children: string; onClick?: VoidFunction }> = ({
  onClick,
  children,
}) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      fullWidth
      sx={{ minHeight: 48 }}
    >
      {children}
    </Button>
  );
};
