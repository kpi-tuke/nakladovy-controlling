import TableStatic from '../TableStatic';
import ReactApexChart from 'react-apexcharts';

export default function Result5(props: any) {
  let series = [];
  for (let index = 0; index < props.result.headers.length; index++) {
    series.push({
      name: props.result.headers[index].toString(),
      data: [props.result.rentIncome[index], props.result.rentCost[index]],
    });
  }

  let series2: any[] = [];
  for (let index = 0; index < props.result.headers.length; index++) {
    series2.push({
      name: props.result.headers[index].toString(),
      data: [props.result.marginGross[index]],
    });
  }

  let series3: any[] = []
  for (let index = 0; index < props.result.headers.length; index++) {
    series3.push({
      name: props.result.headers[index].toString(),
      data: [props.result.allowance[index]],
    });
  }

  const colGraph = {
    series: series,
    options: {
      chart: {
        type: 'bar',
        height: 350,
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
          colors: ["black"]
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Rentabilita tržieb', 'Rentabilita nákladov'],
      },
      yaxis: [{
        title: {
          text: 'rentabilita (%)',
        },

      }],
      fill: {
        opacity: 1,
      },
    },
  };

  const colGraph2 = {
    series: series2,
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '75%',
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
          colors: ["black"]
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [""],
      },
      yaxis: [{
        title: {
          text: 'ekonomický ukazovateľ (€)',
        },

      }],
      fill: {
        opacity: 1,
      },
    },
  };

  const colGraph3 = {
    series: series3,
    options: {
      chart: {
        type: 'bar',
        height: 350,
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
          colors: ["black"]
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [''],
      },
      yaxis: [{
        title: {
          text: 'ekonomický ukazovateľ (€)',
        },
      }],
      fill: {
        opacity: 1,
      },
    },
  };

  return (
    <div>

      <h1 className={"result-h1"}>Ukazovatele sortimentnej analýzy</h1>

      <div
        className={"table-card"}
      >
        <TableStatic
          corner={"Ukazovatele sortimentnej analýzy"}
          header={[...props.result.headers]}
          inputs={[
            'Rentabilita tržieb (%)',
            'Rentabilita nákladov (%)',
            'Hrubé rozpätie (€)',
            'Príspevok na úhradu (€)',
            'Zisková prirážka (€)',
            'Zisk pri pôvodnej výrobnej štruktúre (€)'
          ]}
          data={[
            [
              ...props.result.rentIncome
            ],
            [
              ...props.result.rentCost
            ],
            [
              ...props.result.marginGross
            ],
            [
              ...props.result.allowance
            ],
            [
              ...props.result.marginProfit
            ],
            [
              ...props.result.profit
            ],
          ]}
        />
      </div>

      <h1 className={"result-h1"}>Dashboarding</h1>

      <div
        className={"graph-card"}
      >
        <h4 className={"graph-title"}>UKAZOVATELE SORTIMENTNEJ ANALÝZY</h4>
        {
          // @ts-ignore
          <ReactApexChart options={colGraph.options}
                          series={colGraph.series}
                          type="bar"
                          height={400}
          />
        }
      </div>

      <div className={"row"}>
        <div className={"col-6"}>
          <div
            className={"graph-card"}
            style={{marginRight: 25}}
          >
            <h4 className={"graph-title"}>HRUBÉ ROZPÄTIE</h4>
            {
              // @ts-ignore
              <ReactApexChart options={colGraph2.options}
                              series={colGraph2.series}
                              type="bar"
                              height={400}
              />
            }
          </div>
        </div>

        <div className={"col-6"}>
          <div
            className={"graph-card"}
            style={{marginLeft: 25}}
          >
            <h4 className={"graph-title"}>PRÍSPEVOK NA ÚHRADU</h4>
            {
              // @ts-ignore
              <ReactApexChart options={colGraph3.options}
                              series={colGraph3.series}
                              type="bar"
                              height={400}
              />
            }
          </div>
        </div>
      </div>

      {/*<div>*/}
      {/*  <div>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        backgroundColor: 'white',*/}
      {/*        padding: 25,*/}
      {/*        marginTop: 30,*/}
      {/*        boxShadow: '0px 0px 10px lightgray',*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      {*/}
      {/*        // @ts-ignore*/}
      {/*        <ReactApexChart options={colGraph4.options}*/}
      {/*                        series={colGraph4.series}*/}
      {/*                        type="bar"*/}
      {/*                        height={400}*/}
      {/*        />*/}
      {/*      }*/}
      {/*    </div>*/}
      {/*  </div>*/}

      {/*  <div>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        backgroundColor: 'white',*/}
      {/*        padding: 25,*/}
      {/*        marginTop: 30,*/}
      {/*        boxShadow: '0px 0px 10px lightgray',*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      {*/}
      {/*        // @ts-ignore*/}
      {/*        <ReactApexChart options={colGraph5.options}*/}
      {/*                        series={colGraph5.series}*/}
      {/*                        type="bar"*/}
      {/*                        height={400}*/}
      {/*        />*/}
      {/*      }*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}
