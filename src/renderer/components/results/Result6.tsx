import ReactApexChart from 'react-apexcharts';
import TableStatic from "../TableStatic";

export default function Result6(props: any) {
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
        data: props.result.kumul,
      },
    ],
    options: {
      chart: {
        type: 'bar',
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
          colors: ["black"]
        },
      },
      annotations: {
        yaxis: [
          {
            y: 80,
            yAxisIndex: 1,
            borderColor: '#775DD0',
            label: {
              style: {
                color: '#fa023f',
              },
              text: 'Minimálny zisk',
            },
          },
        ],
        xaxis: [
          {
            x: 100,
            xAxisIndex: 0,
            borderColor: '#775DD0',
            label: {
              style: {
                color: '#fa023f',
              },
              text: 'Minimálny zisk',
            },
          },
        ],
      },
      labels: props.result.causes,
      xaxis: {
        type: 'category',
        labels: {
          trim: true,
        },
      },
      yaxis: [
        {
          min: 0,
          max: props.result.sum,
          title: {
            text: 'Náklady v €',
          },
        },
        {
          opposite: true,
          min: 0,
          max: 100,
          title: {
            text: 'Štruktúra nákladov v %',
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
    <div>

      <h1 className={"result-h1"}>Analýza ukazovateľov</h1>

      <div className={"table-card"}>
        <TableStatic
          corner={"Príčina"}
          header={["Náklady[€]", "Náklady kumulované[€]", "Podiel[%]", "Podiel kumulovaný[%]"]}
          inputs={[...props.result.causes]}
          data={
            props.result.values.map((value: string, idx: number) => {
              return [value, props.result.valuesKumul[idx], props.result.percentages[idx], props.result.kumul[idx]]
            })
          }
        />
      </div>
      <h1 className={"result-h1"}>Dashboarding</h1>

      <div
       className={"graph-card"}
      >
        <h4 className={"graph-title"}>PARETO ANALÝZA A LORENZOVA KRIVKA</h4>
        {
          // @ts-ignore
          <ReactApexChart options={barChart.options}
                          series={barChart.series}
                          type="bar"
                          height={600}
          />
        }
      </div>
    </div>
  );
}
