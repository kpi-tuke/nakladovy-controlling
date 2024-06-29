import ReactApexChart from 'react-apexcharts';
import TableStatic from '../../components/TableStatic';
import { paretoCalculation } from './paretoCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectPareto } from './paretoSlice';
import Spacer from 'renderer/components/Spacer';
import SectionTitle from 'renderer/components/SectionTitle';
import { Paper } from '@mui/material';

export default function ParetoResult() {
  const { data, items } = useAppSelector(selectPareto);
  const { sum, values, valuesKumul, percentagesKumul, percentages, causes } =
    paretoCalculation(data, items);
  const barChart = {
    series: [
      {
        name: 'Príčiny',
        type: 'column',
        data: values,
      },
      {
        name: 'Lorenzova krivka',
        type: 'line',
        data: percentagesKumul,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        toolbar: {
          show: true,
        },
      },
      stroke: {
        curve: 'straight',
        width: [0, 4],
        show: true,
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
        style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: ['black'],
        },
      },
      annotations: {
        yaxis: [
          {
            y: 80,
            yAxisIndex: 1,
            borderColor: 'orange',
            strokeDashArray: 0,
          },
        ],
      },
      labels: causes.map((cause: string) => cause.split(' ')),
      yaxis: [
        {
          min: 0,
          max: sum,
          title: {
            text: 'Náklady (€)',
          },
        },
        {
          opposite: true,
          min: 0,
          max: 100,
          title: {
            text: 'Štruktúra nákladov (%)',
          },
        },
      ],
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    legend: {
      show: true,
    },
  };

  return (
    <div className={'new-page'}>
      <Spacer height={40} />
      <SectionTitle>Analýza ukazovateľov</SectionTitle>

      <Paper>
        <TableStatic
          corner={'Príčiny vzniku nákladov'}
          header={[
            '(N) - náklady (€)',
            'Kumulované náklady (€)',
            'Štruktúra nákladov (%)',
            'Kumulovaná štruktúra nákladov (%)',
          ]}
          inputs={[...causes.map((value: string) => [value, ''])]}
          data={values.map((value: number, idx: number) => {
            return [
              value,
              valuesKumul[idx],
              percentages[idx],
              percentagesKumul[idx],
            ];
          })}
        />
      </Paper>

      <Spacer height={40} />
      <SectionTitle className={'new-page'}>Dashboarding</SectionTitle>

      <div className={'graph-card'}>
        <h4 className={'graph-title'}>PARETO ANALÝZA A LORENZOVA KRIVKA</h4>
        {
          <ReactApexChart
            // @ts-ignore
            options={barChart.options}
            series={barChart.series}
            type="bar"
            height={600}
          />
        }
      </div>
    </div>
  );
}
