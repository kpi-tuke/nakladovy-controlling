import '../../ScreenStyle.css';
import ReactApexChart from 'react-apexcharts';
import TableStatic from '../TableStatic';
import InfoCard from '../InfoCard';

export default function Result1(props: any) {
  const lineGraph = {
    series: [
      {
        name: 'Náklady',
        data: props.result.costData,
      },
      {
        name: 'Výnosy',
        data: props.result.incomeData,
      },
      {
        name: 'Zisk',
        data: props.result.profitData,
      },
    ],
    options: {
      chart: {
        type: 'line',
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'straight',
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
      xaxis: {
        categories: props.result.headers,
      },
      yaxis: [
        {
          title: {
            text: 'ekonomická veličina (€)',
          },
        },
      ],
      legend: {
        horizontalAlign: 'center',
        verticalAlign: 'center',
      },
    },
  };

  const colGraph = {
    series: [
      {
        name: 'Rentabilita výnosov',
        data: props.result.incomeProfitabilityData,
      },
      {
        name: 'Rentabilita nákladov',
        data: props.result.costProfitabilityData,
      },
      {
        name: 'Nákladová účinnosť',
        data: props.result.costEfficiencyData,
      },
      {
        name: 'Nákladovosť',
        data: props.result.costIndicatorData,
      },
    ],
    options: {
      chart: {
        type: 'bar',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
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
      stroke: {
        show: true,
        width: 2,
        colors: ['#f3f3f3', 'transparent'],
      },
      xaxis: {
        categories: props.result.headers,
      },
      fill: {
        opacity: 1,
      },
    },
  };

  return (
    <div>
      <h1 className={'result-h1'}>Analýza ekonomických ukazovateľov</h1>

      <div className={'row'}>
        <div className={'col-4'}>
          <InfoCard
            header={'VÝNOSY CELKOM'}
            value={props.result.incomeTotal.toString() + '€'}
          />
        </div>

        <div className={'col-4'}>
          <InfoCard
            header={'NÁKLADY CELKOM'}
            value={props.result.costTotal.toString() + '€'}
          />
        </div>

        <div className={'col-4'}>
          <InfoCard
            header={'ZISK CELKOM'}
            value={props.result.profitTotal.toString() + '€'}
          />
        </div>
      </div>

      <div className={'table-card'} style={{marginTop: 50}}>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={[...props.result.headers]}
          inputs={[
            'Zisk (€)',
            'Rentabilita výnosov (%)',
            'Rentabilita nákladov (%)',
            'Nákladová účinnosť (%)',
            'Nákladovosť (%)',
          ]}
          data={[
            [...props.result.profitData],
            [...props.result.incomeProfitabilityData],
            [...props.result.costProfitabilityData],
            [...props.result.costEfficiencyData],
            [...props.result.costIndicatorData],
          ]}
        />
      </div>

      <h1 className={'result-h1'}>Dashboarding</h1>

      <div className={'graph-card'}>
        <h4 className={'graph-title'}>TREND VÝVOJA EKONOMICKÝCH VELIČÍN</h4>
        {

          <ReactApexChart
            // @ts-ignore
            options={lineGraph.options}
            series={lineGraph.series}
            type="line"
            height={300}
          />
        }
      </div>

      <div className={'graph-card'}>
        <h4 className={'graph-title'}>
          EKONOMICKÉ UKAZOVATELE V SLEDOVANOM OBDOBÍ
        </h4>
        {

          <ReactApexChart
            // @ts-ignore
            options={colGraph.options}
            series={colGraph.series}
            type="bar"
            height={300}
          />
        }
      </div>
    </div>
  );
}
