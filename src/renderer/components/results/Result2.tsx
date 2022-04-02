import ReactApexChart from 'react-apexcharts';
import InfoCard from '../InfoCard';
import TableStatic from '../TableStatic';

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
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: ['black'],
        },
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: props.result.items,
        labels: {
          trim: true,
        },
      },
      yaxis: [
        {
          title: {
            text: 'Náklady (€)',
          },
        },
      ],
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
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: ['black'],
        },
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
      yaxis: [
        {
          title: {
            text: 'Náklady (€)',
          },
        },
      ],
    },
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

      <InfoCard
        header={'CELKOVÉ NÁKLADY'}
        value={props.result.totalCost.toString() + '€'}
      />

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

      <h1 className={'result-h1'}>Dashboarding</h1>

      <div className={'row'}>
        <div className={'col-6'}>
          <div
            className={'graph-card'}
            style={{
              marginRight: 25,
            }}
          >
            <h4 className={'graph-title'}>ŠTRUKTÚRA NÁKLADOVÝCH DRUHOV</h4>
            {
              <ReactApexChart
                // @ts-ignore
                options={pieChart.options}
                series={pieChart.series}
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
              marginRight: 25,
            }}
          >
            <h4 className={'graph-title'}>DRUHOVÉ ČLENENIE NÁKLADOV</h4>
            {
              <ReactApexChart
                // @ts-ignore
                options={barChartRow.options}
                series={barChartRow.series}
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
              marginRight: 25,
            }}
          >
            <h4 className={'graph-title'}>ŠTRUKTÚRA KALKULAČNÝCH POLOŽIEK</h4>
            {
              <ReactApexChart
                // @ts-ignore
                options={donutChart.options}
                series={donutChart.series}
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
              marginRight: 25,
            }}
          >
            <h4 className={'graph-title'}>KALKULAČNÉ ČLENENIE NÁKLADOV</h4>
            {
              <ReactApexChart
                // @ts-ignore
                options={barChartCol.options}
                series={barChartCol.series}
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
