import TableStatic from '../../components/TableStatic';
import ReactApexChart from 'react-apexcharts';
import { useCVPGraph } from '../../graphOptions';
import { ApexOptions } from 'apexcharts';
import { cvpCalculation } from './cvpCalculation';
import { useAppSelector } from '../../store/hooks';
import { CVPActions, selectCVP } from './cvpSlice';
import SingleInput from '../../components/SingleInput';
import { Box, Paper, styled } from '@mui/material';
import SectionTitle from 'renderer/components/SectionTitle';
import Spacer from 'renderer/components/Spacer';

const Inputs = styled(Box)`
  max-width: 600px;
  margin: 0 auto;
  margin-top: 40px;
`;

export default function CVPResult() {
  const { data, items, fixTotal, minProfit } = useAppSelector(selectCVP);
  const { volumes, prices, zeroTon, zeroProf, zeroEur, costs } = cvpCalculation(
    data,
    fixTotal,
    minProfit
  );
  const graphs: {
    value: string;
    graph: ApexOptions;
    series: { name: string; data: number[] }[];
  }[] = [];

  items.map((value: any, idx: number) => {
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

    if (volumes[idx] === 0) osX.push(Math.max(...osX) + Math.max(...osX) * 0.3);
    else if (volumes[idx] === zeroTon[idx])
      osX.push(Math.round(zeroTon[idx] / 2));
    else osX.push(volumes[idx]);

    osX.push(Math.max(...osX) + Math.max(...osX) * 0.3);

    osX.map((vol: number) => {
      costTotal.push(Math.round((costs[idx] * vol + fixTotal) * 100) / 100);

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

    const graph: ApexOptions = useCVPGraph(
      osX.map((x: number) => x.toString()),
      zeroTon[idx],
      zeroProf[idx]
    );
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
    graphs.push({
      value,
      graph,
      series,
    });
  });

  return (
    <div className={graphs.length % 2 === 0 ? 'new-page-after' : ''}>
      <Inputs
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
          },
          gap: '8px',
        }}
      >
        <SingleInput
          title={'FIXNÉ NÁKLADY'}
          value={fixTotal}
          action={CVPActions.setFixTotal}
        />
        <SingleInput
          title={'MINIMÁLNY ZISK'}
          value={minProfit}
          action={CVPActions.setMinProfit}
        />
      </Inputs>

      <Spacer height={40} />
      <SectionTitle className={'new-page'}>
        Analýza nulového bodu - kritický bod rentability
      </SectionTitle>

      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          // @ts-ignore
          header={...items}
          inputs={[
            [
              '(No) - nulový bod (€)',
              `N_{0}=\\frac{F{n}}{1-\\frac{N_{vj}}{P_{cj}}}`,
            ],
            ['(No) - nulový bod (ks...)', `N_{0}=\\frac{F_{n}}{P_{cj}-N_{vj}}`],
            [
              '(No) - nulový bod Zmin (ks...)',
              `N_{0}=\\frac{F_{n}+Z_{min}}{P_{cj}-N_{vj}}`,
            ],
          ]}
          data={[
            [...zeroEur.map((value: number) => Math.round(value * 100) / 100)],
            [...zeroTon.map((value: number) => Math.round(value * 100) / 100)],
            [...zeroProf.map((value: number) => Math.round(value * 100) / 100)],
          ]}
        />
      </Paper>

      <Spacer height={40} />
      <SectionTitle className={'new-page'}>Dashboarding</SectionTitle>

      {graphs.map((graph, idx) => (
        <div key={idx} className={idx % 2 === 0 && idx !== 0 ? 'new-page' : ''}>
          <div className={'col-12'}>
            <div className={'graph-card'}>
              <h4 className={'graph-title'}>
                {'NULOVÝ BOD: ' + graph.value.toUpperCase()}
              </h4>
              <ReactApexChart
                options={graph.graph}
                series={graph.series}
                type="line"
                height={420}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
