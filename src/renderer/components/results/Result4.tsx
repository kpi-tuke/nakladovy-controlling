import '../../App.css';
import {Link} from "react-router-dom";
import TableStatic from "../TableStatic";
import ReactApexChart from "react-apexcharts";

export default function Result4(props: any) {
  console.log(props.result.items)
  // @ts-ignore
  return (
    <div style={{paddingLeft: 10, paddingRight: 10}}>
      <TableStatic header={...props.result.items}
                   inputs={["Nulový bod[€]", "Nulový bod[tony]", "Zisk " + props.result.minProfit.toString() + " pri objeme"]}
                   data={[
                     [...(props.result.zeroEur.map((value: number) => (Math.round(value * 100) / 100)))],
                     [...(props.result.zeroTon.map((value: number) => (Math.round(value * 100) / 100)))],
                     [...(props.result.zeroProf.map((value: number) => (Math.round(value * 100) / 100)))],
                   ]}
      />
      <div className={"row"}>
        {
          props.result.items.map((value: any, idx: number) => {
            const costTotal: number[] = []
            const incomeTotal: number[] = []
            //prepočitat rozsah grafu
            //const vol: number = (zeroTon[idx] + 2 * (zeroTon[idx] / 3)) / 5
            const vol: number = (props.result.volumes[idx] + 2 * (props.result.volumes[idx] / 3)) / 5
            const osX: number[] = []
            //pridat viac bodov na osXS
            for (let i = 0; i < 7; i++) {
              osX.push(Math.round(i * vol * 100) / 100)
            }
            for (let i = 0; i < 7; i++) {
              costTotal.push(Math.round((props.result.fixTotal + ((i * vol) * props.result.costs[idx])) * 100) / 100)
              incomeTotal.push(Math.round(((i * vol) * props.result.prices[idx]) * 100) / 100)
            }

            const lineGraph = {
              series: [
                {
                  name: "Náklady",
                  data: costTotal
                },
                {
                  name: "Výnosy",
                  data: incomeTotal
                }
              ],
              options: {
                chart: {
                  type: 'line',
                  zoom: {
                    enabled: false
                  }
                },

                stroke: {
                  curve: 'straight'
                },
                title: {
                  text: value,
                  align: 'center'
                },
                grid: {
                  borderColor: '#e7e7e7',
                  row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                  },
                },
                xaxis: {
                  categories: osX,
                  type: 'numeric'
                },
                annotations: {
                  points:
                    [
                      {
                        x: props.result.zeroTon[idx],
                        y: props.result.zeroEur[idx],
                        marker: {
                          size: 8,
                        },
                        label: {
                          borderColor: '#FF4560',
                          text: "Nulový bod"
                        }
                      }
                    ],
                  xaxis: [
                    {
                      x: props.result.zeroProf[idx],
                      borderColor: '#775DD0',
                      label: {
                        style: {
                          color: '#fa023f',
                        },
                        orientation: 'horizontal',
                        text: 'Minimálny zisk'
                      }
                    }
                  ]
                },
                legend: {
                  horizontalAlign: 'right',
                }
              },
            };

            return (
              <div
                key={idx}
                className={(props.result.items.length % 2 === 1 && idx === props.result.items.length - 1) ? "col-lg-12 col-md-12" : "col-lg-6 col-md-12"}>
                <div className={"card mb-3"}>
                  <div className={"card-body"}>
                    {
                      // @ts-ignore
                      <ReactApexChart options={lineGraph.options} series={lineGraph.series} type="line" height={500}/>
                    }
                  </div>
                </div>
              </div>
            )
          })

        }

      </div>
      <button><Link to={"/taskselect"}>Back</Link></button>
    </div>
  )
}
