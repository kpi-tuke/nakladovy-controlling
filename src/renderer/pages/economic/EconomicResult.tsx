import ReactApexChart from 'react-apexcharts';
import TableStatic from '../../components/TableStatic';
import { useColGraph, useLineGraph } from '../../graphOptions';
import { ApexOptions } from 'apexcharts';
import { economicCalculation } from './economicCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectEconomic } from './economicSlice';

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
  } = economicCalculation(data, values);
  const lineSeries = [
    {
      name: 'Náklady',
      data: costData,
    },
    {
      name: 'Výnosy',
      data: incomeData,
    },
    {
      name: 'Zisk',
      data: profitData,
    },
  ];

  const colSeries = [
    {
      name: 'Rentabilita výnosov',
      data: incomeProfitabilityData,
    },
    {
      name: 'Rentabilita nákladov',
      data: costProfitabilityData,
    },
    {
      name: 'Nákladová účinnosť',
      data: costEfficiencyData,
    },
    {
      name: 'Nákladovosť',
      data: costIndicatorData,
    },
  ];

  const lineOptions: ApexOptions = useLineGraph(headers);

  const colOptions: ApexOptions = useColGraph(headers, 'koeficient');

  return (
    <div className={'new-page'}>
      <h1 className={'result-h1'}>Analýza ekonomických ukazovateľov</h1>

      <div className={'table-card'} style={{ marginTop: 50 }}>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={[...headers]}
          inputs={[
            ['(Z) - zisk (€)', 'V - N'],
            ['(N) - náklady celkom (€)', `\\sum N `],
            ['(V) - výnosy celkom (€)', `\\sum V `],
            ['(Rv) - rentabilita výnosov', `R_{v}=\\frac{Z}{V}`],
            ['(Rn) - rentabilita nákladov', `R_{n}=\\frac{Z}{N}`],
            ['(Nú) - nákladová účinnosť', `N_{u}=\\frac{V}{N}`],
            ['(n) - nákladovosť', `n=\\frac{N}{V}`],
          ]}
          data={[
            [...profitData],
            [...costData],
            [...incomeData],
            [...incomeProfitabilityData],
            [...costProfitabilityData],
            [...costEfficiencyData],
            [...costIndicatorData],
          ]}
        />
      </div>

      <h1 className={'result-h1 new-page'}>Dashboarding</h1>

      <div className={'graph-card'}>
        <h4 className={'graph-title'}>TREND VÝVOJA EKONOMICKÝCH VELIČÍN</h4>
        <ReactApexChart
          options={lineOptions}
          series={lineSeries}
          type="line"
          height={420}
        />
      </div>

      <div className={'graph-card new-page-after'}>
        <h4 className={'graph-title'}>
          EKONOMICKÉ UKAZOVATELE V SLEDOVANOM OBDOBÍ
        </h4>
        <ReactApexChart
          options={colOptions}
          series={colSeries}
          type="bar"
          height={420}
        />
      </div>
    </div>
  );
}
