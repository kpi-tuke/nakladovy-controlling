import '../../App.css';
import {Link} from "react-router-dom";
import ReactApexChart from "react-apexcharts"
import InfoCard from "../InfoCard";

export default function Result2(props: any) {

  const barChartRow = {
    series: [{
      data: props.result.rowSums
    }],
    options: {
      chart: {
        toolbar: {
          show: false
        },
        type: 'bar',
      },
      legend: {
        show: false
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      title: {
        text: 'Druhové členenie nákladov',
        align: 'center'
      },
      xaxis: {
        categories: props.result.inputs,
      }
    },
  }

  const barChartCol = {
    series: [{
      data: props.result.colSums
    }],
    options: {
      chart: {
        toolbar: {
          show: false
        },
        type: 'bar',
      },
      legend: {
        show: false
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      title: {
        text: 'Kalkulačné členenie nákladov',
        align: 'center'
      },
      xaxis: {
        categories: props.result.header,
      },
      yaxis: {
        label: "Náklady (€)"
      }
    }
  }

  const pieChart = {

    series: props.result.rowSums,
    options: {
      chart: {
        type: 'pie',
      },
      fill: {
        type: 'gradient',
      },
      title: {
        text: 'Druhové členenie nákladov'
      },
      labels: props.result.inputs,
    }
  }

  const donutChart = {

    series: props.result.colSums,
    options: {
      chart: {
        type: 'donut',
      },
      fill: {
        type: 'gradient',
      },
      title: {
        text: 'Kalkulačné členenie nákladov'
      },
      labels: props.result.header,
    }
  }

  return (
    <div style={{paddingLeft: 10, paddingRight: 10}}>

      <div className={"card-body"}>

        <h2>Štruktúrna analýza</h2>


        <div className={"col-2"}>
          <InfoCard header={"CELKOVÉ NÁKLADY"}
                    value={props.result.totalCost}
                    color={"success"}
                    icon={"fa fa-money"}
          />
        </div>
      </div>

      <h1 className={"bold text-primary"} style={{textAlign: "center", margin: 50}}>Dashboarding</h1>

      <div className={"row"}>

        <div className={"col-lg-6 col-sm-12"}>
          <div className={"card mb-3"}>
            <div className={"card-body"}>
              {
                // @ts-ignore
                <ReactApexChart options={pieChart.options} series={pieChart.series} type="pie" height={312}/>
              }
            </div>
          </div>
        </div>


        <div className={"col-lg-6 col-sm-12"}>
          <div className={"card mb-3"}>
            <div className={"card-body"}>
              {   // @ts-ignore
                <ReactApexChart options={barChartRow.options} series={barChartRow.series} type="bar" height={300}/>
              }
            </div>
          </div>
        </div>

      </div>

      <div className={"row"}>

        <div className={"col-lg-6 col-sm-12"}>
          <div className={"card mb-3"}>
            <div className={"card-body"}>
              {
                // @ts-ignore
                <ReactApexChart options={donutChart.options} series={donutChart.series} type="donut" height={312}/>
              }
            </div>
          </div>
        </div>


        <div className={"col-lg-6 col-sm-12"}>
          <div className={"card mb-3"}>
            <div className={"card-body"}>
              {   // @ts-ignore
                <ReactApexChart options={barChartCol.options} series={barChartCol.series} type="bar" height={300}/>
              }
            </div>
          </div>
        </div>

      </div>

      <button><Link to={"/taskselect"}>Back</Link></button>
    </div>
  );
}
