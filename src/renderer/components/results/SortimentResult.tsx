import TableStatic from '../TableStatic';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { colGraph } from '../graphOptions';

export default function SortimentResult(props: any) {
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

  let series3: any[] = [];
  for (let index = 0; index < props.result.headers.length; index++) {
    series3.push({
      name: props.result.headers[index].toString(),
      data: [props.result.allowance[index]],
    });
  }

  const rentabilityOptions: ApexOptions = colGraph(
    ['Rentabilita tržieb', 'Rentabilita nákladov'],
    '(%)'
  );
  const marginOptions: ApexOptions = colGraph([''], '(€)');
  const allowanceOptions: ApexOptions = colGraph([''], '(€)');

  return (
    <div className={'new-page'}>
      <h1 className={'result-h1'}>Ukazovatele sortimentnej analýzy</h1>

      <div className={'table-card'}>
        <TableStatic
          corner={'Ukazovatele sortimentnej analýzy'}
          header={[...props.result.headers]}
          inputs={[
            'Rentabilita tržieb (%)',
            'Rentabilita nákladov (%)',
            'Hrubé rozpätie (€)',
            'Príspevok na úhradu (€)',
            'Zisková prirážka (€)',
            'Zisk pri pôvodnej výrobnej štruktúre (€)',
          ]}
          data={[
            [...props.result.rentIncome],
            [...props.result.rentCost],
            [...props.result.marginGross],
            [...props.result.allowance],
            [...props.result.marginProfit],
            [...props.result.profit],
          ]}
        />
      </div>

      <h1 className={'result-h1 new-page'}>Dashboarding</h1>

      <div className={'graph-card'}>
        <h4 className={'graph-title'}>UKAZOVATELE SORTIMENTNEJ ANALÝZY</h4>
        {
          <ReactApexChart
            options={rentabilityOptions}
            series={series}
            type="bar"
            height={300}
          />
        }
      </div>
      <div className={'graph-card'}>
        <h4 className={'graph-title'}>HRUBÉ ROZPÄTIE</h4>
        {
          <ReactApexChart
            options={marginOptions}
            series={series2}
            type="bar"
            height={300}
          />
        }
      </div>

      <div className={'graph-card new-page'}>
        <h4 className={'graph-title'}>PRÍSPEVOK NA ÚHRADU</h4>
        {
          <ReactApexChart
            options={allowanceOptions}
            series={series3}
            type="bar"
            height={300}
          />
        }
      </div>
    </div>
  );
}
