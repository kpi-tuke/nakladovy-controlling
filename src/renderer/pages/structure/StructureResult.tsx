import ReactApexChart from 'react-apexcharts';
import TableStatic from '../../components/TableStatic';
import { useColGraph } from '../../graphOptions';
import { ApexOptions } from 'apexcharts';
import { structureCalculation } from './structureCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectStructure } from './structureSlice';
import SectionTitle from 'renderer/components/SectionTitle';
import Spacer from 'renderer/components/Spacer';
import { Grid, Paper } from '@mui/material';
import React from 'react';
import { GraphCard } from 'renderer/components/graph/GraphCard';
import { GraphTitle } from 'renderer/components/graph/GraphTitle';

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

  const genericSeries = [
    {
      name: 'Druhové',
      data: rowSums,
    },
  ];

  const calculationSeries = [
    {
      name: 'Kalkulačné',
      data: colSums,
    },
  ];

  const genericOptions = {
    ...useColGraph(items, 'Náklady (€)'),
    legend: { show: false },
    plotOptions: { bar: { distributed: true } },
  };
  const calculationOptions = {
    ...useColGraph(headers, 'Kalkulačné náklady'),
    legend: { show: false },
    plotOptions: { bar: { distributed: true } },
  };

  const pieChart: ApexOptions = {
    chart: {
      type: 'pie',
      toolbar: {
        show: true,
      },
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
      toolbar: {
        show: true,
      },
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
    <div>
      <Spacer height={40} hideInPrint />
      <SectionTitle className="new-page">Analýza ukazovateľov</SectionTitle>
      <Paper>
        <TableStatic
          corner={'Nákladové druhy'}
          header={[...items.filter(Boolean), 'SPOLU']}
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
          corner={'Druhové náklady'}
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
      </Paper>

      <Spacer height={40} hideInPrint />

      <SectionTitle>Dashboarding</SectionTitle>

      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Grid item xs={12} md={6} display={'flex'}>
          <GraphCard sx={{ flex: 1 }}>
            <GraphTitle>Štruktúra nákladov (%)</GraphTitle>
            <ReactApexChart
              options={pieChart}
              series={rowSums}
              type="pie"
              height={407}
            />
          </GraphCard>
        </Grid>

        <Grid item xs={12} md={6} display={'flex'}>
          <GraphCard sx={{ flex: 1 }}>
            <GraphTitle>Druhové náklady (€)</GraphTitle>
            <ReactApexChart
              options={genericOptions}
              series={genericSeries}
              type="bar"
              height={350}
            />
          </GraphCard>
        </Grid>

        <Grid item xs={12} md={6} display={'flex'}>
          <GraphCard sx={{ flex: 1 }}>
            <GraphTitle>ŠTRUKTÚRA KALKULAČNÝCH POLOŽIEK</GraphTitle>
            <ReactApexChart
              options={donutChart}
              series={colSums}
              type="donut"
              height={407}
            />
          </GraphCard>
        </Grid>

        <Grid item xs={12} md={6} display={'flex'}>
          <GraphCard sx={{ flex: 1 }}>
            <GraphTitle>Kalkulačné položky</GraphTitle>
            <ReactApexChart
              options={calculationOptions}
              series={calculationSeries}
              type="bar"
              height={350}
            />
          </GraphCard>
        </Grid>
      </Grid>
    </div>
  );
}
