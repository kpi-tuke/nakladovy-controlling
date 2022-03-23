import ReactApexChart from 'react-apexcharts';
import InfoCard from '../InfoCard';

export default function Result2(props: any) {
  const barChartRow = {
    series: [
      {
        data: props.result.rowSums,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        type: 'bar',
      },
      legend: {
        show: false,
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        },
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      title: {
        text: 'Druhové členenie nákladov',
        align: 'center',
      },
      xaxis: {
        categories: props.result.items,
        labels: {
          trim: true,
        },
      },
    },
  };

  const barChartCol = {
    series: [
      {
        data: props.result.colSums,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        type: 'bar',
      },
      legend: {
        show: false,
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        },
      },
      xaxis: {
        categories: props.result.headers,
        labels: {
          trim: true,
        },
      },
      yaxis: {
        label: 'Náklady (€)',
      },
    },
  };

  const pieChart = {
    series: props.result.rowSums,
    options: {
      chart: {
        type: 'pie',
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
      fill: {
        type: 'gradient',
      },
      title: {
        text: 'Kalkulačné členenie nákladov',
      },
      labels: props.result.headers,
    },
  };

  return (
    <div style={{padding: 30}}>
      <h2>Štruktúrna analýza</h2>

      <div>
        <InfoCard
          header={'CELKOVÉ NÁKLADY'}
          value={props.result.totalCost}
          color={'success'}
          icon={'fa fa-money'}
        />
      </div>

      <h1 style={{textAlign: 'center', margin: 50}}>Dashboarding</h1>

      <div>
        <div>
          <div
            style={{
              backgroundColor: 'white',
              padding: 25,
              marginTop: 30,
              boxShadow: '0px 0px 10px lightgray',
            }}
          >
            <h4>DRUHOVÉ ČLENENIE NÁKLADOV</h4>
            {
              <ReactApexChart
                // @ts-ignore
                options={pieChart.options}
                series={pieChart.series}
                type="pie"
              />
            }
          </div>
        </div>

        <div>
          <div
            style={{
              backgroundColor: 'white',
              padding: 25,
              marginTop: 30,
              boxShadow: '0px 0px 10px lightgray',
            }}
          >
            <h4>DRUHOVÉ ČLENENIE NÁKLADOV</h4>
            {
              <ReactApexChart
                // @ts-ignore
                options={barChartRow.options}
                series={barChartRow.series}
                type="bar"
              />
            }
          </div>
        </div>
      </div>

      <div>
        <div>
          <div
            style={{
              backgroundColor: 'white',
              padding: 25,
              marginTop: 30,
              boxShadow: '0px 0px 10px lightgray',
            }}
          >
            <h4>KALKULAČNÉ ČLENENIE NÁKLADOV</h4>
            {
              <ReactApexChart
                // @ts-ignore
                options={donutChart.options}
                series={donutChart.series}
                type="donut"
              />
            }
          </div>
        </div>

        <div>
          <div
            style={{
              backgroundColor: 'white',
              padding: 25,
              marginTop: 30,
              boxShadow: '0px 0px 10px lightgray',
            }}
          >
            <h4>KALKULAČNÉ ČLENENIE NÁKLADOV</h4>
            {
              <ReactApexChart
                // @ts-ignore
                options={barChartCol.options}
                series={barChartCol.series}
                type="bar"
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
