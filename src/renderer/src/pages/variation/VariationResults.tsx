import { Box, Paper, styled, TextField } from '@mui/material';
import SectionTitle from '@renderer/components/SectionTitle';
import { variationActions, selectors } from './variationSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Spacer from '@renderer/components/Spacer';
import TableStatic from '@renderer/components/TableStatic';
import { variationCalculation } from './variationCalculation';
import BarGraph from '@renderer/components/graph/BarGraph';
import { transposeMatrix } from '@renderer/helper';
import LineGraph from '@renderer/components/graph/LineGraph';

const InputWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const YearLabel = styled(SectionTitle)`
  margin-bottom: 0;
`;

const VariationResults = () => {
  const dispatch = useAppDispatch();

  const items = useAppSelector(selectors.items);
  const data = useAppSelector(selectors.data);

  const { absolutnaDiferencia, plneniePlanu } = variationCalculation(
    data as number[][],
  );

  // @ts-ignore
  const additionalData = useAppSelector(selectors.getAdditionalData!) as any;

  const year = additionalData?.year ?? '';

  const handleTextChange = (value: string) => {
    dispatch(
      variationActions.setAdditionalData({
        key: 'year',
        value,
      }),
    );
  };

  return (
    <div>
      <Spacer height={40} />

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
          onChange={(e) => handleTextChange(e.target.value)}
          value={year}
          type="number"
        />
      </InputWrapper>

      <Spacer height={40} />

      <SectionTitle className="new-page">Analýza ukazovateľov</SectionTitle>

      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={items}
          inputs={[
            ['(AD) - absolútna diferencia (€)', `\\(AD = skutočnosť - plán\\)`],
            [
              '(I<sub>p</sub>) plnenia plánu (%)',
              `\\(I_{p}=\\frac{skutočnosť}{plán} * 100\\% \\)`,
            ],
          ]}
          data={[absolutnaDiferencia, plneniePlanu]}
        />
      </Paper>

      <Spacer height={40} hideInPrint />

      <SectionTitle>Dashboarding</SectionTitle>

      <BarGraph
        title={'Prehľad nákladov v podniku'}
        height={420}
        labels={items.filter(Boolean)}
        data={[
          { name: 'plán', values: transposeMatrix(data)[0] as number[] },
          {
            name: 'skutočnosť',
            values: transposeMatrix(data)[1] as number[],
          },
        ]}
        yAxisLabel="náklady v (€)"
      />

      <Spacer height={40} />

      <BarGraph
        title="Plnenie plánu nákladov v podniku"
        height={420}
        labels={items.filter(Boolean)}
        data={[
          {
            name: 'plnenie plánu',
            values: plneniePlanu,
          },
        ]}
        yAxisLabel="percento plnenia plánu (%)"
        showLegend={false}
      />
    </div>
  );
};

export default VariationResults;
