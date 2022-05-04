import ReactApexChart from 'react-apexcharts';
import TableStatic from '../../components/TableStatic';
import { useColGraph } from '../../components/graphOptions';
import { ApexOptions } from 'apexcharts';
import {structureCalculation} from "./structureCalculation";
import {useAppSelector} from "../../store/hooks";
import {selectStructure} from "./structureSlice";

export default function StructureResult() {
  const {data, items, headers} = useAppSelector(selectStructure)
  const {rowSums, totalCost, colSums} = structureCalculation(data)
  const genericSeries = [
    {
      name: "Druhové",
      data: rowSums,
    },
  ];

  const calculationSeries = [
    {
      name: "Kalkulačné",
      data: colSums,
    },
  ];

  const genericOptions = {
    ...useColGraph(items, 'Náklady (€)'),
    legend: { show: false },
    plotOptions: { bar: { distributed: true } },
  };
  const calculationOptions = {
    ...useColGraph(headers, 'Náklady (€)'),
    legend: { show: false },
    plotOptions: { bar: { distributed: true } },
  };

  const pieChart: ApexOptions = {
    chart: {
      type: 'pie',
    },
    colors: [
      '#2E93fA',
      '#59edbb',
      '#FF9800',
      '#E91E63',
      '#66DA26',
      '#a796e0',
      '#fff923',
      '#eda859',
      '#546E7A',
    ],
    legend: {
      show: true,
      position: 'bottom',
    },
    fill: {
      type: 'gradient',
    },
    labels: items,
  };
  const donutChart: ApexOptions = {
    chart: {
      type: 'donut',
    },
    colors: [
      '#2E93fA',
      '#59edbb',
      '#FF9800',
      '#E91E63',
      '#66DA26',
      '#a796e0',
      '#fff923',
      '#eda859',
      '#546E7A',
    ],
    legend: {
      show: true,
      position: 'bottom',
    },
    fill: {
      type: 'gradient',
    },
    labels: headers,
  };


  return (
    <div className={'new-page-after new-page'}>
      <h1 className={'result-h1'}>Analýza ukazovateľov</h1>

      <div className={'table-card'} style={{ marginTop: 50 }}>
        <TableStatic
          corner={"Nákladové druhy"}
          header={[...items, 'SPOLU']}
          inputs={[
            ['(Nj) - náklady jednotkové (€)', ''],
            ['(Š) - štruktúra (%)', ''],
          ]}
          data={[
            [
              ...rowSums.map((value: number) => value.toString()),
              totalCost.toString(),
            ],
            [
              ...rowSums.map((value: number) => {
                if (totalCost === 0) return '100';
                return (
                  Math.round((value / totalCost) * 10000) / 100
                ).toString();
              }),
              '100',
            ],
          ]}
        />

        <TableStatic
          corner={"Kalkulačné položky"}
          header={[...headers, 'SPOLU']}
          inputs={[
            ['(Nj) - náklady jednotkové (€)', ''],
            ['(Š) - štruktúra (%)', ''],
          ]}
          data={[
            [
              ...colSums.map((value: number) => value.toString()),
              totalCost.toString(),
            ],
            [
              ...colSums.map((value: number) => {
                if (totalCost === 0) return '100';
                return (
                  Math.round((value / totalCost) * 10000) / 100
                ).toString();
              }),
              '100',
            ],
          ]}
        />
      </div>

      <h1 className={'result-h1 new-page'}>Dashboarding</h1>

      <div className={'row'}>
        <div className={'col-t graph-card'}>
          <h4 className={'graph-title'}>ŠTRUKTÚRA NÁKLADOVÝCH DRUHOV</h4>
          {
            <ReactApexChart
              options={pieChart}
              series={colSums}
              type="pie"
              height={457}
            />
          }
        </div>
        <div className={'col-t graph-card'}>
          <h4 className={'graph-title'}>DRUHOVÉ ČLENENIE NÁKLADOV</h4>
          {
            <ReactApexChart
              options={genericOptions}
              series={genericSeries}
              type="bar"
              height={400}
            />
          }
        </div>
      </div>

      <div className={'row new-page'}>
        <div className={'col-t  graph-card'}>
          <h4 className={'graph-title'}>ŠTRUKTÚRA KALKULAČNÝCH POLOŽIEK</h4>
          {
            <ReactApexChart
              options={donutChart}
              series={rowSums}
              type="donut"
              height={457}
            />
          }
        </div>

        <div className={'col-t graph-card '}>
          <h4 className={'graph-title'}>KALKULAČNÉ ČLENENIE NÁKLADOV</h4>
          {
            <ReactApexChart
              options={calculationOptions}
              series={calculationSeries}
              type="bar"
              height={400}
            />
          }
        </div>
      </div>
    </div>
  );
}
