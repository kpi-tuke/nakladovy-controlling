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
        name: 'Tržby',
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
      yaxis: [{
        title: {
          text: '€',
        },

      }],
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

  const incomeRentGraph = {
    series: [
      {
        name: 'Rentabilita výnosov',
        data: props.result.incomeProfitabilityData,
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
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: props.result.headers,
      },
      fill: {
        opacity: 1,
      },
    },
  };

  const costIndicGraph = {
    series: [
      {
        name: 'Nákladovosť',
        data: props.result.costIndicatorData,
      },
    ],
    options: {
      chart: {
        type: 'bar',
      },
      colors: ['#ff4560'],
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
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: props.result.headers,
      },
      fill: {
        opacity: 1,
      },
    },
  };

  const costEffiGraph = {
    series: [
      {
        name: 'Nákladová účinnosť',
        data: props.result.costEfficiencyData,
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
      colors: ['#feb019'],
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: props.result.headers,
      },
      fill: {
        opacity: 1,
      },
    },
  };

  const costRentGraph = {
    series: [
      {
        name: 'Rentabilita nákladov',
        data: props.result.costProfitabilityData,
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
      colors: ['#00e396'],
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
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

      <h1 className={"result-h1"}>Analýza ukazovateľov</h1>

      <div className={'row'}>
        <div className={'col-4'}>
          <InfoCard
            header={'VÝNOSY CELKOM'}
            value={props.result.incomeTotal.toString() + "€"}
          />
        </div>

        <div className={'col-4'}>
          <InfoCard
            header={'NÁKLADY CELKOM'}
            value={props.result.costTotal.toString() + "€"}
          />
        </div>

        <div className={'col-4'}>
          <InfoCard
            header={'ZISK CELKOM'}
            value={props.result.profitTotal.toString() + "€"}
          />
        </div>
      </div>

      <div
        className={"table-card"}
        style={{marginTop:50}}
      >
        <TableStatic
          corner={"Ekonomické ukazovatele"}
          header={[...props.result.headers]}
          inputs={[
            'Zisk',
            'Rentabilita výnosov',
            'Rentabilita nákladov',
            'Nákladová účinnosť',
            'Nákladovosť',
          ]}
          data={[
            [...(props.result.profitData.map((value: number) => (value.toString() + "€")))],
            [...props.result.incomeProfitabilityData],
            [...props.result.costProfitabilityData],
            [...props.result.costEfficiencyData],
            [...props.result.costIndicatorData],
          ]}
        />
      </div>

      <h1 className={"result-h1"}>Dashboarding</h1>

      <div
        className={"graph-card"}
      >
        <h4 className={"graph-title"}>TRENDY VÝVOJA EKONOMICKÝCH VELIČÍN</h4>
        {
          // @ts-ignore
          <ReactApexChart options={lineGraph.options}
            series={lineGraph.series}
            type="line"
            height={400}
          />
        }
      </div>

      <div
        className={"graph-card"}
      >
        <h4 className={"graph-title"}>EKONOMICÉ UKAZOVATELE V SLEDOVANOM OBDOBÍ</h4>
        {
          // @ts-ignore
          <ReactApexChart options={colGraph.options}
                          series={colGraph.series}
                          type="bar"
                          height={400}
          />
        }
      </div>

      <div className={"row"} >
        <div className={"col-6"}>
          <div
            className={"graph-card"}
            style={{marginRight:25}}
          >
            <h4 className={"graph-title"}>VÝVOJ RENTABILITY VÝNOSOV</h4>
            {
              // @ts-ignore
              <ReactApexChart options={incomeRentGraph.options}
                series={incomeRentGraph.series}
                type="bar"
                height={400}
              />
            }
          </div>
        </div>

        <div className={"col-6"}>
          <div
            className={"graph-card"}
            style={{marginLeft:25}}
          >
            <h4 className={"graph-title"}>VÝVOJ RENTABILITY NÁKLADOV</h4>
            {
              // @ts-ignore
              <ReactApexChart options={costRentGraph.options}
                              series={costRentGraph.series}
                              type="bar"
                              height={400}
              />
            }
          </div>
        </div>
      </div>

      <div className={"row"}>
        <div className={"col-6"}>
          <div
            className={"graph-card"}
            style={{marginRight:25}}
          >
            <h4 className={"graph-title"}>VÝVOJ NÁKLADOVEJ ÚČINNOSTI</h4>
            {
              // @ts-ignore
              <ReactApexChart options={costEffiGraph.options}
                              series={costEffiGraph.series}
                              type="bar"
                              height={400}
              />
            }
          </div>
        </div>

        <div className={"col-6"}>
          <div
            className={"graph-card"}
            style={{marginLeft:25}}
          >
            <h4 className={"graph-title"}>VÝVOJ NÁKLADOVOSTI</h4>
            {
              // @ts-ignore
              <ReactApexChart options={costIndicGraph.options}
                series={costIndicGraph.series}
                type="bar"
                height={400}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
