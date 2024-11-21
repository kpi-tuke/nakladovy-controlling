import { CellValue, Value } from '@renderer/store/rootReducer';
import { divideArrays, subtractArrays, sumArrays } from '../../helper';
import { formatNumber } from '@renderer/utils/formatNumber';

export function economicCalculation(
  data: CellValue[][],
  values: Value[],
  length: number,
) {
  let costsByYear: number[] = Array.from({ length: length }, () => 0);
  let incomeByYear: number[] = Array.from({ length: length }, () => 0);

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

  let profitByYear: number[] = subtractArrays(incomeByYear, costsByYear);

  let incomeProfitabilityByYear: number[] = divideArrays(
    profitByYear,
    incomeByYear,
  );

  let costProfitabilityByYear: number[] = divideArrays(
    profitByYear,
    costsByYear,
  );

  let costEfficiencyByYear: number[] = divideArrays(incomeByYear, costsByYear);
  let costIndicatorByYear: number[] = divideArrays(costsByYear, incomeByYear);

  // 501 code of material costs
  const values501index = values.findIndex((value) => value.value === '501');
  let materialCostByYear = Array.from({ length: data[0].length }, () => 0);
  if (values501index !== -1) {
    const values501 = data[values501index].map((i) => +i);
    materialCostByYear = divideArrays(values501, incomeByYear);
  }

  // 521 code of wage costs
  const values521index = values.findIndex((value) => value.value === '521');
  let wageCostByYear = Array.from({ length: data[0].length }, () => 0);
  if (values521index !== -1) {
    const values521 = data[values521index].map((i) => +i);
    wageCostByYear = divideArrays(values521, incomeByYear);
  }

  // 551 code of wage costs
  const values551index = values.findIndex((value) => value.value === '551');
  let depreciationCostByYear = Array.from({ length: data[0].length }, () => 0);
  if (values551index !== -1) {
    const values551 = data[values551index].map((i) => +i);
    depreciationCostByYear = divideArrays(values551, incomeByYear);
  }

  // 561 - 569
  const values561569indexes: number[] = [];
  values.forEach((value, index) => {
    if (+value.value >= 561 && +value.value <= 569) {
      values561569indexes.push(index);
    }
  });

  let financialConstByYear = values561569indexes.reduce(
    (acc, index) => {
      return sumArrays(
        acc,
        data[index].map((i) => +i),
      );
    },
    Array.from({ length: data[0].length }, () => 0),
  );

  financialConstByYear = divideArrays(financialConstByYear, incomeByYear);

  // 511 - 518
  const values511518indexes: number[] = [];
  values.forEach((value, index) => {
    if (+value.value >= 511 && +value.value <= 518) {
      values511518indexes.push(index);
    }
  });

  let servicesConstByYear = values511518indexes.reduce(
    (acc, index) => {
      return sumArrays(
        acc,
        data[index].map((i) => +i),
      );
    },
    Array.from({ length: data[0].length }, () => 0),
  );

  servicesConstByYear = divideArrays(servicesConstByYear, incomeByYear);

  // 531 - 538
  const values531538indexes: number[] = [];
  values.forEach((value, index) => {
    if (+value.value >= 531 && +value.value <= 538) {
      values531538indexes.push(index);
    }
  });

  let taxesConstByYear = values531538indexes.reduce(
    (acc, index) => {
      return sumArrays(
        acc,
        data[index].map((i) => +i),
      );
    },
    Array.from({ length: data[0].length }, () => 0),
  );
  taxesConstByYear = divideArrays(taxesConstByYear, incomeByYear);

  return {
    costData: costsByYear.map(formatNumber),
    incomeData: incomeByYear.map(formatNumber),
    profitData: profitByYear.map(formatNumber),
    incomeProfitabilityData: incomeProfitabilityByYear.map(formatNumber),
    costProfitabilityData: costProfitabilityByYear.map(formatNumber),
    costEfficiencyData: costEfficiencyByYear.map(formatNumber),
    costIndicatorData: costIndicatorByYear.map(formatNumber),
    materialCostData: materialCostByYear.map(formatNumber),
    wageCostData: wageCostByYear.map(formatNumber),
    depreciationCostData: depreciationCostByYear.map(formatNumber),
    financialConstData: financialConstByYear.map(formatNumber),
    servicesConstData: servicesConstByYear.map(formatNumber),
    taxesConstData: taxesConstByYear.map(formatNumber),
  };
}
