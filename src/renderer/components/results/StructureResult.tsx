import ReactApexChart from 'react-apexcharts';
import TableStatic from '../TableStatic';
import { colGraph } from '../graphOptions';

export default function StructureResult(props: any) {
  const genericSeries = [
    {
      data: props.result.rowSums,
    },
  ];

  const calculationSeries = [
    {
      data: props.result.colSums,
    },
  ];

  const genericOptions = {
    ...colGraph(props.result.items, 'Náklady (€)'),
    legend: { show: false },
    plotOptions: { bar: { distributed: true } },
  };
  const calculationOptions = {
    ...colGraph(props.result.headers, 'Náklady (€)'),
    legend: { show: false },
    plotOptions: { bar: { distributed: true } },
  };

  const pieChart = {
    series: props.result.rowSums,
    options: {
      chart: {
        type: 'pie',
      },
      legend: {
        show: true,
        position: 'bottom',
      },
      fill: {
        type: 'gradient',
      },
      labels: props.result.items,
    },
  };

  const donutChart = {
    series: props.result.colSums,
    options: {
      chart: {
        type: 'donut',
      },
      legend: {
        show: true,
        position: 'bottom',
      },
      fill: {
        type: 'gradient',
      },
      labels: props.result.headers,
    },
  };

  return (
    <div style={{ padding: 30 }}>
      <h1 className={'result-h1'}>Analýza ukazovateľov</h1>

      <div className={'table-card'} style={{ marginTop: 50 }}>
        <TableStatic
          header={[...props.result.items, 'SPOLU']}
          inputs={['Nj - náklady jednotkové (€)', 'Štruktúra Š (%)']}
          data={[
            [
              ...props.result.rowSums.map((value: number) => value.toString()),
              props.result.totalCost.toString(),
            ],
            [
              ...props.result.rowSums.map((value: number) => {
                if (props.result.totalCost === 0) return '100';
                return (
                  Math.round((value / props.result.totalCost) * 10000) / 100
                ).toString();
              }),
              '100',
            ],
          ]}
        />

        <TableStatic
          header={[...props.result.headers, 'SPOLU']}
          inputs={['Nj - náklady jednotkové (€)', 'Štruktúra Š (%)']}
          data={[
            [
              ...props.result.colSums.map((value: number) => value.toString()),
              props.result.totalCost.toString(),
            ],
            [
              ...props.result.colSums.map((value: number) => {
                if (props.result.totalCost === 0) return '100';
                return (
                  Math.round((value / props.result.totalCost) * 10000) / 100
                ).toString();
              }),
              '100',
            ],
          ]}
        />
      </div>

      <h1 className={'result-h1 new-page'}>Dashboarding</h1>

      <div className={'row'}>
        <div className={'col-6'}>
          <div
            className={'graph-card'}
            style={{
              marginRight: 20,
            }}
          >
            <h4 className={'graph-title'}>ŠTRUKTÚRA NÁKLADOVÝCH DRUHOV</h4>
            {
              <ReactApexChart
                // @ts-ignore
                options={pieChart.options}
                series={props.result.rowSums}
                type="pie"
                height={347}
              />
            }
          </div>
        </div>

        <div className={'col-6'}>
          <div
            className={'graph-card'}
            style={{
              marginLeft: 20,
            }}
          >
            <h4 className={'graph-title'}>DRUHOVÉ ČLENENIE NÁKLADOV</h4>
            {
              <ReactApexChart
                options={genericOptions}
                series={genericSeries}
                type="bar"
                height={300}
              />
            }
          </div>
        </div>
      </div>

      <div className={'row'}>
        <div className={'col-6'}>
          <div
            className={'graph-card'}
            style={{
              marginRight: 20,
            }}
          >
            <h4 className={'graph-title'}>ŠTRUKTÚRA KALKULAČNÝCH POLOŽIEK</h4>
            {
              <ReactApexChart
                // @ts-ignore
                options={donutChart.options}
                series={props.result.colSums}
                type="donut"
                height={347}
              />
            }
          </div>
        </div>

        <div className={'col-6'}>
          <div
            className={'graph-card'}
            style={{
              marginLeft: 20,
            }}
          >
            <h4 className={'graph-title'}>KALKULAČNÉ ČLENENIE NÁKLADOV</h4>
            {
              <ReactApexChart
                options={calculationOptions}
                series={calculationSeries}
                type="bar"
                height={300}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
