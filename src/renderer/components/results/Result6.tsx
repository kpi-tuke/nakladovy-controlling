import '../../App.css';
import ReactApexChart from "react-apexcharts";

export default function Result6(props: any) {

  const barChart = {

    series: [{
      name: 'Paretova analyza',
      type: 'column',
      data: props.result.values
    }, {
      name: 'Lorenzova krivka',
      type: 'line',
      data: props.result.kumul
    }],
    options: {
      chart: {
        type: 'bar',
      },
      stroke: {
        curve: 'straight',
        width: [0, 4],
        show: true,
      },
      title: {
        text: 'Pareto analýza'
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
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
              text: 'Minimálny zisk'
            }
          }
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
              text: 'Minimálny zisk'
            }
          }
        ]

      },
      labels: props.result.causes,
      xaxis: {
        type: "category",
        labels: {
          trim: true
        }
      },
      yaxis: [{
        min: 0,
        max: props.result.sum,
        title: {
          text: 'Hodnota',
        },

      }, {
        opposite: true,
        min: 0,
        max: 100,
        title: {
          text: 'Percento',
        }
      }]
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
    },
    markers: {
      size: 1
    },
  };

  return (
    <div style={{paddingLeft: 10, paddingRight: 10}}>

      <div className={"col-12"}>
        <div className={"card mb-3"}>
          <div className={"card-body"}>
            {   // @ts-ignore
              <ReactApexChart options={barChart.options} series={barChart.series} type="bar" height={600}/>
            }
          </div>
        </div>
      </div>

    </div>
  )
}
