import '../../App.css';
import ReactApexChart from "react-apexcharts";

//import ReactApexChart from "react-apexcharts";


export default function Result6(props: any) {
  console.log(props)

  const barChart = {

    series: [{
      name: 'Website Blog',
      type: 'column',
      data: props.result.values
    }, {
      name: 'Social Media',
      type: 'line',
      data: props.result.kumul
    }],
    options: {
      chart: {
        type: 'line',
      },
      stroke: {
        curve: 'straight',
        width: [0, 4],
        show: true,
      },
      title: {
        text: 'Traffic Sources'
      },
      dataLabels: {
        enabled: true,
        // enabledOnSeries: [0]
      },
      labels: props.result.causes,
      xaxis: {
        type: 'text'
      },
      yaxis: [{
        // min: 0,
        // max: props.result.sum,
        title: {
          text: 'Hodnota',
        },

      }, {
        opposite: true,
        // min: 0,
        // max: 100,
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
