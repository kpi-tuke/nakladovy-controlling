import TableStatic from '../../components/TableStatic';
import { cvpCalculation } from './cvpCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectCVP } from './cvpSlice';
import { Grid, Paper } from '@mui/material';
import SectionTitle from '@renderer/components/SectionTitle';
import Spacer from '@renderer/components/Spacer';
import LineGraph from '@renderer/components/graph/LineGraph';
import { transposeMatrix } from '@renderer/helper';
import { useMemo } from 'react';

type Graph = {
  title: string;
  labels: string[];
  series: { data: number[] }[];
};

export default function CVPResult() {
  const { data, headers } = useAppSelector(selectCVP);

  const {
    volumes,
    prices,
    zeroTon,
    zeroProf,
    zeroEur,
    costs,
    capacityUsage,
    fixTotals,
    totalCosts,
    incomeTotal,
    economicResult,
  } = cvpCalculation(transposeMatrix(data));

  const graphs = useMemo(() => {
    return headers.map((header, idx) => {
      const costTotal: number[] = [];
      const incomeTotal: number[] = [];
      const osX: number[] = [0];

      if (zeroTon[idx] === 0)
        if (volumes[idx] === 0) osX.push(5);
        else osX.push(volumes[idx] * 2);
      else osX.push(zeroTon[idx]);

      if (zeroProf[idx] === zeroTon[idx]) {
        if (zeroProf[idx] === 0) osX.push(osX[1] * 2);
        else osX.push(zeroTon[idx] * 2);
      } else osX.push(zeroProf[idx]);

      if (volumes[idx] === 0)
        osX.push(Math.max(...osX) + Math.max(...osX) * 0.3);
      else if (volumes[idx] === zeroTon[idx])
        osX.push(Math.round(zeroTon[idx] / 2));
      else osX.push(volumes[idx]);

      osX.push(Math.max(...osX) + Math.max(...osX) * 0.3);

      osX.map((vol: number) => {
        costTotal.push(
          Math.round((costs[idx] * vol + fixTotals[idx]) * 100) / 100,
        );

        incomeTotal.push(Math.round(prices[idx] * vol * 100) / 100);
      });

      costTotal.sort(function (a, b) {
        return a - b;
      });

      incomeTotal.sort(function (a, b) {
        return a - b;
      });

      osX.sort(function (a, b) {
        return a - b;
      });

      const series = [
        {
          name: 'Náklady',
          data: costTotal,
        },
        {
          name: 'Výnosy',
          data: incomeTotal,
        },
      ];

      return {
        title: header.label,
        series,
        labels: osX.map((value) => value.toString()),
      } as Graph;
    });
  }, [headers, volumes, prices, zeroTon, zeroProf, zeroEur, costs]);

  return (
    <div>
      <Spacer height={40} hideInPrint />

      <SectionTitle className={'new-page'}>
        Analýza nulového bodu - kritický bod rentability
      </SectionTitle>

      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={headers.map((header) => header.label)}
          inputs={[
            ['(Nc) náklady celkové (€)', `N_{c}=\\frac{N_{f} + Q*N_{vj}}`],
            ['(T) tržby celkové (€)', `T=\\frac{Q} + P_{cj}`],
            ['(VH) výsledok hospodárenia (€)', `VH=T - V_{c}`],
            [
              '(N<sub>0</sub>) - nulový bod (množstvo)',
              `N_{0}=\\frac{F_{n}}{P_{cj}-N_{vj}}`,
            ],
            [
              '(N<sub>0</sub>) - nulový bod (€)',
              `N_{0}=\\frac{F{n}}{1-\\frac{N_{vj}}{P_{cj}}}`,
            ],
            [
              '(N<sub>0</sub>) - nulový bod Zmin (množstvo)',
              `N_{0}=\\frac{F_{n}+Z_{min}}{P_{cj}-N_{vj}}`,
            ],
            [
              '(VK<sub>krit</sub>) - kritické využitie výrobnej kapacity (%)',
              `VK_{krit}=\\frac{N_{0}(ton)}{Q * 100%}`,
            ],
            ['Merná jednotka'],
          ]}
          data={[
            totalCosts,
            incomeTotal,
            economicResult,
            zeroTon,
            zeroEur,
            zeroProf,
            capacityUsage,
            data[1],
          ]}
        />
      </Paper>

      <Spacer height={40} hideInPrint />

      <SectionTitle>Dashboarding</SectionTitle>

      <Grid container spacing={2}>
        {graphs.map((graph, index) => {
          return (
            <>
              <Grid
                item
                xs={12}
                key={index}
                className={index % 2 === 0 && index !== 0 ? 'new-page' : ''}
              >
                <LineGraph
                  title={'NULOVÝ BOD: ' + graph.title.toUpperCase()}
                  labels={graph.labels}
                  height={420}
                  data={[
                    {
                      name: 'Náklady',
                      values: graph.series[0].data,
                    },
                    {
                      name: 'Výnosy',
                      values: graph.series[1].data,
                    },
                  ]}
                  referenceLines={[
                    {
                      x: zeroTon[index].toString(),
                      stroke: '#FF4e4e',
                      label: 'Nulový bod',
                      width: 90,
                    },
                  ]}
                  yAxisLabel="ekonomická veličina (€)"
                  xAxisLabel={`objem produkcie jednotky ${
                    data[index][1] ? `(${data[index][1]})` : ''
                  }`}
                />
              </Grid>
            </>
          );
        })}
      </Grid>
    </div>
  );
}
