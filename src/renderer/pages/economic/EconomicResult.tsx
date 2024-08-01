import ReactApexChart from 'react-apexcharts';
import TableStatic from '../../components/TableStatic';
import { useColGraph, useLineGraph } from '../../graphOptions';
import { ApexOptions } from 'apexcharts';
import { economicCalculation } from './economicCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectEconomic } from './economicSlice';
import SectionTitle from 'renderer/components/SectionTitle';
import Spacer from 'renderer/components/Spacer';
import { Paper } from '@mui/material';
import { GraphCard } from 'renderer/components/graph/GraphCard';
import { GraphTitle } from 'renderer/components/graph/GraphTitle';

export default function EconomicResult() {
  const { headers, data, values } = useAppSelector(selectEconomic);
  const {
    costData,
    incomeData,
    profitData,
    costProfitabilityData,
    incomeProfitabilityData,
    costEfficiencyData,
    costIndicatorData,
    materialCostData,
    wageCostData,
    depreciationCostData,
    financialConstData,
    servicesConstData,
    taxesConstData,
  } = economicCalculation(data, values, headers.length ?? 0);
  const lineSeries = [
    {
      name: 'Náklady (N<sub>c</sub>)',
      data: costData,
    },
    {
      name: 'Výnosy (V<sub>c</sub>)',
      data: incomeData,
    },
    {
      name: 'Výsledok hospodárenia - zisk/strata (VH)',
      data: profitData,
    },
  ];

  const colSeries = [
    {
      name: 'Rentabilita výnosov R<sub>v</sub>',
      data: incomeProfitabilityData,
    },
    {
      name: 'Rentabilita nákladov R<sub>n</sub>',
      data: costProfitabilityData,
    },
    {
      name: 'Nákladová účinnosť N<sub>ú</sub>',
      data: costEfficiencyData,
    },
    {
      name: 'Efektívnosť',
      data: costEfficiencyData,
    },
    {
      name: 'Nákladovosť celkom h<sub>c</sub>',
      data: costIndicatorData,
    },
  ];

  const lineOptions: ApexOptions = useLineGraph(headers);

  const colOptions: ApexOptions = useColGraph(
    headers,
    'hodnota ukazovateľa (koeficient)'
  );

  return (
    <div>
      <Spacer height={40} hideInPrint />
      <SectionTitle className="new-page">
        Analýza ekonomických ukazovateľov
      </SectionTitle>
      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={[...headers]}
          inputs={[
            ['(N<sub>c</sub>) - náklady celkom (€)', `\\sum N `],
            ['(V<sub>c</sub>) - výnosy celkom (€)', `\\sum V `],
            [
              '(VH) - výsledok hospodárenia (€)',
              `\\begin{align*}
              \\text{ZISK} & \\quad V > N \\\\
              \\text{STRATA} & \\quad V < N
              \\end{align*}`,
            ],
            ['(R<sub>n</sub>) - rentabilita nákladov', `R_{n}=\\frac{Z}{N}`],
            ['(R<sub>v</sub>) - rentabilita výnosov', `R_{v}=\\frac{Z}{V}`],
            ['(N<sub>ú</sub>) - nákladová účinnosť', `N_{u}=\\frac{V}{N}`],
            ['(e) - efektívnosť', `e=\\frac{V}{N}`],
            ['(h<sub>c</sub>) - nákladovosť celkom', `h_{c}=\\frac{N}{V}`],
            [
              'h<sub>m</sub> - materiálová nákladovosť',
              '\\frac{N_{MAT (501)}}{V}',
            ],
            [
              'h<sub>mz</sub> - mzdová nákladovosť',
              '\\frac{N_{MZDY (521)}}{V}',
            ],
            [
              'h<sub>o</sub> - odpisová nákladovosť',
              '\\frac{N_{odpí (551)}}{V}',
            ],
            [
              'h<sub>f</sub> - finančná nákladovosť',
              '\\frac{N_{F (561-569)}}{V}',
            ],
            [
              'h<sub>s</sub> - nákladovosť služieb',
              '\\frac{N_{s (511-518)}}{V}',
            ],
            ['h<sub>d</sub> - nákladovosť daní', '\\frac{N_{d (531-538)}}{V}'],
            ['P<sub>o</sub> - celková produktivita', ''],
          ]}
          data={[
            costData,
            incomeData,
            profitData,
            costProfitabilityData,
            incomeProfitabilityData,
            costEfficiencyData,
            costEfficiencyData,
            costIndicatorData,
            materialCostData,
            wageCostData,
            depreciationCostData,
            financialConstData,
            servicesConstData,
            taxesConstData,
            // TODO: doplnit po konzultacii (celková produktivita)
            [0],
          ]}
        />
      </Paper>

      <Spacer height={40} hideInPrint />

      <SectionTitle>Dashboarding</SectionTitle>

      <GraphCard>
        <GraphTitle>TREND VÝVOJA EKONOMICKÝCH VELIČÍN</GraphTitle>
        <ReactApexChart
          options={lineOptions}
          series={lineSeries}
          type="line"
          height={420}
          width={'100%'}
        />
      </GraphCard>

      <Spacer height={40} hideInPrint />

      <GraphCard>
        <GraphTitle>Prehľad ekonomických ukazovaťeľov</GraphTitle>
        <ReactApexChart
          options={colOptions}
          series={colSeries}
          type="bar"
          height={420}
        />
      </GraphCard>
    </div>
  );
}
