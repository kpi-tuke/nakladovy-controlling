import { divideArrays, multiplyArrays, subtractArrays } from '@renderer/helper';
import { formatNumber } from '@renderer/utils/formatNumber';

export const variationCalculation = (data: number[][]) => {
  const plan: number[] = [];
  const reality: number[] = [];

  data.forEach((rowData, idx) => {
    plan[idx] = formatNumber(rowData[0]);

    reality[idx] = formatNumber(rowData[1]);
  });

  const absolutnaDiferencia = subtractArrays(reality, plan);

  const plneniePlanu = multiplyArrays(
    divideArrays(reality, plan),
    new Array(plan.length).fill(100),
  );

  return {
    absolutnaDiferencia: absolutnaDiferencia.map(formatNumber),
    plneniePlanu: plneniePlanu
      .map(formatNumber)
      .map((value) => Math.ceil(value)),
  };
};
