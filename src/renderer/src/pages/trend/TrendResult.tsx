import { trendCalculation } from './trendCalculation';
import { useAppSelector } from '@renderer/store/hooks';
import { selectors } from './trendSlice';
import Spacer from '@renderer/components/Spacer';
import SectionTitle from '@renderer/components/SectionTitle';
import { Paper, Typography } from '@mui/material';
import TableStatic from '@renderer/components/TableStatic';

const TrendResult = () => {
  const data = useAppSelector(selectors.data);
  const items = useAppSelector(selectors.items);
  const headers = useAppSelector(selectors.headers);

  const {
    absolutnyPrirastok,
    koeficientRastu,
    tempoRastu,
    koeficientPrirastku,
    tempoPrirastku,
  } = trendCalculation(data as number[][]);

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
                  '(d<sub>i</sub>) - absolútny prírastok/úbytok (€)',
                  `\\(d_{i} = y_{i} - y_{i-1}\\)`,
                ],
                [
                  '(k<sub>i</sub>) - koeficient rastu/poklesu',
                  `\\(k_{i} = \\frac{y_{i}}{y_{i-1}}\\)`,
                ],
                [
                  '(T<sub>i</sub>) - tempo rastu/poklesu (%)',
                  `\\(T_{i} = k_{i} * 100\\%\\)`,
                ],
                [
                  '(k<sub>d<sub>t</sub></sub>) - koeficient prírastku/úbytku',
                  `\\(k_{d_{t}} = k_{i} - 1\\)`,
                ],
                [
                  '(T<sub>d<sub>t</sub></sub>) - tempo prírastku/úbytku (%)',
                  `\\(T_{d_{t}} = T_{i} - 100\\%\\)`,
                ],
              ]}
              data={[
                absolutnyPrirastok[index],
                koeficientRastu[index],
                tempoRastu[index],
                koeficientPrirastku[index],
                tempoPrirastku[index],
              ]}
              newPageAfter={false}
            />
          </Paper>
        ))}
      </div>

      <Spacer height={40} hideInPrint />
      <SectionTitle>Dashboarding</SectionTitle>
    </>
  );
};

export default TrendResult;
