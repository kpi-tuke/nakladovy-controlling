import ReactApexChart from 'react-apexcharts';
import TableStatic from '../TableStatic';
import { colGraph, lineGraph } from '../graphOptions';
import { ApexOptions } from 'apexcharts';

export interface r {
  headers: string[];
  costData: number[];
  incomeData: number[];
  profitData: number[];
  incomeProfitabilityData: number[];
  costProfitabilityData: number[];
  costEfficiencyData: number[];
  costIndicatorData: number[];
}

export default function EconomicResult({
  result: {
    headers,
    costData,
    incomeData,
    profitData,
    incomeProfitabilityData,
    costProfitabilityData,
    costEfficiencyData,
    costIndicatorData,
  },
}: {
  result: r;
}) {
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

  const lineOptions: ApexOptions = lineGraph(headers);
  const colOptions: ApexOptions = colGraph(headers);

  return (
    <div className={'new-page'}>
      <h1 className={'result-h1'}>Analýza ekonomických ukazovateľov</h1>

      <div className={'table-card'} style={{ marginTop: 50 }}>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={[...headers]}
          inputs={[
            'Zisk (€)',
            'Náklady celkom (€)',
            'Výnosy celkom (€)',
            'Rentabilita výnosov',
            'Rentabilita nákladov',
            'Nákladová účinnosť',
            'Nákladovosť',
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
          height={450}
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
          height={450}
        />
      </div>
    </div>
  );
}
