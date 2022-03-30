import TableStatic from '../TableStatic';
import ReactApexChart from 'react-apexcharts';

export default function Result4(props: any) {

  return (
    <div>

      <h1 className={"result-h1"}>Analýza nulového bodu - kritický bod rentability </h1>

      <div
        className={"table-card"}
      >
        <TableStatic
          corner={"Ekonomické ukazovatele"}
          header={...props.result.items}
          inputs={[
            'Nulový bod(€)',
            'Nulový bod(množstvo)',
            'Nulový bod Zmin =  ' + props.result.minProfit.toString() + "€" + ' v (množstvo)',
          ]}
          data={[
            [
              ...props.result.zeroEur.map(
                (value: number) => Math.round(value * 100) / 100
              ),
            ],
            [
              ...props.result.zeroTon.map(
                (value: number) => Math.round(value * 100) / 100
              ),
            ],
            [
              ...props.result.zeroProf.map(
                (value: number) => Math.round(value * 100) / 100
              ),
            ],
          ]}
        />
      </div>

      <h1 className={"result-h1"}>Dashboarding</h1>

      <div className={"row"}>
        {props.result.items.map((value: any, idx: number) => {

          const costTotal: number[] = [0];
          const incomeTotal: number[] = [0];
          const osX: number[] = [0];

          costTotal.push(Math.round((props.result.costs[idx] * props.result.zeroTon[idx] + parseFloat(props.result.fixTotal)) * 100) / 100 )
          costTotal.push(Math.round((props.result.costs[idx] * props.result.zeroProf[idx] + parseFloat(props.result.fixTotal)) * 100 ) / 100 )
          costTotal.push(Math.round((props.result.costs[idx] * props.result.volumes[idx] + parseFloat(props.result.fixTotal)) * 100 ) / 100 )

          incomeTotal.push(Math.round(props.result.prices[idx] * props.result.zeroTon[idx] * 100) / 100)
          incomeTotal.push(Math.round(props.result.prices[idx] * props.result.zeroProf[idx] * 100) / 100)
          incomeTotal.push(Math.round(props.result.prices[idx] * props.result.volumes[idx] * 100) / 100)

          osX.push(Math.round(props.result.zeroTon[idx]))
          osX.push(Math.round(props.result.zeroProf[idx]))
          osX.push(Math.round(props.result.volumes[idx]))

          costTotal.sort(function(a, b) {
            return a - b;
          });
          osX.sort(function(a, b) {
            return a - b;
          });
          incomeTotal.sort(function(a, b) {
            return a - b;
          });

          const lineGraph = {
            series: [
              {
                name: 'Náklady',
                data: costTotal,
              },
              {
                name: 'Výnosy',
                data: incomeTotal,
              },
            ],
            options: {
              chart: {
                type: 'line',
                zoom: {
                  enabled: false,
                },
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

              xaxis: {
                categories: osX,
              },


              annotations: {
                points: [
                  {
                    x: Math.round(props.result.zeroTon[idx]),
                    y: Math.round(props.result.zeroEur[idx]),
                    marker: {
                      size: 8,
                    },
                    label: {
                      borderColor: '#FF4560',
                      text: 'Nulový bod',
                    },
                  },
                ],
                xaxis: [
                  {
                    x: Math.round(props.result.zeroProf[idx]),
                    borderColor: '#775DD0',
                    label: {
                      style: {
                        color: '#fa023f',
                      },
                      orientation: 'horizontal',
                      text: 'Minimálny zisk',
                    },
                  },
                ],
              },
              legend: {
                horizontalAlign: 'right',
              },
            },
          };

          return (
            <div key={idx} className={"col-12"}>
              <div className={"graph-card"}
                   // style={idx % 2 === 0 ? {marginRight: 25} : {marginLeft: 25}}
              >
                <h4 className={"graph-title"}>{value.toUpperCase()}</h4>
                {
                  // @ts-ignore
                  <ReactApexChart options={lineGraph.options}
                                  series={lineGraph.series}
                                  type="line"
                                  height={500}
                  />
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
