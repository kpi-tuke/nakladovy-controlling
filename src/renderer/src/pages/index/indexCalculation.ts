import { Value } from '@renderer/store/rootReducer';
import { divideArrays, subtractArrays } from '../../helper';
import { formatNumber } from '@renderer/utils/formatNumber';

export function indexCalculation(
  data: number[][],
  headers: string[],
  values: Value[],
) {
  const costSumsForYears: number[] = Array.from(
    { length: headers.length - 1 },
    () => 0,
  );
  const incomeSumsForYears: number[] = Array.from(
    { length: headers.length - 1 },
    () => 0,
  );

  data.map((rowData: number[], row: number) => {
    rowData.slice(1).map((value: number, col: number) => {
      // 600-699 codes of incomes
      if (parseInt(values[row].value) >= 600) {
        incomeSumsForYears[col] = formatNumber(
          formatNumber(incomeSumsForYears[col]) + formatNumber(value),
        );
        // 500-599 codes of costs
      } else if (parseInt(values[row].value) >= 500) {
        costSumsForYears[col] = formatNumber(
          formatNumber(costSumsForYears[col]) + formatNumber(value),
        );
        // custom value
      }
    });
  });

  const betweenYears: string[] = [];
  for (let i = 0; i < headers.length - 2; i++) {
    betweenYears[i] = headers[i + 1] + '/' + headers[i + 2];
  }

  const bazickyIndex = data.reduce((acc, row) => {
    const sum = row.slice(1).map((value) => {
      if (value == 0 || row[0] == 0) {
        return 0;
      } else {
        return formatNumber(value / row[0]);
      }
    });

    acc.push(sum);

    return acc;
  }, [] as number[][]);

  const absolutnaDiferencia = data.reduce((acc, row) => {
    const sum = row.slice(1).map((value) => {
      return formatNumber(value - row[0]);
    });

    acc.push(sum);

    return acc;
  }, [] as number[][]);

  const percentoZmenyNakladov: number[] = [];

  if (headers.length > 2) {
    for (let i = 1; i < headers.length - 1; i++) {
      const n1 = costSumsForYears[i];
      const n0 = costSumsForYears[i - 1];

      let val;

      if (n0 === 0 || n1 === 0) {
        val = 0;
      } else {
        val = n1 / n0;
      }

      console.log('val: ', val);

      percentoZmenyNakladov.push(val * 100 - 100);
    }
  }

  const percentoZmenyVynosov: number[] = [];

  if (headers.length > 2) {
    for (let i = 1; i < headers.length - 1; i++) {
      const n1 = incomeSumsForYears[i];
      const n0 = incomeSumsForYears[i - 1];

      let val;

      if (n0 === 0 || n1 === 0) {
        val = 0;
      } else {
        val = n1 / n0;
      }

      percentoZmenyVynosov.push(val * 100 - 100);
    }
  }

  const koeficientReakcie = divideArrays(
    percentoZmenyNakladov,
    percentoZmenyVynosov,
  );

  return {
    costSumsForYears,
    incomeSumsForYears,
    bazickyIndex,
    absolutnaDiferencia,
    betweenYears,
    percentoZmenyNakladov,
    percentoZmenyVynosov,
    koeficientReakcie,
  };
}
