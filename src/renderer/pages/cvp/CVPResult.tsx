import TableStatic from '../../components/TableStatic';
import ReactApexChart from 'react-apexcharts';
import { useCVPGraph } from '../../graphOptions';
import { ApexOptions } from 'apexcharts';
import { cvpCalculation } from './cvpCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectCVP } from './cvpSlice';
import { Grid, Paper } from '@mui/material';
import SectionTitle from 'renderer/components/SectionTitle';
import Spacer from 'renderer/components/Spacer';
import { GraphCard } from 'renderer/components/graph/GraphCard';
import { GraphTitle } from 'renderer/components/graph/GraphTitle';

export default function CVPResult() {
  const { data, items } = useAppSelector(selectCVP);
  const {
    volumes,
    prices,
    zeroTon,
    zeroProf,
    zeroEur,
    costs,
    zeroSellPrice,
    paymentMoney,
    fixedCosts,
    capacityUsage,
    fixTotals,
  } = cvpCalculation(data);

  const graphs: {
    value: string;
    graph: ApexOptions;
    series: { name: string; data: number[] }[];
  }[] = [];

  items.forEach((product: any, idx: number) => {
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

    osX.map((vol: number, index) => {
      costTotal.push(
        Math.round((costs[idx] * vol + fixTotals[index]) * 100) / 100
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
      value: product,
      graph,
      series,
    });
  });

  return (
    <div>
      <Spacer height={40} hideInPrint />

      <SectionTitle className={'new-page'}>
        Analýza nulového bodu - kritický bod rentability
      </SectionTitle>

      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={items}
          inputs={[
            [
              '(N<sub>0</sub>) - nulový bod',
              `N_{0}=\\frac{F_{n}}{P_{cj}-N_{vj}}`,
            ],
            [
              '(N<sub>0</sub>) - nulový bod (€)',
              `N_{0}=\\frac{F{n}}{1-\\frac{N_{vj}}{P_{cj}}}`,
            ],
            [
              '(N<sub>0</sub>) - nulový bod Zmin (ks)',
              `N_{0}=\\frac{F_{n}+Z_{min}}{P_{cj}-N_{vj}}`,
            ],
            [
              '(P<sub>c</sub>) - pri predajnej cene (€)',
              `N_{0}=\\frac{F_{n}}{Q+N_{vj}}`,
            ],
            [
              '(P<sub>ú</sub>) - príspevok na úhradu fixných nákladov a zisku (€)',
              `P_{ú}=\P_{cj}-N_{vj}`,
            ],
            [
              '(NF<sub>j</sub>) - náklady fixné jednotkové (€)',
              `NF_{j}=\\frac{F_{n}}{Q}`,
            ],
            [
              '(VK<sub>krit</sub>) - kritické využitie výrobnej kapacity',
              `VK_{krit}=\\frac{N_{0}(ton)}{Q * 100%}`,
            ],
          ]}
          data={[
            [...zeroTon.map((value: number) => Math.round(value * 100) / 100)],
            [...zeroEur.map((value: number) => Math.round(value * 100) / 100)],
            [...zeroProf.map((value: number) => Math.round(value * 100) / 100)],
            [
              ...zeroSellPrice.map(
                (value: number) => Math.round(value * 100) / 100
              ),
            ],
            [
              ...paymentMoney.map(
                (value: number) => Math.round(value * 100) / 100
              ),
            ],
            [
              ...fixedCosts.map(
                (value: number) => Math.round(value * 100) / 100
              ),
            ],
            [
              ...capacityUsage.map(
                (value: number) => Math.round(value * 100) / 100
              ),
            ],
          ]}
        />
      </Paper>

      <Spacer height={40} hideInPrint />

      <SectionTitle>Dashboarding</SectionTitle>

      <Grid container spacing={2}>
        {graphs.map((graph, index) => (
          <Grid
            item
            xs={12}
            key={index}
            className={index % 2 === 0 && index !== 0 ? 'new-page' : ''}
          >
            <GraphCard>
              <GraphTitle>
                {'NULOVÝ BOD: ' + graph.value.toUpperCase()}
              </GraphTitle>
              <ReactApexChart
                options={graph.graph}
                series={graph.series}
                type="line"
                height={420}
              />
            </GraphCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
