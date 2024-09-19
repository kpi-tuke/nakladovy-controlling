import TableStatic from '../../components/TableStatic';
import { indexCalculation } from './indexCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectIndex } from '../index/indexSlice';
import SectionTitle from '@renderer/components/SectionTitle';
import Spacer from '@renderer/components/Spacer';
import { Grid, Paper, Typography } from '@mui/material';
import BarGraph from '@renderer/components/graph/BarGraph';

export default function IndexResult() {
  const { data, headers, values, items } = useAppSelector(selectIndex);
  const {
    betweenYears,
    bazickyIndex,
    absolutnaDiferencia,
    percentoZmenyNakladov,
    percentoZmenyVynosov,
    koeficientReakcie,
    retazovyIndexNakladov,
    absolutnaDiferenciaNakladov,
  } = indexCalculation(
    data as number[][],
    headers.map((h) => h.label),
    values,
  );

  return (
    <>
      <Spacer height={40} hideInPrint />
      <SectionTitle className="new-page">Analýza ukazovateľov</SectionTitle>

      <div>
        {items.filter(Boolean).map((item, index) => (
          <Paper
            key={index}
            sx={{
              '&:not(:last-child)': {
                marginBottom: '40px',
              },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                marginLeft: 2,
                marginTop: 1,
                fontSize: '18px',
              }}
            >
              {item}
            </Typography>
            <TableStatic
              corner={'Ekonomické ukazovatele'}
              header={headers.slice(1).map((h) => h.label)}
              inputs={[
                [
                  '(I<sub>b</sub>) - bázický index',
                  `\\(I_{b} = \\frac{N_{i}}{N_{b}}\\)`,
                ],
                [
                  '(AD<sub>b</sub>) - absolútna diferencia (bázická)',
                  `\\(AD_{b} = N_{i} - N_{b}\\)`,
                ],
              ]}
              data={[bazickyIndex[index], absolutnaDiferencia[index]]}
              newPageAfter={false}
            />
          </Paper>
        ))}
      </div>

      <Spacer height={40} />

      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={[...betweenYears]}
          inputs={[
            [
              '(I<sub>r</sub>) - reťazový index',
              `\\(I_{r} = \\frac{N_{i+1}}{N_{i}}\\)`,
            ],
            [
              '(AD<sub>r</sub>) - absolútna diferencia (reťazová)',
              `\\(AD_{r} = N_{1} - N_{0}\\)`,
            ],
          ]}
          data={[retazovyIndexNakladov, absolutnaDiferenciaNakladov]}
        />
      </Paper>

      <Spacer height={40} />

      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={[...betweenYears]}
          inputs={[
            [
              '(P<sub>zn</sub>) - percento zmeny nákladov (%)',
              `\\(P_{zn} = (\\frac{N_{i+1}}{N_{i}} \\times 100) - 100\\)`,
            ],
            [
              '(P<sub>zv</sub>) - percento zmeny výnosov (%)',
              `\\(P_{zn} = (\\frac{V_{i+1}}{V_{i}} \\times 100) - 100\\)`,
            ],
            [
              '(K<sub>r</sub>) - koeficient reakcie',
              `\\(K_{r} = \\frac{P_{zn}}{P_{zv}}\\)`,
            ],
          ]}
          data={[
            percentoZmenyNakladov,
            percentoZmenyVynosov,
            koeficientReakcie,
          ]}
        />
      </Paper>

      <Spacer height={60} hideInPrint />

      <SectionTitle>Dashboarding</SectionTitle>

      <Grid container spacing={2}>
        {data.map((row, index) =>
          !!items[index] ? (
            <Grid item xs={12}>
              <BarGraph
                title={`VÝVOJ EKONOMICKEJ VELIČINY - ${items[index]}`}
                height={420}
                labels={headers.slice(1).map((h) => h.label)}
                data={[
                  {
                    name: items[index],
                    values: row.slice(1) as number[],
                  },
                ]}
                yAxisLabel="ekonomická veličina (€)"
                showLegend={false}
              />
            </Grid>
          ) : null,
        )}

        <Grid item xs={12}>
          <BarGraph
            title="BÁZICKÝ INDEX"
            height={420}
            labels={headers.slice(1).map((h) => h.label)}
            data={items.map((item, index) => ({
              name: item,
              values: bazickyIndex[index],
            }))}
          />
        </Grid>

        <Grid item xs={12}>
          <BarGraph
            title="REŤAZOVÝ INDEX"
            height={420}
            labels={betweenYears}
            data={items.map((item, index) => ({
              name: item,
              values: absolutnaDiferencia[index],
            }))}
          />
        </Grid>
      </Grid>
    </>
  );
}
