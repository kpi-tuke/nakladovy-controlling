import TableStatic from '../TableStatic';
import ReactApexChart from 'react-apexcharts';

export default function Result4(props: any) {
  return (
    <div>
      <h1 className={'result-h1'}>
        Analýza nulového bodu - kritický bod rentability{' '}
      </h1>

      <div className={'table-card'}>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={...props.result.items}
          inputs={[
            'Nulový bod (€)',
            'Nulový bod (ks...)',
            'Nulový bod Zmin (ks...)',
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

      <h1 className={'result-h1'}>Dashboarding</h1>

      <div className={'row'}>
        {props.result.items.map((value: any, idx: number) => {
          const costTotal: number[] = [];
          const incomeTotal: number[] = [];
          const osX: number[] = [0];

          if (props.result.zeroTon[idx] === 0)
            if (props.result.volumes[idx] === 0) osX.push(5);
            else osX.push(props.result.volumes[idx] * 2);
          else osX.push(props.result.zeroTon[idx]);

          if (props.result.zeroProf[idx] === props.result.zeroTon[idx]) {
            if (props.result.zeroProf[idx] === 0) osX.push(osX[1] * 2);
            else osX.push(props.result.zeroTon[idx] * 2);
          } else osX.push(props.result.zeroProf[idx]);

          if (props.result.volumes[idx] === 0)
            osX.push(Math.max(...osX) + Math.max(...osX) * 0.3);
          else osX.push(props.result.volumes[idx]);

          osX.push(Math.max(...osX) + Math.max(...osX) * 0.3)

          osX.map((vol: number) => {
            costTotal.push(
              Math.round(
                (props.result.costs[idx] * vol +
                  parseFloat(props.result.fixTotal)) *
                100
              ) / 100
            );

            incomeTotal.push(
              Math.round(props.result.prices[idx] * vol * 100) / 100
            );
          });

          costTotal.sort(function (a, b) {
            return a - b;
          });
          incomeTotal.sort(function (a, b) {
            return a - b;
          });
          osX.sort(function (a, b) {
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
                categories: osX.map((x: number) => x.toString()),
              },
              annotations: {
                points: [
                  {
                    x: props.result.zeroTon[idx].toString(),
                    y: props.result.zeroEur[idx],
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
                    x: props.result.zeroProf[idx].toString(),
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
                horizontalAlign: 'center',
              },
            },
          };

          return (
            <div key={idx} className={'col-12'}>
              <div className={'graph-card'}>
                <h4 className={'graph-title'}>
                  {'NULOVÝ BOD: ' + value.toUpperCase()}
                </h4>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
