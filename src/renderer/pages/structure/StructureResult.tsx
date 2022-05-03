import ReactApexChart from 'react-apexcharts';
import TableStatic from '../../components/TableStatic';
import { useColGraph } from '../../components/graphOptions';
import { ApexOptions } from 'apexcharts';

export default function StructureResult(props: any) {
  const genericSeries = [
    {
      name: "Druhové",
      data: props.result.rowSums,
    },
  ];

  const calculationSeries = [
    {
      name: "Kalkulačné",
      data: props.result.colSums,
    },
  ];

  const genericOptions = {
    ...useColGraph(props.result.items, 'Náklady (€)'),
    legend: { show: false },
    plotOptions: { bar: { distributed: true } },
  };
  const calculationOptions = {
    ...useColGraph(props.result.headers, 'Náklady (€)'),
    legend: { show: false },
    plotOptions: { bar: { distributed: true } },
  };

  const pieChart: ApexOptions = {
    chart: {
      type: 'pie',
    },
    colors: [
      '#2E93fA',
      '#59edbb',
      '#FF9800',
      '#E91E63',
      '#66DA26',
      '#a796e0',
      '#fff923',
      '#eda859',
      '#546E7A',
    ],
    legend: {
      show: true,
      position: 'bottom',
    },
    fill: {
      type: 'gradient',
    },
    labels: props.result.items,
  };
  const donutChart: ApexOptions = {
    chart: {
      type: 'donut',
    },
    colors: [
      '#2E93fA',
      '#59edbb',
      '#FF9800',
      '#E91E63',
      '#66DA26',
      '#a796e0',
      '#fff923',
      '#eda859',
      '#546E7A',
    ],
    legend: {
      show: true,
      position: 'bottom',
    },
    fill: {
      type: 'gradient',
    },
    labels: props.result.headers,
  };


  return (
    <div className={'new-page-after new-page'}>
      <h1 className={'result-h1'}>Analýza ukazovateľov</h1>

      <div className={'table-card'} style={{ marginTop: 50 }}>
        <TableStatic
          corner={"Nákladové druhy"}
          header={[...props.result.items, 'SPOLU']}
          inputs={[
            ['(Nj) - náklady jednotkové (€)', ''],
            ['(Š) - štruktúra (%)', ''],
          ]}
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
          corner={"Kalkulačné položky"}
          header={[...props.result.headers, 'SPOLU']}
          inputs={[
            ['(Nj) - náklady jednotkové (€)', ''],
            ['(Š) - štruktúra (%)', ''],
          ]}
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
        <div className={'col-t graph-card'}>
          <h4 className={'graph-title'}>ŠTRUKTÚRA NÁKLADOVÝCH DRUHOV</h4>
          {
            <ReactApexChart
              options={pieChart}
              series={props.result.colSums}
              type="pie"
              height={457}
            />
          }
        </div>
        <div className={'col-t graph-card'}>
          <h4 className={'graph-title'}>DRUHOVÉ ČLENENIE NÁKLADOV</h4>
          {
            <ReactApexChart
              options={genericOptions}
              series={genericSeries}
              type="bar"
              height={400}
            />
          }
        </div>
      </div>

      <div className={'row new-page'}>
        <div className={'col-t  graph-card'}>
          <h4 className={'graph-title'}>ŠTRUKTÚRA KALKULAČNÝCH POLOŽIEK</h4>
          {
            <ReactApexChart
              options={donutChart}
              series={props.result.rowSums}
              type="donut"
              height={457}
            />
          }
        </div>

        <div className={'col-t graph-card '}>
          <h4 className={'graph-title'}>KALKULAČNÉ ČLENENIE NÁKLADOV</h4>
          {
            <ReactApexChart
              options={calculationOptions}
              series={calculationSeries}
              type="bar"
              height={400}
            />
          }
        </div>
      </div>
    </div>
  );
}
