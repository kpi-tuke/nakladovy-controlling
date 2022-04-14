import ReactApexChart from 'react-apexcharts';
import TableStatic from '../TableStatic';

export default function ParetoResult(props: any) {
  const barChart = {
    series: [
      {
        name: 'Pareto analyza',
        type: 'column',
        data: props.result.values,
      },
      {
        name: 'Lorenzova krivka',
        type: 'line',
        data: props.result.percentagesKumul,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        redrawOnParentResize: true,
        redrawOnWindowResize: true,
      },
      stroke: {
        curve: 'straight',
        width: [0, 4],
        show: true,
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
        style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: ['black'],
        },
      },
      annotations: {
        yaxis: [
          {
            y: 80,
            yAxisIndex: 1,
            borderColor: 'orange',
            strokeDashArray: 0,
          },
        ]
      },
      labels: props.result.causes.map((cause: string) => cause.split(" ")),
      yaxis: [
        {
          min: 0,
          max: props.result.sum,
          title: {
            text: 'Náklady (€)',
          },
        },
        {
          opposite: true,
          min: 0,
          max: 100,
          title: {
            text: 'Štruktúra nákladov (%)',
          },
        },
      ],
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
  };

  return (
    <div className={"new-page"}>
      <h1 className={'result-h1'}>Analýza ukazovateľov</h1>

      <div className={'table-card'}>
        <TableStatic
          corner={'Príčiny vzniku nákladov'}
          header={[
            'Náklady (€)',
            'Kumulované náklady (€)',
            'Štruktúra nákladov (%)',
            'Kumulovaná štruktúra nákladov (%)',
          ]}
          inputs={[...props.result.causes]}
          data={props.result.values.map((value: string, idx: number) => {
            return [
              value,
              props.result.valuesKumul[idx],
              props.result.percentages[idx],
              props.result.percentagesKumul[idx],
            ];
          })}
        />
      </div>
      <h1 className={'result-h1 new-page'}>Dashboarding</h1>

      <div className={'graph-card'}>
        <h4 className={'graph-title'}>PARETO ANALÝZA A LORENZOVA KRIVKA</h4>
        {

          <ReactApexChart
            // @ts-ignore
            options={barChart.options}
            series={barChart.series}
            type="bar"
            height={600}
          />
        }
      </div>
    </div>
  );
}
