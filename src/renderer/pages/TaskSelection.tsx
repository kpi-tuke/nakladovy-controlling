import AnalysisCard from '../components/SelectCard';
import HeaderBar from '../components/HeaderBar';
import { Grid } from '@mui/material';
import { AnalysisItem } from 'renderer/types/AnalysisItem';
import Page from 'renderer/components/layout/Page';
import PageContent from 'renderer/components/layout/PageContent';

const items: AnalysisItem[] = [
  {
    to: '/task1',
    title: 'Ekonomická analýza hospodárenia',
    description:
      'Hodnotenie úrovne hospodárenia podniku z hľadiska efektívnosti a hospodárnosti.',
  },
  {
    to: '/task2',
    title: 'Štruktúrna analýza',
    description:
      'Analýza štruktúry nákladov podľa druhového a kalkulačného členenia.',
  },
  {
    to: '/task4',
    title: 'CVP analýza',
    description:
      'Analýza zameraná na určenie kritického objemu výroby a stanovenie nulového bodu.',
  },
  {
    to: '/task5',
    title: 'Sortimentná analýza',
    description:
      'lýza ekonomických ukazovateľov pre optimálnu štruktúru výrobného sortimentu.',
  },
  {
    to: '/task3',
    title: 'Indexná analýza',
    description: 'Zhodnotenie trendu vývoja druhových nákladov.',
  },
  {
    to: '/task6',
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
