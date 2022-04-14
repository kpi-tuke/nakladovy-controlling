import ReactApexChart from 'react-apexcharts';
import TableStatic from '../TableStatic';
import { colGraph, lineGraph } from '../graphOptions';
import { ApexOptions } from 'apexcharts';

export default function EconomicResult(props: any) {
  const lineSeries = [
    {
      name: 'Náklady',
      data: props.result.costData,
    },
    {
      name: 'Výnosy',
      data: props.result.incomeData,
    },
    {
      name: 'Zisk',
      data: props.result.profitData,
    },
  ];

  const colSeries = [
    {
      name: 'Rentabilita výnosov',
      data: props.result.incomeProfitabilityData,
    },
    {
      name: 'Rentabilita nákladov',
      data: props.result.costProfitabilityData,
    },
    {
      name: 'Nákladová účinnosť',
      data: props.result.costEfficiencyData,
    },
    {
      name: 'Nákladovosť',
      data: props.result.costIndicatorData,
    },
  ];

  const lineOptions: ApexOptions = lineGraph(props.result.headers);
  const colOptions: ApexOptions = colGraph(props.result.headers);

  return (
    <div className={"new-page"}>
      <h1 className={'result-h1'}>Analýza ekonomických ukazovateľov</h1>

      <div className={'table-card'} style={{ marginTop: 50 }}>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={[...props.result.headers]}
          inputs={[
            'Zisk (€)',
            "Náklady celkom (€)",
            "Výnosy celkom (€)",
            'Rentabilita výnosov',
            'Rentabilita nákladov',
            'Nákladová účinnosť',
            'Nákladovosť',
          ]}
          data={[
            [...props.result.profitData],
            [...props.result.costData],
            [...props.result.incomeData],
            [...props.result.incomeProfitabilityData],
            [...props.result.costProfitabilityData],
            [...props.result.costEfficiencyData],
            [...props.result.costIndicatorData],
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
            height={300}
          />
      </div>

      <div className={'graph-card'}>
        <h4 className={'graph-title'}>
          EKONOMICKÉ UKAZOVATELE V SLEDOVANOM OBDOBÍ
        </h4>
          <ReactApexChart
            options={colOptions}
            series={colSeries}
            type="bar"
            height={300}
          />
      </div>
    </div>
  );
}
