import TableStatic from '../../components/TableStatic';
import { structureCalculation } from './structureCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectStructure } from './structureSlice';
import SectionTitle from '@renderer/components/SectionTitle';
import Spacer from '@renderer/components/Spacer';
import { Box, Grid, Paper, styled, TextField } from '@mui/material';
import React from 'react';
import BarGraph from '@renderer/components/graph/BarGraph';
import PieGraph from '@renderer/components/graph/PieGraph';
import { transposeMatrix } from '@renderer/helper';
import { CellValue } from '@renderer/store/rootReducer';

const InputWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const YearLabel = styled(SectionTitle)`
  margin-bottom: 0;
`;

export default function StructureResult() {
  const { data, items, headers } = useAppSelector(selectStructure);

  const filteredData = React.useMemo(() => {
    const filteredData: CellValue[][] = [];

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

      <InputWrapper>
        <YearLabel>Sledované obdobie</YearLabel>
        <TextField
          sx={{
            background: (theme) => theme.palette.background.paper,
          }}
          inputProps={{
            style: {
              textAlign: 'center',
            },
          }}
          placeholder="Zadajte obdobie"
        />
      </InputWrapper>

      <Spacer height={40} />

      <SectionTitle className="new-page">Analýza ukazovateľov</SectionTitle>
      <Paper>
        <TableStatic
          corner={'Druhové náklady'}
          header={['(Nj) - náklady jednotkové (€)', '(Š) - štruktúra (%)']}
          inputs={[...items.filter(Boolean).map((i) => [i, '']), ['Spolu', '']]}
          data={transposeMatrix([
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
          ])}
        />
      </Paper>

      <Spacer height={40} />

      <Paper>
        <TableStatic
          corner={'Kalkulačné náklady'}
          inputs={[...headers.map((h) => [h.label, '']), ['SPOLU', '']]}
          header={['(Nj) - náklady jednotkové (€)', '(Š) - štruktúra (%)']}
          data={transposeMatrix([
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
          ])}
        />
      </Paper>

      <Spacer height={40} hideInPrint />

      <SectionTitle>Dashboarding</SectionTitle>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <PieGraph
            title="Štruktúra druhových nákladov (%)"
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
            title="Štruktúra kalkulačných nákladov"
            height={420}
            data={colSums.filter(Boolean).map((value, index) => ({
              name: headers[index].label,
              value,
            }))}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <BarGraph
            title="Kalkulačné náklady (€)"
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
