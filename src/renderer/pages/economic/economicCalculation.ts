import { divideArrays, subtractArrays } from '../../helper';

export function economicCalculation(data: number[][], values: any) {
  let costsByYear: number[] = data[0].map(() => 0);
  let incomeByYear: number[] = data[0].map(() => 0);

  //sums of costs and incomes by year
  data.map((rowData: number[], row: number) => {
    rowData.map((value: number, col: number) => {
      // 500-599 codes of costs, 600-699 codes od incomes
      if (parseInt(values[row]) >= 600) {
        incomeByYear[col] = parseFloat((incomeByYear[col] + value).toFixed(12));
      } else {
        costsByYear[col] = parseFloat((costsByYear[col] + value).toFixed(12));
      }
    });
  });

  let profitByYear: number[] = subtractArrays(incomeByYear, costsByYear);
  let incomeProfitabilityByYear: number[] = divideArrays(
    profitByYear,
    incomeByYear
  );
  let costProfitabilityByYear: number[] = divideArrays(
    profitByYear,
    costsByYear
  );
  let costEfficiencyByYear: number[] = divideArrays(incomeByYear, costsByYear);
  let costIndicatorByYear: number[] = divideArrays(costsByYear, incomeByYear);

  return {
    costData: costsByYear,
    incomeData: incomeByYear,
    profitData: profitByYear,
    incomeProfitabilityData: incomeProfitabilityByYear,
    costProfitabilityData: costProfitabilityByYear,
    costEfficiencyData: costEfficiencyByYear,
    costIndicatorData: costIndicatorByYear,
  };
}
