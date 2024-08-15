import TableStatic from '../../components/TableStatic';
import { structureCalculation } from './structureCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectStructure } from './structureSlice';
import SectionTitle from 'renderer/components/SectionTitle';
import Spacer from 'renderer/components/Spacer';
import { Grid, Paper } from '@mui/material';
import React from 'react';
import BarGraph from 'renderer/components/graph/BarGraph';
import PieGraph from 'renderer/components/graph/PieGraph';

export default function StructureResult() {
  const { data, items, headers } = useAppSelector(selectStructure);

  const filteredData = React.useMemo(() => {
    const filteredData = [];

    items.forEach((item, index) => {
      if (Boolean(item)) {
        filteredData.push(data[index]);
      }
    });

    return filteredData;
  }, [data, items]);

  const { rowSums, totalCost, colSums } = structureCalculation(filteredData);

  return (
    <div>
      <Spacer height={40} hideInPrint />
      <SectionTitle className="new-page">Analýza ukazovateľov</SectionTitle>
      <Paper>
        <TableStatic
          corner={'Druhové náklady'}
          header={[...items.filter(Boolean), 'Spolu']}
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
      </Paper>

      <Spacer height={40} />

      <Paper>
        <TableStatic
          corner={'Kalkulačné náklady'}
          header={[...headers.map((h) => h.label), 'SPOLU']}
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
      </Paper>

      <Spacer height={40} hideInPrint />

      <SectionTitle>Dashboarding</SectionTitle>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <PieGraph
            title="Štruktúra nákladov (%)"
            height={420}
            data={rowSums.map((value, index) => ({
              name: items[index],
              value,
            }))}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <BarGraph
            title="Druhové náklady (€)"
            height={420}
            labels={['']}
            data={items.filter(Boolean).map((item, index) => ({
              name: item,
              values: [rowSums[index]],
            }))}
            yAxisLabel="Náklady (€)"
            showValueInBar={true}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <PieGraph
            title="ŠTRUKTÚRA KALKULAČNÝCH POLOŽIEK"
            height={420}
            data={colSums.filter(Boolean).map((value, index) => ({
              name: headers[index].label,
              value,
            }))}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <BarGraph
            title="Kalkulačné položky"
            height={420}
            labels={['']}
            data={headers.filter(Boolean).map((header, index) => ({
              name: header.label,
              values: [colSums[index]],
            }))}
            yAxisLabel="Kalkulačné náklady"
            showValueInBar={true}
          />
        </Grid>
      </Grid>
    </div>
  );
}
