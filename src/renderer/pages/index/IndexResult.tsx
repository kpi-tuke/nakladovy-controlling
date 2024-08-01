import ReactApexChart from 'react-apexcharts';
import TableStatic from '../../components/TableStatic';
import { useColGraph } from '../../graphOptions';
import { ApexOptions } from 'apexcharts';
import { indexCalculation } from './indexCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectIndex } from '../index/indexSlice';
import SectionTitle from 'renderer/components/SectionTitle';
import Spacer from 'renderer/components/Spacer';
import { Grid, Paper } from '@mui/material';
import { GraphCard } from 'renderer/components/graph/GraphCard';
import { GraphTitle } from 'renderer/components/graph/GraphTitle';

export default function IndexResult() {
  const { data, headers, values } = useAppSelector(selectIndex);
  const {
    chainIndexes,
    baseIndexes,
    newHeaders,
    costDiff,
    incomeDiff,
    costSumsForYears,
    incomeSumsForYears,
    betweenYears,
    reaction,
  } = indexCalculation(data, headers, values);
  const economicSeries = [
    {
      name: 'Náklady',
      data: costSumsForYears,
    },
    {
      name: 'Výnosy',
      data: incomeSumsForYears,
    },
  ];

  const baseSeries = [
    {
      name: 'Bázický index',
      data: baseIndexes,
    },
  ];

  const chainSeries = [
    {
      name: 'Percento zmeny výnosov',
      data: chainIndexes,
    },
  ];

  const costDiffSeries = [
    {
      name: 'Percento zment nákladov',
      data: costDiff,
    },
  ];

  const incomeDiffSeries = [
    {
      name: 'Percento zmeny výnosov',
      data: incomeDiff,
    },
  ];

  const reactionSeries = [
    {
      name: 'Koeficient reakcie',
      data: reaction,
    },
  ];

  const economicOptions: ApexOptions = useColGraph(
    newHeaders,
    'ekonomická veličina (€)'
  );
  const baseOptions: ApexOptions = {
    ...useColGraph(newHeaders),
    colors: ['#2E93fA'],
  };
  const chainOptions: ApexOptions = {
    ...useColGraph(betweenYears),
    colors: ['#66DA26', '#E91E63'],
  };
  const costDiffOptions: ApexOptions = {
    ...useColGraph(betweenYears),
    colors: ['#FF9800'],
  };
  const incomeDiffOptions: ApexOptions = {
    ...useColGraph(betweenYears),
    colors: ['#546E7A'],
  };
  const reactionOptions: ApexOptions = {
    ...useColGraph(betweenYears),
    colors: ['#E91E63'],
  };

  return (
    <div>
      <Spacer height={40} hideInPrint />
      <SectionTitle className="new-page">Indexná analýza</SectionTitle>

      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={[...newHeaders]}
          inputs={[['(Ib) - bázický index', `I_{b} = \\frac{N_{i}}{N_{b}}`]]}
          data={[[...baseIndexes]]}
          newPageAfter={false}
        />
      </Paper>

      <Spacer height={40} />

      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={[...betweenYears]}
          inputs={[
            ['(Ir) - reťazový index', `I_{r} = \\frac{N_{i+1}}{N_{i}}`],
            [
              '(Pzn) - percento zmeny nákladov (%)',
              `P_{zn} = = (\\frac{N_{i+1}}{N_{i}} \\times) - 100`,
            ],
            [
              '(Pzv) - percento zmeny výnosov (%)',
              `P_{zn} = = (\\frac{V_{i+1}}{V_{i}} \\times) - 100`,
            ],
            ['(Kr) - koeficient reakcie', `K_{r} = \\frac{P_{zn}}{P_{zv}}`],
          ]}
          data={[
            [...chainIndexes],
            [...costDiff.map((value: number) => value.toString())],
            [...incomeDiff.map((value: number) => value.toString())],
            [...reaction],
          ]}
        />
      </Paper>

      <Spacer height={60} hideInPrint />

      <SectionTitle>Dashboarding</SectionTitle>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <GraphCard>
            <GraphTitle>VÝVOJ EKONOMICKÝCH VELIČÍN</GraphTitle>
            {
              <ReactApexChart
                options={economicOptions}
                series={economicSeries}
                type="bar"
                height={420}
              />
            }
          </GraphCard>
        </Grid>

        <Grid item xs={12}>
          <GraphCard>
            <GraphTitle>BÁZICKÝ INDEX</GraphTitle>
            {
              <ReactApexChart
                options={baseOptions}
                series={baseSeries}
                type="bar"
                height={420}
              />
            }
          </GraphCard>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <GraphCard>
                <GraphTitle>REŤAZOVÝ INDEX</GraphTitle>
                {
                  <ReactApexChart
                    options={chainOptions}
                    series={chainSeries}
                    type="bar"
                    height={450}
                  />
                }
              </GraphCard>
            </Grid>

            <Grid item xs={12} md={6} spacing={2}>
              <GraphCard>
                <GraphTitle>PERCENTO ZMENY NÁKLADOV</GraphTitle>
                {
                  <ReactApexChart
                    options={costDiffOptions}
                    series={costDiffSeries}
                    type="bar"
                    height={450}
                  />
                }
              </GraphCard>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <GraphCard>
                <GraphTitle>PERCENTO ZMENY VÝNOSOV</GraphTitle>
                {
                  <ReactApexChart
                    options={incomeDiffOptions}
                    series={incomeDiffSeries}
                    type="bar"
                    height={450}
                  />
                }
              </GraphCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <GraphCard>
                <h4 className={'graph-title'}>KOFICIENT REAKCIE</h4>
                {
                  <ReactApexChart
                    options={reactionOptions}
                    series={reactionSeries}
                    type="bar"
                    height={450}
                  />
                }
              </GraphCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
