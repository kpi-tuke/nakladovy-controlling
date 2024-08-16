import TableStatic from '../../components/TableStatic';
import { sortimentCalculation } from './sortimentCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectSortiment } from './sortimentSlice';
import SectionTitle from '@renderer/components/SectionTitle';
import { Grid, Paper } from '@mui/material';
import Spacer from '@renderer/components/Spacer';
import BarGraph from '@renderer/components/graph/BarGraph';

export default function SortimentResult() {
  const { headers, data } = useAppSelector(selectSortiment);
  const {
    marginGross,
    marginProfit,
    profit,
    rentCost,
    rentIncome,
    allowance,
    totalDirectCosts,
    totalIndirectCosts,
    unitProfit,
    income,
    totalCosts,
    totalProfit,
  } = sortimentCalculation(data as number[][]);

  return (
    <div>
      <Spacer height={40} hideInPrint />

      <SectionTitle className="new-page">
        Ukazovatele sortimentnej analýzy
      </SectionTitle>
      <Paper>
        <TableStatic
          corner={'Ukazovatele sortimentnej analýzy'}
          header={headers.map((h) => h.label)}
          inputs={[
            ['(T) - tržby (€)', `T = P_{c} * Q`],
            ['(NC) - náklady celkom (€)', `NC = N_{p} + N_{n}`],
            ['(Z<sub>c</sub>) - celopodnikový zisk (€)', `Z_{c} = T - NC`],
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
            ['(ZP) - zisková prirážka (€)', `ZP = P_{cj} - ÚVN`],
            [
              '(Z) - zisk pri pôvodnej výrobnej štruktúre (€)',
              `Z =((P_{cj} - P_{n}) - (ÚVN - P_{n})) \\times Q`,
            ],
            ['(Z<sub>j</sub>) - zisk jednotkový (€)', `Z_{j} = P_{c} - ÚVN`],
            [
              '(N<sub>p</sub>) - priame náklady celkom (€)',
              `N_{p} = P_{m} + P_{mz} + P_{o}`,
            ],
            [
              '(NP<sub>c</sub>) - nepriame (režijné) náklady celkom (€)',
              `NP_{c} = ÚVP - P_{c}`,
            ],
          ]}
          data={[
            income,
            totalCosts,
            totalProfit,
            rentIncome,
            rentCost,
            marginGross,
            allowance,
            marginProfit,
            profit,
            unitProfit,
            totalDirectCosts,
            totalIndirectCosts,
          ]}
        />
      </Paper>

      <Spacer height={40} hideInPrint />

      <SectionTitle>Dashboarding</SectionTitle>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BarGraph
            title="UKAZOVATELE SORTIMENTNEJ ANALÝZY"
            height={420}
            labels={['Rentabilita tržieb', 'Rentabilita nákladov']}
            data={headers.map((h, index) => ({
              name: h.label,
              values: [rentIncome[index], rentCost[index]],
            }))}
            showValueInBar={true}
            yAxisLabel="ekonomický ukazovatel (%)"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <BarGraph
            title="HRUBÉ ROZPÄTIE"
            height={420}
            labels={['']}
            data={headers.map((header, index) => ({
              name: header.label,
              values: [marginGross[index]],
            }))}
            showValueInBar
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <BarGraph
            title="PRÍSPEVOK NA ÚHRADU"
            height={420}
            labels={['']}
            data={headers.map((header, index) => ({
              name: header.label,
              values: [allowance[index]],
            }))}
            showValueInBar
          />
        </Grid>
      </Grid>
    </div>
  );
}
