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
    absoluteChainIndexes,
    baseIndexes,
    newHeaders,
    costDiff,
    incomeDiff,
    costSumsForYears,
    incomeSumsForYears,
    customValueSumsForYears,
    betweenYears,
    reaction,
    absoluteBaseIndexes,
  } = indexCalculation(
    data as number[][],
    headers.map((h) => h.label),
    values
  );

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

  const valuesSummary = [
    {
      name: 'Náklady',
      data: costSumsForYears,
    },
    {
      name: 'Výnosy',
      data: incomeSumsForYears,
    },
    {
      name: 'Iné ekonomické položky',
      data: customValueSumsForYears,
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

  const allOptions: ApexOptions = {
    ...useColGraph(betweenYears),
    colors: ['#E91E63', '#66DA26', '#546E7A'],
  };

  return (
    <div>
      <Spacer height={40} hideInPrint />
      <SectionTitle className="new-page">
        Analýza Indexov a Rozdielov
      </SectionTitle>
      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={[...newHeaders]}
          inputs={[
            ['(I<sub>b</sub>) - bázický index', `I_{b} = \\frac{N_{i}}{N_{b}}`],
            [
              '(AR<sub>b</sub>) - absolútny bázický index',
              `AR_{b} = N_{i} - N_{b}`,
            ],
            ['(T<sub>rb</sub>) - bázické tempo rastu', `T_{rb} = I_{b} * 100%`],
          ]}
          data={[
            baseIndexes,
            absoluteBaseIndexes,
            baseIndexes.map((value) => value * 100),
          ]}
          newPageAfter={false}
        />
      </Paper>
      <Spacer height={40} />
      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={[...betweenYears]}
          inputs={[
            [
              '(I<sub>r</sub>) - reťazový index',
              `I_{r} = \\frac{N_{i+1}}{N_{i}}`,
            ],
            ['(AR) - absolutný reťazový index', `AR = N_{1} - N_{0}`],
            [
              '(P<sub>zn</sub>) - percento zmeny nákladov (%)',
              `P_{zn} = = (\\frac{N_{i+1}}{N_{i}} \\times) - 100`,
            ],
            [
              '(P<sub>zv</sub>) - percento zmeny výnosov (%)',
              `P_{zn} = = (\\frac{V_{i+1}}{V_{i}} \\times) - 100`,
            ],
            [
              '(K<sub>r</sub>) - koeficient reakcie',
              `K_{r} = \\frac{P_{zn}}{P_{zv}}`,
            ],
            [
              '(T<sub>rr</sub>) - reťazové tempo rastu',
              `T_{rr} = \\frac{P_{zn}}{P_{zv}}`,
            ],
          ]}
          data={[
            chainIndexes,
            absoluteChainIndexes,
            costDiff.map((value: number) => value.toString()),
            incomeDiff.map((value: number) => value.toString()),
            reaction,
            chainIndexes.map((value) => value * 100),
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

        <Grid item xs={12}>
          <GraphCard>
            <GraphTitle>Náklady, výnosy a iné ekonomické položky </GraphTitle>
            {
              <ReactApexChart
                options={allOptions}
                series={valuesSummary}
                type="line"
                height={420}
              />
            }
          </GraphCard>
        </Grid>
      </Grid>
    </div>
  );
}
