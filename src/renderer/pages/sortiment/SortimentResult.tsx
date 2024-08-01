import TableStatic from '../../components/TableStatic';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useColGraph } from '../../graphOptions';
import { sortimentCalculation } from './sortimentCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectSortiment } from './sortimentSlice';
import SectionTitle from 'renderer/components/SectionTitle';
import { Grid, Paper } from '@mui/material';
import Spacer from 'renderer/components/Spacer';
import { GraphCard } from 'renderer/components/graph/GraphCard';
import { GraphTitle } from 'renderer/components/graph/GraphTitle';

export default function SortimentResult() {
  const { headers, data } = useAppSelector(selectSortiment);
  const { marginGross, marginProfit, profit, rentCost, rentIncome, allowance } =
    sortimentCalculation(data);
  let series = [];
  for (let index = 0; index < headers.length; index++) {
    series.push({
      name: headers[index].toString(),
      data: [rentIncome[index], rentCost[index]],
    });
  }

  let series2: any[] = [];
  for (let index = 0; index < headers.length; index++) {
    series2.push({
      name: headers[index].toString(),
      data: [marginGross[index]],
    });
  }

  let series3: any[] = [];
  for (let index = 0; index < headers.length; index++) {
    series3.push({
      name: headers[index].toString(),
      data: [allowance[index]],
    });
  }

  const rentabilityOptions: ApexOptions = useColGraph(
    ['Rentabilita tržieb', 'Rentabilita nákladov'],
    'ekonomický ukazovatel (%)'
  );
  const marginOptions: ApexOptions = useColGraph(
    [''],
    'ekonomický ukazovatel (€)'
  );
  const allowanceOptions: ApexOptions = useColGraph(
    [''],
    'ekonomický ukazovatel (€)'
  );

  return (
    <div>
      <Spacer height={40} hideInPrint />

      <SectionTitle className="new-page">
        Ukazovatele sortimentnej analýzy
      </SectionTitle>
      <Paper>
        <TableStatic
          corner={'Ukazovatele sortimentnej analýzy'}
          header={[...headers]}
          inputs={[
            [
              '(Rt) - rentabilita tržieb (%)',
              `R_{t}=\\frac{ZP}{P_{cj}}\\times 100`,
            ],
            [
              '(Rn) - rentabilita nákladov (%)',
              `R_{n}=\\frac{ZP}{ÚVN}\\times 100`,
            ],
            ['(Hr) - hrubé rozpätie (€)', `H_{r}={P_{cj}}-{P_{n}}`],
            ['(Pú) - príspevok na úhradu (€)', `P_{ú}=1-\\frac{P_{n}}{P_{cj}}`],
            ['(ZP) - Zisková prirážka (€)', `ZP = P_{cj} - ÚVN`],
            [
              '(Z) - Zisk pri pôvodnej výrobnej štruktúre (€)',
              `Z =((P_{cj} - P_{n}) - (ÚVN - P_{n})) \\times Q`,
            ],
          ]}
          data={[
            [...rentIncome],
            [...rentCost],
            [...marginGross],
            [...allowance],
            [...marginProfit],
            [...profit],
          ]}
        />
      </Paper>

      <Spacer height={40} hideInPrint />

      <SectionTitle>Dashboarding</SectionTitle>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <GraphCard>
            <GraphTitle>UKAZOVATELE SORTIMENTNEJ ANALÝZY</GraphTitle>
            {
              <ReactApexChart
                options={rentabilityOptions}
                series={series}
                type="bar"
                height={420}
              />
            }
          </GraphCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <GraphCard>
            <GraphTitle>HRUBÉ ROZPÄTIE</GraphTitle>
            <ReactApexChart
              options={marginOptions}
              series={series2}
              type="bar"
              height={420}
            />
          </GraphCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <GraphCard>
            <GraphTitle>PRÍSPEVOK NA ÚHRADU</GraphTitle>
            <ReactApexChart
              options={allowanceOptions}
              series={series3}
              type="bar"
              height={420}
            />
          </GraphCard>
        </Grid>
      </Grid>
    </div>
  );
}
