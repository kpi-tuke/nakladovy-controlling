import HeaderBar from '../components/HeaderBar';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { selectProject } from '../store/projectSlice';
import { Box, Button, Grid, Paper, styled, Typography } from '@mui/material';
import AppVersion from '@renderer/components/AppVersion';
import Page from '@renderer/components/layout/Page';
import PageContent from '@renderer/components/layout/PageContent';
import { RouteName } from '@renderer/routes';
import { useProject } from '@renderer/components/providers/ProjectProvider';

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
  const { created } = useAppSelector(selectProject);
  const { newProject, openProject } = useProject();

  const continueProject = () => {
    navigate('/taskselect');
  };

  const openReport = () => {
    navigate(RouteName.EVALUATION);
  };

  const quit = () => {
    window.electron.quit();
  };

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
              štatistických analýz orientovaných na ekonomické veličiny
              vyjadrujúce úroveň výkonnosti priemyselných podnikov. Nákladový
              Controlling je softvérová aplikácia, ktorá „MÁ PODNIK POD
              KONTROLOU“.
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
