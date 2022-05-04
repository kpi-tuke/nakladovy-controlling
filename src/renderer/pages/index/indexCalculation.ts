import { divideArrays, subtractArrays } from '../../helper';

export function indexCalculation(data: number[][], headers: any, values: any) {
  let costSumsForYears: number[] = headers.slice(1).map(() => 0);
  let incomeSumsForYears: number[] = headers.slice(1).map(() => 0);
  let costSumBase: number = 0;
  let chainIndexes: number[];
  let baseIndexes: number[];
  let incomeDiff: number[];
  let costDiff: number[];
  let reaction: number[];
  let betweenYears: string[] = [];

  data.map((rowData: number[], row: number) => {
    rowData.slice(1).map((value: number, col: number) => {
      // 500-599 codes of costs, 600-699 codes od incomes
      if (parseInt(values[row]) >= 600) {
        incomeSumsForYears[col] = parseFloat(
          (incomeSumsForYears[col] + value).toFixed(12)
        );
      } else {
        costSumsForYears[col] = parseFloat(
          (costSumsForYears[col] + value).toFixed(12)
        );
      }
    });
  });

  for (let i = 0; i < values.length; i++) {
    if (values[i] < 600)
      costSumBase = parseFloat((costSumBase + data[i][0]).toFixed(12));
  }

  incomeDiff = subtractArrays(
    divideArrays(
      incomeSumsForYears.slice(1).map((value) => value * 100),
      incomeSumsForYears.slice(0, -1)
    ),
    incomeSumsForYears.map(() => 100)
  );
  costDiff = subtractArrays(
    divideArrays(
      costSumsForYears.slice(1).map((value) => value * 100),
      costSumsForYears.slice(0, -1)
    ),
    costSumsForYears.map(() => 100)
  );
  chainIndexes = divideArrays(
    costSumsForYears.slice(1),
    costSumsForYears.slice(0, -1)
  );
  reaction = divideArrays(costDiff, incomeDiff);
  baseIndexes = divideArrays(
    costSumsForYears,
    costSumsForYears.map(() => costSumBase)
  );

  for (let i = 0; i < headers.length - 2; i++) {
    betweenYears[i] = headers[i + 1] + '/' + headers[i + 2];
  }

  let newHeaders: string[] = [];
  for (let i = 1; i < headers.length; i++) {
    newHeaders.push(headers[i]);
  }

  return {
    newHeaders,
    costSumsForYears,
    incomeSumsForYears,
    costSumBase,
    chainIndexes,
    baseIndexes,
    costDiff,
    incomeDiff,
    reaction,
    betweenYears,
  };
}
