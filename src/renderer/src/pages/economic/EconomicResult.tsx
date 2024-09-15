import TableStatic from '../../components/TableStatic';
import { economicCalculation } from './economicCalculation';
import { useAppSelector } from '../../store/hooks';
import { selectors as economicSelectors } from './economicSlice';
import SectionTitle from '@renderer/components/SectionTitle';
import Spacer from '@renderer/components/Spacer';
import { Paper } from '@mui/material';

import LineGraph from '@renderer/components/graph/LineGraph';
import BarGraph from '@renderer/components/graph/BarGraph';
import { useMemo } from 'react';

export default function EconomicResult() {
  const headers = useAppSelector(economicSelectors.headers);
  const data = useAppSelector(economicSelectors.data);
  const values = useAppSelector(economicSelectors.values);
  const items = useAppSelector(economicSelectors.items);

  const {
    costData,
    incomeData,
    profitData,
    costProfitabilityData,
    incomeProfitabilityData,
    costEfficiencyData,
    costIndicatorData,
    materialCostData,
    wageCostData,
    depreciationCostData,
    financialConstData,
    servicesConstData,
    taxesConstData,
    constItemsByYear,
  } = economicCalculation(data, values, headers.length ?? 0);

  const constItemsData = useMemo(() => {
    return values.reduce(
      (acc, value, index) => {
        if (+value.value >= 501 && +value.value <= 599) {
          acc.push({
            name: items[index],
            values: constItemsByYear[index],
          });
        }

        return acc;
      },
      [] as { name: string; values: number[] }[],
    );
  }, [values, items, constItemsByYear]);

  return (
    <>
      <Spacer height={40} hideInPrint />
      <SectionTitle className="new-page">
        Analýza ekonomických ukazovateľov
      </SectionTitle>
      <Paper>
        <TableStatic
          corner="Ekonomické veličiny"
          header={headers.map((h) => h.label)}
          inputs={[
            ['(N<sub>c</sub>) - náklady celkom (€)', `\\(\\sum N\\)`],
            ['(V<sub>c</sub>) - výnosy celkom (€)', `\\(\\sum V\\)`],
          ]}
          data={[costData, incomeData]}
        />
      </Paper>
      <Spacer height={40} />
      <Paper>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={headers.map((h) => h.label)}
          inputs={[
            [
              '(VH) - výsledok hospodárenia (€)',
              `\\(\\begin{align*}
              \\text{ZISK} & \\quad V > N \\\\
              \\text{STRATA} & \\quad V < N
              \\end{align*}\\)`,
            ],
            [
              '(R<sub>n</sub>) - rentabilita nákladov',
              `\\(R_{n}=\\frac{Z}{N}\\)`,
            ],
            [
              '(R<sub>v</sub>) - rentabilita výnosov',
              `\\(R_{v}=\\frac{Z}{V}\\)`,
            ],
            [
              '(N<sub>ú</sub>) - nákladová účinnosť',
              `\\(N_{u}=\\frac{V}{N}\\)`,
            ],
            ['(e) - efektívnosť', `\\(e=\\frac{V}{N}\\)`],
            [
              '(h<sub>c</sub>) - celková nákladovosť',
              `\\(h_{c}=\\frac{N}{V}\\)`,
            ],
            [
              '(h<sub>m</sub>) - materiálová nákladovosť',
              '\\(\\frac{N_{MAT (501)}}{V}\\)',
            ],
            [
              '(h<sub>mz</sub>) - mzdová nákladovosť',
              '\\(\\frac{N_{MZDY (521)}}{V}\\)',
            ],
            [
              '(h<sub>o</sub>) - odpisová nákladovosť',
              '\\(\\frac{N_{odpí (551)}}{V}\\)',
            ],
            [
              '(h<sub>f</sub>) - finančná nákladovosť',
              '\\(\\frac{N_{F (561-569)}}{V}\\)',
            ],
            [
              '(h<sub>s</sub>) - nákladovosť služieb',
              '\\(\\frac{N_{s (511-518)}}{V}\\)',
            ],
            [
              '(h<sub>d</sub>) - nákladovosť daní',
              '\\(\\frac{N_{d (531-538)}}{V}\\)',
            ],
          ]}
          data={[
            profitData,
            costProfitabilityData,
            incomeProfitabilityData,
            costEfficiencyData,
            costEfficiencyData,
            costIndicatorData,
            materialCostData,
            wageCostData,
            depreciationCostData,
            financialConstData,
            servicesConstData,
            taxesConstData,
          ]}
        />
      </Paper>
      <Spacer height={40} hideInPrint />
      <SectionTitle>Dashboarding</SectionTitle>
      <LineGraph
        title="TREND VÝVOJA EKONOMICKÝCH VELIČÍN"
        height={420}
        labels={headers.map((h) => h.label)}
        data={[
          {
            name: 'Náklady (N<sub>c</sub>)',
            values: costData,
          },
          {
            name: 'Výnosy (V<sub>c</sub>)',
            values: incomeData,
          },
        ]}
      />
      <Spacer height={40} hideInPrint />

      <BarGraph
        title={'výsledok hospodárenia '}
        height={420}
        labels={headers.map((h) => h.label)}
        data={[
          {
            name: 'Výsledok hospodárenia (VH)',
            values: profitData,
          },
        ]}
        showLegend={false}
      />

      <Spacer height={40} hideInPrint />

      <BarGraph
        title="Prehľad ekonomických ukazovateľov"
        height={420}
        labels={headers.map((h) => h.label)}
        data={[
          {
            name: 'Rentabilita výnosov R<sub>v</sub>',
            values: incomeProfitabilityData,
          },
          {
            name: 'Rentabilita nákladov R<sub>n</sub>',
            values: costProfitabilityData,
          },
          {
            name: 'Nákladová účinnosť N<sub>ú</sub>',
            values: costEfficiencyData,
          },
          {
            name: 'Efektívnosť',
            values: costEfficiencyData,
          },
          {
            name: 'Celková nákladovosť  h<sub>c</sub>',
            values: costIndicatorData,
          },
        ]}
      />

      <Spacer height={40} hideInPrint />

      <BarGraph
        title="Prehľad ukazovateľov nákladovosti"
        height={420}
        labels={headers.map((h) => h.label)}
        data={constItemsData}
      />
    </>
  );
}
