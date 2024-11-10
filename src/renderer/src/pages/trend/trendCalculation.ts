import { Value } from '@renderer/store/rootReducer';
import { formatNumber } from '@renderer/utils/formatNumber';

export function trendCalculation(
  data: number[][],
  headers: string[],
  values: Value[],
) {
  const betweenYears: string[] = [];
  for (let i = 0; i < headers.length - 1; i++) {
    betweenYears[i] = headers[i + 1] + '/' + headers[i];
  }

  let costsByYear: number[] = Array.from({ length: headers.length }, () => 0);
  let incomeByYear: number[] = Array.from({ length: headers.length }, () => 0);

  //sums of costs and incomes by year
  data.map((rowData, row) => {
    rowData.map((value, col) => {
      // 500-599 codes of costs, 600-699 codes od incomes
      if (parseInt(values[row].value) >= 600) {
        incomeByYear[col] = parseFloat(
          (incomeByYear[col] + +value).toFixed(12),
        );
      } else {
        costsByYear[col] = parseFloat((costsByYear[col] + +value).toFixed(12));
      }
    });
  });

  const absolutnyPrirastok: number[][] = Array.from(
    { length: data.length },
    () => [],
  );
  data.forEach((rowData, rowIndex) => {
    rowData.slice(1).forEach((value, col) => {
      absolutnyPrirastok[rowIndex].push(
        formatNumber(formatNumber(value) - formatNumber(rowData[col])),
      );
    });
  });

  const koeficientRastu: number[][] = Array.from(
    { length: data.length },
    () => [],
  );
  const tempoRastu: number[][] = Array.from({ length: data.length }, () => []);
  const koeficientPrirastku: number[][] = Array.from(
    { length: data.length },
    () => [],
  );
  const tempoPrirastku: number[][] = Array.from(
    { length: data.length },
    () => [],
  );

  data.forEach((rowData, rowIndex) => {
    rowData.slice(1).forEach((value, col) => {
      const res =
        rowData[col] == 0
          ? 0
          : formatNumber(formatNumber(value) / formatNumber(rowData[col]));

      koeficientRastu[rowIndex].push(res);
      tempoRastu[rowIndex].push(formatNumber(res * 100));
      koeficientPrirastku[rowIndex].push(formatNumber(res - 1));
      tempoPrirastku[rowIndex].push(formatNumber((res - 1) * 100));
    });
  });

  return {
    costData: costsByYear,
    incomeData: incomeByYear,
    betweenYears,
    absolutnyPrirastok,
    koeficientRastu,
    tempoRastu,
    koeficientPrirastku,
    tempoPrirastku,
  };
}
