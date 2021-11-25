import '../../App.css';
import {Link} from "react-router-dom";
import TableStatic from "../TableStatic";
import ReactApexChart from "react-apexcharts";

export default function Result4(props: any) {

  const zeroEur: number[] = []
  const zeroTon: number[] = []
  const zeroProf: number[] = []
  const fixSum = props.result.fixTotal[0] + props.result.fixCost.reduce((a: number, b: number) => a + b, 0)

  for (let i = 0; i < props.result.inputs.length; i++) {
    zeroEur.push(0)
    zeroTon.push(0)
    zeroProf.push(0)
  }

  for (let i = 0; i < props.result.inputs.length; i++) {
    zeroEur[i] = fixSum / (1 - (props.result.costs[i] / props.result.prices[i]))
    zeroTon[i] = fixSum / (props.result.prices[i] - props.result.costs[i])
    zeroProf[i] = (parseInt(fixSum) + parseInt(props.result.minProfit)) / (props.result.prices[i] - props.result.costs[i]) // pridat min zisk
  }

  // @ts-ignore
  return (
    <div style={{paddingLeft: 10, paddingRight: 10}}>
      <TableStatic header={...props.result.inputs}
                   inputs={["Nulový bod[€]", "Nulový bod[tony]", "Zisk " + props.result.minProfit.toString() + " pri objeme"]}
                   data={[
                     [...(zeroEur.map(value => (Math.round(value * 100) / 100)))],
                     [...(zeroTon.map(value => (Math.round(value * 100) / 100)))],
                     [...(zeroProf.map(value => (Math.round(value * 100) / 100)))],
                   ]}
      />
      <div className={"row"}>
        {
          props.result.inputs.map((value: any, idx: number) => {
            console.log(value)
            const costTotal: number[] = []
            const incomeTotal: number[] = []
            const vol: number = (zeroTon[idx] + 2 * (zeroTon[idx] / 3)) / 5
            //const vol :number = (props.result.volumes[idx] + 2*(props.result.volumes[idx]/3))/5
            const osX: number[] = []

            for (let i = 0; i < 7; i++) {
              osX.push(Math.round(i * vol * 100) / 100)
            }
            for (let i = 0; i < 7; i++) {
              costTotal.push(Math.round((fixSum + ((i * vol) * props.result.costs[idx])) * 100) / 100)
              incomeTotal.push(Math.round(((i * vol) * props.result.prices[idx]) * 100) / 100)
            }

            const lineGraph = {
              series: [
                {
                  name: "Cost",
                  data: costTotal
                },
                {
                  name: "Sales",
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
                  curve: 'smooth'
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
                        x: zeroTon[idx],
                        y: zeroEur[idx],
                        marker: {
                          size: 8,
                        },
                        label: {
                          borderColor: '#FF4560',
                          text: "Nulový bod"
                        }
                      }
                    ],
                },
                legend: {
                  horizontalAlign: 'right',
                }
              },
            };

            return (
              <div
                className={(props.result.inputs.length % 2 === 1 && idx === props.result.inputs.length - 1) ? "col-lg-12 col-md-12" : "col-lg-6 col-md-12"}>
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
