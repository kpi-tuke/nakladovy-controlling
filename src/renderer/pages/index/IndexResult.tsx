import TableStatic from '../../components/TableStatic';
import { indexCalculation } from './indexCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectIndex } from '../index/indexSlice';
import SectionTitle from 'renderer/components/SectionTitle';
import Spacer from 'renderer/components/Spacer';
import { Grid, Paper } from '@mui/material';
import BarGraph from 'renderer/components/graph/BarGraph';
import LineGraph from 'renderer/components/graph/LineGraph';

export default function IndexResult() {
  const { data, headers, values, items } = useAppSelector(selectIndex);
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

  return (
    <>
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
          <BarGraph
            title="VÝVOJ EKONOMICKÝCH VELIČÍN"
            height={420}
            labels={headers.slice(1).map((h) => h.label)}
            data={[
              {
                name: 'Náklady',
                values: costSumsForYears,
              },
              {
                name: 'Výnosy',
                values: incomeSumsForYears,
              },
            ]}
            yAxisLabel="ekonomická veličina (€)"
          />
        </Grid>

        <Grid item xs={12}>
          <BarGraph
            title="BÁZICKÝ INDEX"
            height={420}
            labels={headers.slice(1).map((h) => h.label)}
            data={[
              {
                name: 'Bázický index',
                values: baseIndexes,
              },
            ]}
            showLegend={false}
          />
        </Grid>

        <Grid item xs={12}>
          <BarGraph
            title="REŤAZOVÝ INDEX"
            height={420}
            labels={betweenYears}
            data={[
              {
                name: 'Percento zmeny výnosov',
                values: chainIndexes,
              },
            ]}
            showLegend={false}
          />
        </Grid>

        <Grid item xs={12}>
          <LineGraph
            title="Trend vývoja ekonomických veličin"
            height={420}
            labels={headers.slice(1).map((h) => h.label)}
            data={items.filter(Boolean).map((item, index) => ({
              name: item,
              values: data[index].slice(1),
            }))}
          />
        </Grid>
      </Grid>
    </>
  );
}
