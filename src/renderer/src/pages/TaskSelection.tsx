import AnalysisCard from '../components/SelectCard';
import HeaderBar from '../components/HeaderBar';
import { Grid } from '@mui/material';
import { RouteName } from '@renderer/routes';
import { AnalysisItem } from '@renderer/types/AnalysisItem';
import Page from '@renderer/components/layout/Page';
import PageContent from '@renderer/components/layout/PageContent';

const items: AnalysisItem[] = [
  {
    to: RouteName.ECONOMIC_ANALYSIS,
    title: 'Ekonomická analýza hospodárenia',
    description:
      'Hodnotenie úrovne hospodárenia podniku z hľadiska efektívnosti a hospodárnosti.',
  },
  {
    to: RouteName.STRUCTURE_ANALYSIS,
    title: 'Štruktúrna analýza nákladov',
    description:
      'Stanovenie štruktúry nákladov podľa druhového a kalkulačného členenia.',
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
    description: 'Stanovenie optimálnej štruktúry výrobného sortimentu.',
  },
  {
    to: RouteName.INDEX_ANALYSIS,
    title: 'Indexná analýza nákladov',
    description:
      'Porovnávanie nákladov v sledovanom období podielom (index) a rozdielom (absolútna diferencia).',
  },
  {
    to: RouteName.PERETO_ANALYSIS,
    title: 'Pareto analýza nákladov',
    description:
      'Sledovanie a odhaľovanie príčin vzniku kritických nákladov na základe Pareto pravidla 80/20.',
  },
  {
    to: RouteName.TREND_ANALYSIS,
    title: 'Trendová analýza nákladov',
    description:
      'Sledovanie trendu vývoja nákladov a stanovenie ukazovateľov trendu v sledovanom období.',
  },
  {
    to: RouteName.VARIATION_ANALYSIS,
    title: 'Odchýlková analýza nákladov',
    description: '',
  },
];

export default function TaskSelection() {
  return (
    <Page>
      <HeaderBar />
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
