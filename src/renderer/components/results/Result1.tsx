import '../../App.css';
import ReactApexChart from "react-apexcharts"
import TableStatic from "../TableStatic";
import InfoCard from "../InfoCard";


export default function Result1(props: any) {

  const profitTotal: number = props.result.incomeTotal - props.result.costTotal
  const costIndicator: number = Math.round(props.result.costTotal * 100 / props.result.incomeTotal) / 100
  const costEfficiency: number = Math.round(props.result.incomeTotal * 100 / props.result.costTotal) / 100
  const costProfitability: number = Math.round(profitTotal * 100 / props.result.costTotal) / 100
  const incomeProfitability: number = Math.round(profitTotal * 100 / props.result.incomeTotal) / 100

  const lineGraph = {
    series: [
      {
        name: "Náklady",
        data: props.result.costData
      },
      {
        name: "Tržby",
        data: props.result.incomeData
      },
      {
        name: "Zisk",
        data: props.result.profitData
      }
    ],
    options: {
      chart: {
        type: 'line',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Náklady, výnosy a zisky',
        align: 'center'
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
      xaxis: {
        categories: props.result.header,
      },
      legend: {
        horizontalAlign: 'right',
      }
    },
  };

  const totalGraph = {
    series: [
      {
        name: "Celkové náklady",
        data: props.result.costFlow
      },
      {
        name: "Celkové tržby",
        data: props.result.incomeFlow
      },
      {
        name: "Celkový zisk",
        data: props.result.profitFlow
      }
    ],
    options: {
      chart: {
        type: 'area',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'smooth'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      title: {
        text: 'Celkové náklady, výnosy, zisky',
        align: 'center'
      },
      xaxis: {
        categories: props.result.header,
      },
      legend: {
        horizontalAlign: 'right'
      }
    }
  };

  const colGraph = {

    series: [{
      name: 'Rentabilita výnosov',
      data: props.result.incomeProfitabilityData
    }, {
      name: 'Rentabilita nákladov',
      data: props.result.costProfitabilityData
    }, {
      name: 'Nákladová účinnosť',
      data: props.result.costEfficiencyData
    }, {
      name: 'Nákladovosť',
      data: props.result.costIndicatorData
    }],
    options: {
      chart: {
        type: 'bar',
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
        categories: props.result.header,
      },
      fill: {
        opacity: 1
      },
    },
  }

  return (
    <div style={{paddingLeft: 10, paddingRight: 10}}>

      <div className={"card-body"}>
        <h2>Ekonomická analýza ukazovateľov</h2>

        <div className={"row"}>

          {
            [
              ["VÝNOSY CELKOM", props.result.incomeTotal, "success", "fa fa-line-chart"],
              ["NÁKLADY CELKOM", props.result.costTotal, "primary", "fa fa-shopping-cart"],
              ["ZISK CELKOM", profitTotal, "warning", "fa fa-money"]
            ].map(value => (
                <div className={"col"}>
                  <InfoCard header={value[0]}
                            value={value[1]}
                            color={value[2]}
                            icon={value[3]}
                  />
                </div>
              )
            )
          }

        </div>
      </div>


      <div className={"card"}>

        <h1 className={"bold text-primary"} style={{textAlign: "center", margin: 20}}>Ukazovatele</h1>


        <div className={"row"}>

          <div className={"col-7"}>
            <TableStatic header={[...props.result.header, "Celkovo"]}
                         inputs={["Zisk", "Rentabilita výnosov", "Rentabilita nákladov", "Nákladová účinnosť", "Nákladovosť"]}
                         data={[
                           [...props.result.profitData, profitTotal],
                           [...props.result.incomeProfitabilityData, incomeProfitability],
                           [...props.result.costProfitabilityData, costProfitability],
                           [...props.result.costEfficiencyData, costEfficiency],
                           [...props.result.costIndicatorData, costIndicator]
                         ]}
            />
          </div>

          <div className={"col-5"}>

            <div className={"row"}>

              <div className={"col"}>
                <div className={"card card-outline-primary mb-3"}>
                  <div className={"card-body"}>
                    <div className={"number-left"}>
                      <h6 className={"bold"}>Rentabilita výnosov</h6>
                      <h3
                        className={"card-title bold text-primary"}>{incomeProfitability}</h3>
                    </div>
                    <div className={"icon-right"}>
                      <i className={"fa fa-pie-chart"}/>
                    </div>
                  </div>
                </div>
              </div>

              <div className={"col"}>
                <div className={"card card-outline-primary mb-3"}>
                  <div className={"card-body"}>
                    <div className={"number-left"}>
                      <h6 className={"bold"}>Rentabilita nákladov</h6>
                      <h3
                        className={"card-title bold text-success"}>{costProfitability}</h3>
                    </div>
                    <div className={"icon-right"}>
                      <i className={"fa fa-calculator"}/>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className={"row"}>

              <div className={"col"}>
                <div className={"card card-outline-primary mb-3"}>
                  <div className={"card-body"}>
                    <div className={"number-left"}>
                      <h6 className={"bold"}>Nákladová účinnosť</h6>
                      <h3
                        className={"card-title bold text-warning"}>{costEfficiency}</h3>
                    </div>
                    <div className={"icon-right"}>
                      <i className={"fa fa-dashboard"}/>
                    </div>
                  </div>
                </div>
              </div>

              <div className={"col"}>
                <div className={"card card-outline-primary mb-3"}>
                  <div className={"card-body"}>
                    <div className={"number-left"}>
                      <h6 className={"bold"}>Nákladovosť</h6>
                      <h3
                        className={"card-title bold text-danger"}>{costIndicator}</h3>
                    </div>
                    <div className={"icon-right"}>
                      <i className={"fa fa-area-chart"}/>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>


      <h1 className={"bold text-primary"} style={{textAlign: "center", margin: 50}}>Dashboarding</h1>

      <div className={"row"}>

        <div className={"col-lg-6 col-md-12"}>
          <div className={"card mb-3"}>
            <div className={"card-body"}>
              {
                // @ts-ignore
                <ReactApexChart options={lineGraph.options} series={lineGraph.series} type="line" height={400}/>
              }
            </div>
          </div>
        </div>


        <div className={"col-lg-6 col-md-12"}>
          <div className={"card mb-3"}>
            <div className={"card-body"}>
              {   // @ts-ignore
                <ReactApexChart options={totalGraph.options} series={totalGraph.series} type="area" height={400}/>
              }
            </div>
          </div>
        </div>

      </div>

      <div>
        <div className={"card mb-3"}>
          <div className={"card-body"}>
            {   // @ts-ignore
              <ReactApexChart options={colGraph.options} series={colGraph.series} type="bar" height={400}/>
            }
          </div>
        </div>
      </div>


    </div>
  );
}
