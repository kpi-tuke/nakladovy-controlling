import '../../App.css';
import {Link} from "react-router-dom";
import ReactApexChart from "react-apexcharts"
import TableStatic from "../TableStatic";


export default function Result1(props: any) {

  const makeArray = (numerator: number[], denominator: number[]): number[] => {
    let arr: number[] = []
    for (let i = 0; i < props.result.header.length; i++) {
      if (numerator[i] === 0 || denominator[i] === 0) arr.push(0)
      else arr.push(Math.round(100 * numerator[i] / denominator[i]) / 100)
    }
    return arr
  }

  let profitData: number[] = []
  for (let i = 0; i < props.result.header.length; i++) {
    profitData.push(props.result.incomeData[i] - props.result.costData[i])
  }

  let rentIncomeData: number[] = makeArray(profitData, props.result.incomeData);
  let rentCostData: number[] = makeArray(profitData, props.result.costData);
  let costEff: number[] = makeArray(props.result.incomeData, props.result.costData);
  let costIndicator: number[] = makeArray(props.result.costData, props.result.incomeData);

  let profitTotal: number[] = []
  for (let i = 0; i < props.result.header.length; i++) {
    profitTotal[i] = 0
    for (let j = 0; j <= i; j++) {
      profitTotal[i] += profitData[j]
    }
  }

  let costTotal: number[] = []
  for (let i = 0; i < props.result.header.length; i++) {
    costTotal[i] = 0
    for (let j = 0; j <= i; j++) {
      costTotal[i] += props.result.costData[j]
    }
  }

  let incomeTotal: number[] = []
  for (let i = 0; i < props.result.header.length; i++) {
    incomeTotal[i] = 0
    for (let j = 0; j <= i; j++) {
      incomeTotal[i] += props.result.incomeData[j]
    }
  }

  const lineGraph = {
    series: [
      {
        name: "Cost",
        data: props.result.costData
      },
      {
        name: "Income",
        data: props.result.incomeData
      },
      {
        name: "Profit",
        data: profitData
      }
    ],
    options: {
      chart: {
        height: 350,
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
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: props.result.header,
        title: {
          text: 'Year'
        }
      },
      yaxis: {
        title: {
          text: '€'
        },
      },
      legend: {
        horizontalAlign: 'right',
      }
    },
  };

  const totalGraph = {
    series: [
      {
        name: "Total Cost",
        data: costTotal
      },
      {
        name: "Total Income",
        data: incomeTotal
      },
      {
        name: "Total Profit",
        data: profitTotal
      }
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
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
        curve: 'straight'
      },

      title: {
        text: 'Celkové náklady, výnosy, zisky',
        align: 'center'
      },
      xaxis: {
        categories: props.result.header,
        title: {
          text: 'Year'
        }
      },
      yaxis: {
        title: {
          text: '€'
        }
      },
      legend: {
        horizontalAlign: 'right'
      }
    }
  };

  const colGraph = {

    series: [{
      name: 'Rentabilita výnosov',
      data: rentIncomeData
    }, {
      name: 'Rentabilita nákladov',
      data: rentCostData
    }, {
      name: 'Nákladová účinnosť',
      data: costEff
    }, {
      name: 'Nákladovosť',
      data: costIndicator
    }],
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
          <div className={"col"}>
            <div className={"card card-outline-primary mb-3"}>
              <div className={"card-body"}>
                <div className={"number-left"}>
                  <h6 className={"bold"}>VÝNOSY CELKOM</h6>
                  <h3 className={"card-title bold text-success"}>{props.result.income}</h3>
                </div>
                <div className={"icon-right"}>
                  <i className={"fa fa-line-chart"}/>
                </div>
              </div>
            </div>
          </div>

          <div className={"col"}>
            <div className={"card card-outline-primary mb-3"}>
              <div className={"card-body"}>
                <div className={"number-left"}>
                  <h6 className={"bold"}>NÁKLADY CELKOM</h6>
                  <h3 className={"card-title bold text-primary"}>{props.result.cost}</h3>
                </div>
                <div className={"icon-right"}>
                  <i className={"fa fa-shopping-cart"}/>
                </div>
              </div>
            </div>
          </div>

          <div className={"col"}>
            <div className={"card card-outline-primary mb-3"}>
              <div className={"card-body"}>
                <div className={"number-left"}>
                  <h6 className={"bold"}>ZISK CELKOM</h6>
                  <h3 className={"card-title bold text-warning"}>{props.result.income - props.result.cost}</h3>
                </div>
                <div className={"icon-right"}>
                  <i className={"fa fa-money"}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className={"card"}>

        <h1 className={"bold text-primary"} style={{textAlign: "center", margin: 20}}>Ukazovatele</h1>


        <div className={"row"}>

          <div className={"col-7"}>
            <TableStatic header={[...props.result.header, "Celkovo"]}
                         inputs={["Zisk", "Rentabilita výnosov", "Rentabilita nákladov", "Nákladová účinnosť", "Nákladovosť"]}
                         data={[
                           [...profitData, props.result.income - props.result.cost],
                           [...rentIncomeData, Math.round((props.result.income - props.result.cost) * 100 / props.result.income) / 100],
                           [...rentCostData, Math.round((props.result.income - props.result.cost) * 100 / props.result.cost) / 100],
                           [...costEff, Math.round(props.result.income * 100 / props.result.cost) / 100],
                           [...costIndicator, Math.round(props.result.cost * 100 / props.result.income) / 100]
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
                        className={"card-title bold text-primary"}>{Math.round((props.result.income - props.result.cost) * 100 / props.result.income) / 100}</h3>
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
                        className={"card-title bold text-success"}>{Math.round((props.result.income - props.result.cost) * 100 / props.result.cost) / 100}</h3>
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
                        className={"card-title bold text-warning"}>{Math.round(props.result.income * 100 / props.result.cost) / 100}</h3>
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
                        className={"card-title bold text-danger"}>{Math.round(props.result.cost * 100 / props.result.income) / 100}</h3>
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

        <div className={"col-lg-6 col-sm-12"}>
          <div className={"card mb-3"}>
            <div className={"card-body"}>
              {
                // @ts-ignore
                <ReactApexChart options={lineGraph.options} series={lineGraph.series} type="line" height={400}/>
              }
            </div>
          </div>
        </div>


        <div className={"col-lg-6 col-sm-12"}>
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

      <button><Link to={"/taskselect"}>Back</Link></button>
    </div>
  );
}
