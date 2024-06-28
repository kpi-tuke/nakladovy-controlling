import TableStatic from '../../components/TableStatic';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useColGraph } from '../../graphOptions';
import { sortimentCalculation } from './sortimentCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectSortiment } from './sortimentSlice';

export default function SortimentResult() {
  const { headers, data } = useAppSelector(selectSortiment);
  const { marginGross, marginProfit, profit, rentCost, rentIncome, allowance } =
    sortimentCalculation(data);
  let series = [];
  for (let index = 0; index < headers.length; index++) {
    series.push({
      name: headers[index].toString(),
      data: [rentIncome[index], rentCost[index]],
    });
  }

  let series2: any[] = [];
  for (let index = 0; index < headers.length; index++) {
    series2.push({
      name: headers[index].toString(),
      data: [marginGross[index]],
    });
  }

  let series3: any[] = [];
  for (let index = 0; index < headers.length; index++) {
    series3.push({
      name: headers[index].toString(),
      data: [allowance[index]],
    });
  }

  const rentabilityOptions: ApexOptions = useColGraph(
    ['Rentabilita tržieb', 'Rentabilita nákladov'],
    'ekonomický ukazovatel (%)'
  );
  const marginOptions: ApexOptions = useColGraph(
    [''],
    'ekonomický ukazovatel (€)'
  );
  const allowanceOptions: ApexOptions = useColGraph(
    [''],
    'ekonomický ukazovatel (€)'
  );

  return (
    <div className={'new-page'}>
      <h1 className={'result-h1'}>Ukazovatele sortimentnej analýzy</h1>

      <div className={'table-card'}>
        <TableStatic
          corner={'Ukazovatele sortimentnej analýzy'}
          header={[...headers]}
          inputs={[
            [
              '(Rt) - rentabilita tržieb (%)',
              `R_{t}=\\frac{ZP}{P_{cj}}\\times 100`,
            ],
            [
              '(Rn) - rentabilita nákladov (%)',
              `R_{n}=\\frac{ZP}{ÚVN}\\times 100`,
            ],
            ['(Hr) - hrubé rozpätie (€)', `H_{r}={P_{cj}}-{P_{n}}`],
            ['(Pú) - príspevok na úhradu (€)', `P_{ú}=1-\\frac{P_{n}}{P_{cj}}`],
            ['(ZP) - Zisková prirážka (€)', `ZP = P_{cj} - ÚVN`],
            [
              '(Z) - Zisk pri pôvodnej výrobnej štruktúre (€)',
              `Z =((P_{cj} - P_{n}) - (ÚVN - P_{n})) \\times Q`,
            ],
          ]}
          data={[
            [...rentIncome],
            [...rentCost],
            [...marginGross],
            [...allowance],
            [...marginProfit],
            [...profit],
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
            height={420}
          />
        }
      </div>

      <div className={'row'}>
        <div className={'col-t graph-card'}>
          <h4 className={'graph-title'}>HRUBÉ ROZPÄTIE</h4>
          {
            <ReactApexChart
              options={marginOptions}
              series={series2}
              type="bar"
              height={420}
            />
          }
        </div>

        <div className={'col-t graph-card new-page'}>
          <h4 className={'graph-title'}>PRÍSPEVOK NA ÚHRADU</h4>
          {
            <ReactApexChart
              options={allowanceOptions}
              series={series3}
              type="bar"
              height={420}
            />
          }
        </div>
      </div>
    </div>
  );
}
