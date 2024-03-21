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
import { Box, Button, Grid, Typography } from '@mui/material';
import AppVersion from 'renderer/components/AppVersion';
import Page from 'renderer/components/layout/Page';
import PageContent from 'renderer/components/layout/PageContent';

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
    // @ts-ignore
    window.electron.openProject();
    // @ts-ignore
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

  function quit() {
    // @ts-ignore
    window.electron.quit();
  }

  return (
    <Page>
      <HeaderBar title={'NÁKLADOVÝ CONTROLLING'} />
      <PageContent>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Box
            sx={{
              background: 'white',
              maxWidth: 800,
              padding: 3,
              borderRadius: 1,
            }}
          >
            <Typography>
              Vitajte v aplikácii pre Nákladový Controlling. Táto softvérová
              aplikácia slúži na riešenie praktických príkladov a prípadových
              štúdií zameraných na využívanie ekonomických analýz v rámci
              manažérskeho rozhodovania. Obsahuje rôzne typy ekonomických analýz
              orientovaných na ekonomickú veličinu - náklady. Výstupy
              jednotlivých ekonomických analýz obsahujú grafické metódy a sú
              realizované vo formáte pdf.
            </Typography>
          </Box>

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
              <Grid item xs={12}>
                <WelcomeButton onClick={quit}>Ukončiť</WelcomeButton>
              </Grid>
            </Grid>
          </Box>
        </Box>

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
