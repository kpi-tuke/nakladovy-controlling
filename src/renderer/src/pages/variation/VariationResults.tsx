import { Box, Paper, styled, TextField, Typography } from '@mui/material';
import SectionTitle from '@renderer/components/SectionTitle';
import { variationActions, selectors } from './variationSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Spacer from '@renderer/components/Spacer';
import TableStatic from '@renderer/components/TableStatic';
import { variationCalculation } from './variationCalculation';
import BarGraph from '@renderer/components/graph/BarGraph';
import { transposeMatrix } from '@renderer/helper';

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
      <Spacer height={40} hideInPrint />

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
              header={['']}
              inputs={[
                [
                  '(AD) - absolútna diferencia (€)',
                  `\\(AD = skutočnosť - plán\\)`,
                ],
                [
                  '(I) plnenia plánu (%)',
                  `\\(I=\\frac{skutočnosť}{plán} * 100\\% \\)`,
                ],
              ]}
              data={[[absolutnaDiferencia[index]], [plneniePlanu[index]]]}
              newPageAfter={false}
            />
          </Paper>
        ))}
      </div>

      <Spacer height={40} />

      <BarGraph
        title={'Prehľad ekonomických veličin (plán/skutočnosť)'}
        height={420}
        labels={items.filter(Boolean)}
        data={[
          { name: 'plán', values: transposeMatrix(data)[0] as number[] },
          {
            name: 'skutočnosť',
            values: transposeMatrix(data)[1] as number[],
          },
        ]}
        yAxisLabel="ekonomická veličina (€)"
      />
    </div>
  );
};

export default VariationResults;
