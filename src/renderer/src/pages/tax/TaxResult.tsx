import { Box, Paper, styled, TextField } from '@mui/material';
import SectionTitle from '@renderer/components/SectionTitle';
import Spacer from '@renderer/components/Spacer';
import { taxActions, selectors } from './taxSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { taxCalculation } from './taxCalculation';
import TableStatic from '@renderer/components/TableStatic';
import BarGraph from '@renderer/components/graph/BarGraph';

const InputWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const YearLabel = styled(SectionTitle)`
  margin-bottom: 0;
`;

const TaxResult = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector(selectors.data);
  const items = useAppSelector(selectors.items);

  // @ts-ignore
  const additionalData = useAppSelector(selectors.getAdditionalData!) as any;

  const year = additionalData?.year ?? '';
  const tax = additionalData?.tax ?? 0;
  const income = additionalData?.income ?? 0;

  const {
    uznaneNakladySum,
    neuznaneNakladySum,
    nakladyCelkove,
    vysledokHospodareniaUctovny,
    vysledokHospodareniaDanovy,
    rozdielVysledkuHodpodarenia,
    danovaPovinnost,
  } = taxCalculation(data as number[][], tax, income);

  const handleYearChange = (value: string) => {
    dispatch(
      taxActions.setAdditionalData({
        key: 'year',
        value,
      }),
    );
  };

  const handleTaxChange = (value: string) => {
    dispatch(
      taxActions.setAdditionalData({
        key: 'tax',
        value,
      }),
    );
  };

  const handleIncomeChange = (value: string) => {
    dispatch(
      taxActions.setAdditionalData({
        key: 'income',
        value,
      }),
    );
  };

  return (
    <div>
      <Spacer height={40} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          alignItems: 'center',
          justifyContent: {
            xs: 'center',
            md: 'space-around',
          },
          gap: 2,
        }}
      >
        <InputWrapper>
          <YearLabel>Sledovaný rok</YearLabel>
          <TextField
            sx={{
              background: (theme) => theme.palette.background.paper,
            }}
            inputProps={{
              style: {
                textAlign: 'center',
              },
            }}
            onChange={(e) => handleYearChange(e.target.value)}
            value={year}
            type="number"
          />
        </InputWrapper>

        <InputWrapper>
          <YearLabel>Daňová sadzba (%)</YearLabel>
          <TextField
            sx={{
              background: (theme) => theme.palette.background.paper,
            }}
            inputProps={{
              style: {
                textAlign: 'center',
              },
            }}
            onChange={(e) => handleTaxChange(e.target.value)}
            value={tax}
            type="number"
          />
        </InputWrapper>

        <InputWrapper>
          <YearLabel>Výnosy</YearLabel>
          <TextField
            sx={{
              background: (theme) => theme.palette.background.paper,
            }}
            inputProps={{
              style: {
                textAlign: 'center',
              },
            }}
            onChange={(e) => handleIncomeChange(e.target.value)}
            value={income}
            type="number"
          />
        </InputWrapper>
      </Box>

      <Spacer height={40} />

      <SectionTitle className="new-page">Analýza ukazovateľov</SectionTitle>

      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={['Hodnota (€)']}
          inputs={[
            [
              '(N<sub>du</sub>) - daňovo uznané náklady (€)',
              `\\(N_{du} = \\sum daňovo.uznané.náklady \\)`,
            ],
            [
              '(N<sub>dn</sub>) - daňovo neuznané náklady (€)',
              `\\(N_{dn} = \\sum daňovo.neuznané.náklady \\)`,
            ],
            ['(NC) - náklady celkové (€)', `\\(NC = N_{du} + N_{dn} \\)`],
            [
              '(VH<sub>ú</sub>) - výsledok hospodárenia účtovný (€)',
              `\\(VH_{ú} = V - NC \\)`,
            ],
            [
              '(VH<sub>d</sub>) - výsledok hospodárenia daňový (€)',
              `\\(VH_{d} = V - N_{du} \\)`,
            ],
            [
              '(AD) - rozdiel výsledku hospodárenia (€)',
              `\\(AD = VH_{ú} - VH_{d} \\)`,
            ],
            ['(Daň) - daňová povinnosť', `\\(DP = (VH_{d} * DS) / 100 \\)`],
          ]}
          data={[
            [uznaneNakladySum],
            [neuznaneNakladySum],
            [nakladyCelkove],
            [vysledokHospodareniaUctovny],
            [vysledokHospodareniaDanovy],
            [rozdielVysledkuHodpodarenia],
            [danovaPovinnost],
          ]}
          newPageAfter={false}
        />
      </Paper>

      <Spacer height={40} hideInPrint />
      <SectionTitle>Dashboarding</SectionTitle>

      <BarGraph
        title="Prehľad ďaňovo uznaných nákladov"
        height={420}
        labels={['']}
        data={items.filter(Boolean).map((item, index) => ({
          name: item,
          values: [data[index][0] as number],
        }))}
        yAxisLabel="náklady v (€)"
      />

      <Spacer height={40} />

      <BarGraph
        title="Prehľad ďaňovo neuznaných nákladov"
        height={420}
        labels={['']}
        data={items.filter(Boolean).map((item, index) => ({
          name: item,
          values: [data[index][1] as number],
        }))}
        yAxisLabel="náklady v (€)"
      />

      <Spacer height={40} />

      <BarGraph
        title="Prehľad výsledku hospodárenia a daňovej povinnosti"
        height={420}
        labels={['']}
        data={[
          {
            name: 'VH<sub>d</sub> - výsledok hospodárenia daňový',
            values: [vysledokHospodareniaDanovy],
          },
          { name: '(Daň) - daňová povinnosť', values: [danovaPovinnost] },
        ]}
        yAxisLabel="ekonomická veličina (€)"
      />
    </div>
  );
};

export default TaxResult;
