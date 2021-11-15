import '../../App.css';
import {Link} from "react-router-dom";
import TableStatic from "../TableStatic";
import ReactApexChart from "react-apexcharts";
//import ReactApexChart from "react-apexcharts";

export default function Result5(props: any) {

  let series = []
  for (let index = 0; index < props.result.header.length; index++) {
    // @ts-ignore
    series.push(
      {
        name: props.result.header[index].toString(),
        data: [props.result.rentIncome[index],
          props.result.rentCost[index],
          props.result.marginProfit[index],
          props.result.marginGross[index],
          props.result.allowance[index],
          props.result.profit[index]
        ]
      }
    )
  }

  // @ts-ignore
  console.log(series)

  const colGraph = {
    series: series,
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      title: {
        text: 'Ekonomické ukazovatele',
        align: 'center'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ["Rentabilita tržieb", "Rentabilita nákladov", "Zisková prirážka", " Hrubé rozpätie", "Príspevok na úhradu", "Zisk"],
      },
      fill: {
        opacity: 1
      },
    },
  }
  return (
    <div style={{paddingLeft: 10, paddingRight: 10}}>
      <TableStatic header={[...props.result.header]}
                   inputs={["Rentabilita tržieb", "Rentabilita nákladov", "Zisková prirážka", " Hrubé rozpätie", "Príspevok na úhradu", "Zisk"]}
                   data={[
                     [...props.result.rentCost.map((value: number) => (Math.round(value * 100) + "%"))],
                     [...props.result.rentIncome.map((value: number) => (Math.round(value * 100) + "%"))],
                     [...props.result.marginProfit.map((value: number) => (Math.round(value * 100) / 100))],
                     [...props.result.marginGross.map((value: number) => (Math.round(value * 100) / 100))],
                     [...props.result.allowance.map((value: number) => (Math.round(value * 100) / 100))],
                     [...props.result.profit.map((value: number) => (Math.round(value * 100) / 100))]
                   ]}
      />

      <div>
        <div className={"card mb-3"}>
          <div className={"card-body"}>
            {   // @ts-ignore
              <ReactApexChart options={colGraph.options} series={colGraph.series} type="bar" height={400}/>
            }
          </div>
        </div>
      </div>

      <button><Link to={"/taskselect"}>Back</Link></button>
    </div>
  )
}
