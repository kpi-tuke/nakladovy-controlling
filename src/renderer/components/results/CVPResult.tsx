import TableStatic from '../TableStatic';
import ReactApexChart from 'react-apexcharts';
import { lineGraph } from '../graphOptions';
import { ApexOptions } from 'apexcharts';

export default function CVPResult(props: any) {
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
          else if (props.result.volumes[idx] === props.result.zeroTon[idx])
            osX.push(Math.round(props.result.zeroTon[idx] / 2));
          else osX.push(props.result.volumes[idx]);

          osX.push(Math.max(...osX) + Math.max(...osX) * 0.3);

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

          const graph: ApexOptions = lineGraph(
            osX.map((x: number) => x.toString())
          );
          const series = [
            {
              name: 'Náklady',
              data: costTotal,
            },
            {
              name: 'Výnosy',
              data: incomeTotal,
            },
          ];

          return (
            <div key={idx} className={'col-12'}>
              <div className={'graph-card'}>
                <h4 className={'graph-title'}>
                  {'NULOVÝ BOD: ' + value.toUpperCase()}
                </h4>
                <ReactApexChart
                  options={graph}
                  series={series}
                  type="line"
                  height={400}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
