import '../../ScreenStyle.css';
import ReactApexChart from 'react-apexcharts';
import TableStatic from '../TableStatic';
import InfoCard from '../InfoCard';
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
    <div>
      <h1 className={'result-h1'}>Analýza ekonomických ukazovateľov</h1>

      <div className={'row'}>
        <div className={'col-4'}>
          <InfoCard
            header={'VÝNOSY CELKOM'}
            value={props.result.incomeTotal.toString() + '€'}
          />
        </div>

        <div className={'col-4'}>
          <InfoCard
            header={'NÁKLADY CELKOM'}
            value={props.result.costTotal.toString() + '€'}
          />
        </div>

        <div className={'col-4'}>
          <InfoCard
            header={'ZISK CELKOM'}
            value={props.result.profitTotal.toString() + '€'}
          />
        </div>
      </div>

      <div className={'table-card'} style={{ marginTop: 50 }}>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={[...props.result.headers]}
          inputs={[
            'Zisk (€)',
            'Rentabilita výnosov (%)',
            'Rentabilita nákladov (%)',
            'Nákladová účinnosť (%)',
            'Nákladovosť (%)',
          ]}
          data={[
            [...props.result.profitData],
            [...props.result.incomeProfitabilityData],
            [...props.result.costProfitabilityData],
            [...props.result.costEfficiencyData],
            [...props.result.costIndicatorData],
          ]}
        />
      </div>

      <h1 className={'result-h1'}>Dashboarding</h1>

      <div className={'graph-card'}>
        <h4 className={'graph-title'}>TREND VÝVOJA EKONOMICKÝCH VELIČÍN</h4>
        {
          <ReactApexChart
            options={lineOptions}
            series={lineSeries}
            type="line"
            height={300}
          />
        }
      </div>

      <div className={'graph-card'}>
        <h4 className={'graph-title'}>
          EKONOMICKÉ UKAZOVATELE V SLEDOVANOM OBDOBÍ
        </h4>
        {
          <ReactApexChart
            options={colOptions}
            series={colSeries}
            type="bar"
            height={300}
          />
        }
      </div>
    </div>
  );
}
