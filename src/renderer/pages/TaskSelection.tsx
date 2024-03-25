import AnalysisCard from '../components/SelectCard';
import HeaderBar from '../components/HeaderBar';
import { Grid } from '@mui/material';
import { AnalysisItem } from 'renderer/types/AnalysisItem';
import Page from 'renderer/components/layout/Page';
import PageContent from 'renderer/components/layout/PageContent';
import { RouteName } from 'renderer/routes';

const items: AnalysisItem[] = [
  {
    to: RouteName.ECONOMIC_ANALYSIS,
    title: 'Ekonomická analýza hospodárenia',
    description:
      'Hodnotenie úrovne hospodárenia podniku z hľadiska efektívnosti a hospodárnosti.',
  },
  {
    to: RouteName.STRUCTURE_ANALYSIS,
    title: 'Štruktúrna analýza',
    description:
      'Analýza štruktúry nákladov podľa druhového a kalkulačného členenia.',
  },
  {
    to: RouteName.CVP_ANALYSIS,
    title: 'CVP analýza',
    description:
      'Analýza zameraná na určenie kritického objemu výroby a stanovenie nulového bodu.',
  },
  {
    to: RouteName.SORTIMENT_ANALYSIS,
    title: 'Sortimentná analýza',
    description:
      'lýza ekonomických ukazovateľov pre optimálnu štruktúru výrobného sortimentu.',
  },
  {
    to: RouteName.INDEX_ANALYSIS,
    title: 'Indexná analýza',
    description: 'Zhodnotenie trendu vývoja druhových nákladov.',
  },
  {
    to: RouteName.PERETO_ANALYSIS,
    title: 'Pareto analýza',
    description: 'Sledovanie príčin vzniku nákladov na základe pravidla 80/20.',
  },
];

export default function TaskSelection() {
  return (
    <Page>
      <HeaderBar title={'Ekonomické analýzy'} back={'welcome'} save={true} />
      <PageContent>
        <Grid container spacing={4}>
          {items.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <AnalysisCard {...item} />
            </Grid>
          ))}
        </Grid>
      </PageContent>
    </Page>
  );
}
