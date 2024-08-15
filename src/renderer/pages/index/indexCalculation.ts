import { divideArrays, subtractArrays } from '../../helper';

export function indexCalculation(
  data: number[][],
  headers: string[],
  values: any
) {
  const costSumsForYears: number[] = headers.slice(1).map(() => 0);
  const incomeSumsForYears: number[] = headers.slice(1).map(() => 0);
  const customValueSumsForYears: number[] = headers.slice(1).map(() => 0);

  let costSumBase: number = 0;
  const betweenYears: string[] = [];

  data.map((rowData: number[], row: number) => {
    rowData.slice(1).map((value: number, col: number) => {
      // 600-699 codes of incomes
      if (parseInt(values[row]) >= 600) {
        incomeSumsForYears[col] = parseFloat(
          (incomeSumsForYears[col] + value).toFixed(12)
        );
        // 500-599 codes of costs
      } else if (parseInt(values[row]) >= 500) {
        costSumsForYears[col] = parseFloat(
          (costSumsForYears[col] + value).toFixed(12)
        );
        // custom value
      } else if (parseInt(values[row]) === -1) {
        customValueSumsForYears[col] = parseFloat(
          (customValueSumsForYears[col] + value).toFixed(12)
        );
      }
    });
  });

  for (let i = 0; i < values.length; i++) {
    if (values[i] < 600)
      costSumBase = parseFloat((costSumBase + data[i][0]).toFixed(12));
  }

  const incomeDiff = subtractArrays(
    divideArrays(
      incomeSumsForYears.slice(1).map((value) => value * 100),
      incomeSumsForYears.slice(0, -1)
    ),
    incomeSumsForYears.map(() => 100)
  );

  const costDiff = subtractArrays(
    divideArrays(
      costSumsForYears.slice(1).map((value) => value * 100),
      costSumsForYears.slice(0, -1)
    ),
    costSumsForYears.map(() => 100)
  );

  const chainIndexes = divideArrays(
    costSumsForYears.slice(1),
    costSumsForYears.slice(0, -1)
  );

  const absoluteChainIndexes = subtractArrays(
    costSumsForYears,
    incomeSumsForYears
  ).slice(0, -1);

  const reaction = divideArrays(costDiff, incomeDiff);

  const baseIndexes = divideArrays(
    costSumsForYears,
    costSumsForYears.map(() => costSumBase)
  );

  const absoluteBaseIndexes = subtractArrays(
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
    customValueSumsForYears,
    costSumBase,
    chainIndexes,
    absoluteChainIndexes,
    baseIndexes,
    absoluteBaseIndexes,
    costDiff,
    incomeDiff,
    reaction,
    betweenYears,
  };
}
