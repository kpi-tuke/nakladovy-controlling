import TableStatic from '../../components/TableStatic';
import { cvpCalculation } from './cvpCalculation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { CVPActions, selectors } from './cvpSlice';
import { Box, Paper, styled, TextField, Typography } from '@mui/material';
import SectionTitle from '@renderer/components/SectionTitle';
import Spacer from '@renderer/components/Spacer';
import { transposeMatrix } from '@renderer/helper';
import BarGraph from '@renderer/components/graph/BarGraph';

const InputsWrapper = styled(Box)`
  display: flex;
  gap: 32px;
  justify-content: center;
`;

const InputWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const YearLabel = styled(SectionTitle)`
  margin-bottom: 0;
`;

export default function CVPResult() {
  const dispatch = useAppDispatch();

  const headers = useAppSelector(selectors.headers);
  const data = useAppSelector(selectors.data);

  // @ts-ignore
  const additionalData = useAppSelector(selectors.getAdditionalData!) as any;

  const fixCosts = additionalData?.fixCosts ?? 0;
  const minProfit = additionalData?.minProfit ?? 0;

  const {
    zeroTon,
    zeroProf,
    zeroEur,
    capacityUsage,
    totalCosts,
    incomeTotal,
    economicResult,
  } = cvpCalculation(transposeMatrix(data), fixCosts, minProfit);

  const handleFixCostChange = (value: string) => {
    dispatch(
      CVPActions.setAdditionalData({
        key: 'fixCosts',
        value,
      }),
    );
  };

  const handleminProfitChange = (value: string) => {
    dispatch(
      CVPActions.setAdditionalData({
        key: 'minProfit',
        value,
      }),
    );
  };

  return (
    <div>
      <Spacer height={40} />

      <InputsWrapper>
        <InputWrapper>
          <YearLabel>Fixné náklady</YearLabel>
          <TextField
            sx={{
              background: (theme) => theme.palette.background.paper,
            }}
            inputProps={{
              style: {
                textAlign: 'center',
              },
            }}
            onChange={(e) => handleFixCostChange(e.target.value)}
            value={fixCosts}
            type="number"
          />
        </InputWrapper>
        <InputWrapper>
          <YearLabel>Minimálny zisk</YearLabel>
          <TextField
            sx={{
              background: (theme) => theme.palette.background.paper,
            }}
            inputProps={{
              style: {
                textAlign: 'center',
              },
            }}
            onChange={(e) => handleminProfitChange(e.target.value)}
            value={minProfit}
            type="number"
          />
        </InputWrapper>
      </InputsWrapper>

      <Spacer height={40} />

      <SectionTitle className={'new-page'}>
        Analýza nulového bodu - kritický bod rentability
      </SectionTitle>

      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={headers.map((header) => header.label)}
          inputs={[
            [
              '(Nc) náklady celkové (€)',
              `\\( N_{c} = N_{f} + (Q * N_{vj})  \\)`,
            ],
            ['(T) tržby celkové (€)', `\\(T=Q * P_{cj}\\)`],
            [
              '(VH) výsledok hospodárenia (zisk/strata) (€)',
              `\\(VH = T - N_{c}\\)`,
            ],
            [
              '(N<sub>0</sub>) - nulový bod (množstvo)',
              `\\(N_{0}=\\frac{F_{n}}{P_{cj}-N_{vj}}\\)`,
              '#9fcdf5',
            ],
            [
              '(N<sub>0</sub>) - nulový bod (€)',
              `\\(N_{0}=\\frac{F{n}}{1-\\frac{N_{vj}}{P_{c}}}\\)`,
            ],
            [
              '(N<sub>0</sub>) - nulový bod Zmin (množstvo)',
              `\\(N_{0}=\\frac{F_{n}+Z_{min}}{P_{cj}-N_{vj}}\\)`,
            ],
            [
              '(VK<sub>krit</sub>) - kritické využitie výrobnej kapacity (%)',
              `\\(VK_{krit}=\\frac{N_{o}(ton)}{Q} * 100\\)`,
            ],
          ]}
          data={[
            totalCosts,
            incomeTotal,
            economicResult,
            zeroTon,
            zeroEur,
            zeroProf,
            capacityUsage,
          ]}
        />
      </Paper>

      <Spacer height={40} hideInPrint />

      <SectionTitle>Dashboarding</SectionTitle>

      <BarGraph
        title={'Bod zvratu'}
        height={420}
        data={headers.map((h, index) => ({
          name: h.label,
          values: [zeroTon[index]],
        }))}
        labels={['']}
        yAxisLabel="nulový bod (množstvo)"
      />

      <Spacer height={40} />

      <div>
        {headers.filter(Boolean).map((header, index) => (
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
                fontSize: '24px',
                textAlign: 'center',
              }}
            >
              {header.label}
            </Typography>
            <BarGraph
              title={'Prehľad ekonomických ukazovateľov produktu'}
              height={420}
              data={[
                {
                  name: 'objem produkcie (Q)',
                  values: [+data[0][index]],
                },
                {
                  name: 'náklady celkové (N<sub>c</sub>)',
                  values: [+totalCosts[index]],
                },
                {
                  name: 'tržby celkové (T)',
                  values: [+incomeTotal[index]],
                },
                {
                  name: 'výsledok hospodárenia (VH)',
                  values: [+economicResult[index]],
                },
              ]}
              labels={['']}
              yAxisLabel="ekonomická veličina (€)"
            />
          </Paper>
        ))}
      </div>
    </div>
  );
}
