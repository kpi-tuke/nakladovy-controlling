import TableStatic from '../TableStatic';
import ReactApexChart from 'react-apexcharts';
import { CVPGraph } from '../graphOptions';
import { ApexOptions } from 'apexcharts';

export default function CVPResult(props: any) {
  const graphs: {
    value: string;
    graph: ApexOptions;
    series: { name: string; data: number[] }[];
  }[] = [];
  props.result.items.map((value: any, idx: number) => {
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
          (props.result.costs[idx] * vol + parseFloat(props.result.fixTotal)) *
            100
        ) / 100
      );

      incomeTotal.push(Math.round(props.result.prices[idx] * vol * 100) / 100);
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

    const graph: ApexOptions = CVPGraph(
      osX.map((x: number) => x.toString()),
      props.result.zeroTon[idx],
      props.result.zeroProf[idx]
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
    graphs.push({
      value,
      graph,
      series,
    });
  });

  return (
    <div className={graphs.length % 2 === 0 ? 'new-page-after' : ''}>
      <h1 className={'result-h1 new-page'}>
        Analýza nulového bodu - kritický bod rentability{' '}
      </h1>

      <div className={'table-card'}>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={...props.result.items}
          inputs={[
            ['(No) - nulový bod (€)', `N_{0}=\\frac{F{n}}{1-\\frac{N_{vj}}{P_{cj}}}`],
            ['(No) - nulový bod (ks...)', `N_{0}=\\frac{F_{n}}{P_{cj}-N_{vj}}`],
            ['(No) - nulový bod Zmin (ks...)', `N_{0}=\\frac{F_{n}+Z_{min}}{P_{cj}-N_{vj}}`],
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

      <h1 className={'result-h1 new-page'}>Dashboarding</h1>

      {graphs.map((graph, idx) => (
        <div className={idx % 2 === 0 && idx !== 0 ? 'new-page' : ''}>
          <div key={idx} className={'col-12'}>
            <div className={'graph-card'}>
              <h4 className={'graph-title'}>
                {'NULOVÝ BOD: ' + graph.value.toUpperCase()}
              </h4>
              <ReactApexChart
                options={graph.graph}
                series={graph.series}
                type="line"
                height={420}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
