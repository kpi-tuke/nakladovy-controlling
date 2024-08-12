import TableStatic from '../../components/TableStatic';
import { paretoCalculation } from './paretoCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectPareto } from './paretoSlice';
import Spacer from 'renderer/components/Spacer';
import SectionTitle from 'renderer/components/SectionTitle';
import { Paper } from '@mui/material';
import BarWithLineGraph from 'renderer/components/graph/BarWithLineGraph';

export default function ParetoResult() {
  const { data, items } = useAppSelector(selectPareto);
  const { values, valuesKumul, percentagesKumul, percentages, causes } =
    paretoCalculation(data as number[][], items);

  return (
    <>
      <Spacer height={40} hideInPrint />
      <SectionTitle className="new-page">Analýza ukazovateľov</SectionTitle>
      <Paper>
        <TableStatic
          corner={'Druhové náklady'}
          header={[
            '(N) - výška nákladov (€)',
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

      <Spacer height={40} hideInPrint />

      <SectionTitle>Dashboarding</SectionTitle>

      <BarWithLineGraph
        title="PARETO ANALÝZA A LORENZOVA KRIVKA"
        height={420}
        labels={causes}
        barData={[
          {
            name: 'Príčiny',
            values: values,
          },
        ]}
        lineData={[
          {
            name: 'Lorenzova krivka',
            values: percentagesKumul,
          },
        ]}
        referenceLines={[
          {
            label: '80%',
            stroke: 'red',
            width: 46,
            y: '80',
          },
        ]}
      />
    </>
  );
}
