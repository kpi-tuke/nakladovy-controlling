import '../../App.css';
import {Link} from "react-router-dom";
import ReactApexChart from "react-apexcharts"

export default function Result2(props: any) {

  const totalCost = props.result.rowSums.reduce((a: number, b: number) => a + b, 0)

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
      xaxis: {
        categories: props.result.inputs,
      }
    },
  };

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
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      xaxis: {
        categories: props.result.header,
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
        <div className={"card card-outline-primary mb-3 col-2"}>
          <div className={"card-body"}>
            <div className={"number-left"}>
              <h6 className={"bold"}>NÁKLADY SPOLU</h6>
              <h3 className={"card-title bold text-success"}>{totalCost}</h3>
            </div>
            <div className={"icon-right"}>
              <i className={"fa fa-money"}/>
            </div>
          </div>
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
