import { Value } from '@renderer/store/rootReducer';
import { divideArrays } from '../../helper';
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

  const retazovyIndexNakladov: number[][] = [];
  const absolutnaDiferenciaNakladov: number[][] = [];

  if (headers.length > 2) {
    data.forEach((rowData, rowIndex) => {
      for (let i = 2; i < rowData.length; i++) {
        const n1 = rowData[i];
        const n0 = rowData[i - 1];

        if (!Array.isArray(retazovyIndexNakladov[rowIndex])) {
          retazovyIndexNakladov[rowIndex] = [];
        }

        if (!Array.isArray(absolutnaDiferenciaNakladov[rowIndex])) {
          absolutnaDiferenciaNakladov[rowIndex] = [];
        }

        if (n1 == 0 || n0 == 0) {
          retazovyIndexNakladov[rowIndex].push(0);
          absolutnaDiferenciaNakladov[rowIndex].push(0);
        } else {
          retazovyIndexNakladov[rowIndex].push(formatNumber(n1 / n0));
          absolutnaDiferenciaNakladov[rowIndex].push(formatNumber(n1 - n0));
        }
      }
    });
  }

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

      percentoZmenyNakladov.push(formatNumber(val * 100 - 100));
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
        val = formatNumber(n1 / n0);
      }

      percentoZmenyVynosov.push(formatNumber(val * 100 - 100));
    }
  }

  const koeficientReakcie = divideArrays(
    percentoZmenyNakladov,
    percentoZmenyVynosov,
  );

  return {
    costSumsForYears: costSumsForYears.map(formatNumber),
    incomeSumsForYears: incomeSumsForYears.map(formatNumber),
    bazickyIndex: bazickyIndex.map((items) => items.map(formatNumber)),
    absolutnaDiferencia: absolutnaDiferencia.map((items) =>
      items.map(formatNumber),
    ),
    percentoZmenyNakladov: percentoZmenyNakladov.map(formatNumber),
    percentoZmenyVynosov: percentoZmenyVynosov.map(formatNumber),
    koeficientReakcie: koeficientReakcie.map(formatNumber),
    retazovyIndexNakladov: retazovyIndexNakladov.map((items) =>
      items.map(formatNumber),
    ),
    absolutnaDiferenciaNakladov: absolutnaDiferenciaNakladov.map((items) =>
      items.map(formatNumber),
    ),
    betweenYears,
  };
}
