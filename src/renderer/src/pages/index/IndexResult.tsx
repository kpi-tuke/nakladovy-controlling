import TableStatic from '../../components/TableStatic';
import { indexCalculation } from './indexCalculation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { indexActions, selectors } from '../index/indexSlice';
import SectionTitle from '@renderer/components/SectionTitle';
import Spacer from '@renderer/components/Spacer';
import { Grid, Paper, Typography } from '@mui/material';
import BarGraph from '@renderer/components/graph/BarGraph';
import TableSelect from '@renderer/components/tables/TableSelect';
import { useEffect, useState } from 'react';

export default function IndexResult() {
  const dispatch = useAppDispatch();

  const data = useAppSelector(selectors.data);
  const headers = useAppSelector(selectors.headers);
  const values = useAppSelector(selectors.values);
  const items = useAppSelector(selectors.items);

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

  const [selectValues, setSelectValues] = useState(['']);

  const handleSelectChange = (index: number, value: string) => {
    setSelectValues((prev) => {
      const newValues = [...prev];
      newValues[index] = value;
      return newValues;
    });
  };

  useEffect(() => {
    if (selectValues.length < betweenYears.length) {
      setSelectValues([...selectValues, '']);
    } else {
      setSelectValues(selectValues.slice(0, selectValues.length - 1));
    }
  }, [betweenYears.length]);

  console.log('selectValues: ', selectValues);

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
          header={betweenYears}
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
          header={betweenYears}
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
          footer={{
            label: 'vývoj nákladov podľa koeficienta reakcie ',
            items: selectValues.map((value, index) => (
              <TableSelect
                key={index}
                value={value}
                onChange={(e) =>
                  handleSelectChange(index, e.target.value as string)
                }
                options={[
                  'proporcionálny',
                  'degresívny',
                  'progresívny',
                  'regresívny',
                ]}
              />
            )),
          }}
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
                labels={['']}
                data={headers.slice(1).map((_, index) => ({
                  name: headers[index + 1].label,
                  values: [+row.slice(1)[index]],
                }))}
                yAxisLabel="ekonomická veličina (€)"
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
