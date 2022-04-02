export function useBilanceCalc(data: number[][], values: any) {
  let costTotal: number = 0;
  let incomeTotal: number = 0;
  let costData: number[] = [];
  let incomeData: number[] = [];
  let profitData: number[] = [];

  for (let i = 0; i < data[0].length; i++) {
    incomeData.push(0);
    costData.push(0);
  }

  data.map((rowData: number[], row: number) => {
    parseInt(values[row]) >= 600
      ? rowData.map((value: number, col: number) => {
        incomeTotal = parseFloat((incomeTotal + value).toFixed(12));
        incomeData[col] = parseFloat((incomeData[col] + value).toFixed(12));
      })
      : rowData.map((value: number, col: number) => {
        costTotal = parseFloat((costTotal + value).toFixed(12));
        costData[col] = parseFloat((costData[col] + value).toFixed(12));
      });
  });

  for (let i = 0; i < data[0].length; i++) {
    profitData.push(parseFloat((incomeData[i] - costData[i]).toFixed(12)));
  }

  let incomeProfitabilityData: number[] = divideArrays(profitData, incomeData);
  let costProfitabilityData: number[] = divideArrays(profitData, costData);
  let costEfficiencyData: number[] = divideArrays(incomeData, costData);
  let costIndicatorData: number[] = divideArrays(costData, incomeData);

  let profitTotal: number = parseFloat((incomeTotal - costTotal).toFixed(12));

  return {
    costTotal,
    incomeTotal,
    profitTotal,
    costData,
    incomeData,
    profitData,
    incomeProfitabilityData,
    costProfitabilityData,
    costEfficiencyData,
    costIndicatorData,
  };
}

export function useStructureCalc(data: number[][]) {
  let rowSums: number[] = [];
  let colSums: number[] = [];

  data.map((rowData: number[], row: number) => {
    rowSums[row] = 0;
    rowData.map((value: number) => {
      rowSums[row] = parseFloat((rowSums[row] + value).toFixed(12));
    });
  });

  for (let i = 0; i < data[0].length; i++) {
    colSums.push(0);
  }

  data.map((rowData: number[]) => {
    rowData.map((value: number, idx: number) => {
      colSums[idx] = parseFloat((colSums[idx] + value).toFixed(12));
    });
  });

  const totalCost: number = rowSums.reduce(
    (a: number, b: number) => parseFloat((a + b).toFixed(12)),
    0
  );
  return {rowSums, colSums, totalCost};
}

export function useChainCalc(data: number[][], headers: any, values: any) {
  let costSumsForYears: number[] = [];
  let incomeSumsForYears: number[] = [];
  let costSumBase: number = 0;
  let incomeSumBase: number = 0;
  let chainIndexes: number[] = [];
  let baseIndexes: number[] = [];
  let incomeDiff: number[] = [];
  let costDiff: number[] = [];
  let reaction: number[] = [];
  let betweenYears: string[] = [];

  for (let i = 0; i < headers.length - 1; i++) {
    costSumsForYears.push(0);
    incomeSumsForYears.push(0);
  }

  data.map((rowData: number[], row: number) => {
    parseInt(values[row]) >= 600
      ? rowData.map((value: number, col: number) => {
        col === 0
          ? (incomeSumBase = parseFloat((incomeSumBase + value).toFixed(12)))
          : (incomeSumsForYears[col - 1] = parseFloat(
            incomeSumsForYears[col - 1] + value.toFixed(12)
          ));
      })
      : rowData.map((value: number, col: number) => {
        col === 0
          ? (costSumBase = parseFloat((costSumBase + value).toFixed(12)))
          : (costSumsForYears[col - 1] = parseFloat(
            (costSumsForYears[col - 1] + value).toFixed(12)
          ));
      });
  });

  for (let i = 0; i < headers.length - 2; i++) {
    if (costSumsForYears[i] === 0) chainIndexes[i] = 0;
    else
      chainIndexes[i] =
        Math.round((costSumsForYears[i + 1] / costSumsForYears[i]) * 100) / 100;

    if (incomeSumsForYears[i] === 0) incomeDiff[i] = 0;
    else
      incomeDiff[i] = parseFloat(
        (
          (incomeSumsForYears[i + 1] * 100) / incomeSumsForYears[i] -
          100
        ).toFixed(12)
      );

    if (costSumsForYears[i] === 0) costDiff[i] = 0;
    else
      costDiff[i] = parseFloat(
        ((costSumsForYears[i + 1] * 100) / costSumsForYears[i] - 100).toFixed(
          12
        )
      );

    if (incomeDiff[i] === 0) reaction[i] = 0;
    else reaction[i] = Math.round((costDiff[i] / incomeDiff[i]) * 100) / 100;

    incomeDiff[i] = Math.round(incomeDiff[i] * 100) / 100;
    costDiff[i] = Math.round(costDiff[i] * 100) / 100;
    betweenYears[i] = headers[i + 1] + '/' + headers[i + 2];
  }

  for (let i = 0; i < headers.length - 1; i++) {
    if (costSumBase === 0) baseIndexes[i] = 0;
    else
      baseIndexes[i] =
        Math.round((costSumsForYears[i] / costSumBase) * 100) / 100;
  }

  let newHeaders: string[] = [];
  for (let i = 1; i < headers.length; i++) {
    newHeaders.push(headers[i]);
  }
  return {
    headers: newHeaders,
    costSumsForYears,
    incomeSumsForYears,
    costSumBase,
    incomeSumBase,
    chainIndexes,
    baseIndexes,
    costDiff,
    incomeDiff,
    reaction,
    betweenYears,
  };
}

export function useCVPCalc(
  data: number[][],
  fixTotal: number,
  minProfit: number
) {
  let volumes: number[] = [];
  let prices: number[] = [];
  let costs: number[] = [];

  const zeroEur: number[] = [];
  const zeroTon: number[] = [];
  const zeroProf: number[] = [];

  data.map((rowData: number[], idx: number) => {
    volumes[idx] = rowData[0];
    prices[idx] = rowData[1];
    costs[idx] = rowData[2];
  });
  for (let i = 0; i < data.length; i++) {
    if (prices[i] === 0 || costs[i] === prices[i]) zeroEur[i] = 0;
    else
      zeroEur[i] =
        Math.round(
          (100 * fixTotal) / parseFloat((1 - costs[i] / prices[i]).toFixed(12))
        ) / 100;

    if (prices[i] === costs[i]) zeroTon[i] = 0;
    else
      zeroTon[i] =
        Math.round(
          (100 * fixTotal) / parseFloat((prices[i] - costs[i]).toFixed(12))
        ) / 100;

    if (prices[i] === costs[i]) zeroProf[i] = 0;
    else
      zeroProf[i] =
        Math.round(
          (100 * parseFloat((fixTotal + minProfit).toFixed(12))) /
          parseFloat((prices[i] - costs[i]).toFixed(12))
        ) / 100;
  }

  return {
    volumes,
    prices,
    costs,
    fixTotal,
    minProfit,
    zeroEur,
    zeroTon,
    zeroProf,
  };
}

export function useSortimentCalc(data: number[][]) {
  let rentCost: number[] = [];
  let rentIncome: number[] = [];
  let marginProfit: number[] = [];
  let marginGross: number[] = [];
  let allowance: number[] = [];
  let profit: number[] = [];

  let price: number[] = [];
  let directCost: number[] = [];
  let totalCost: number[] = [];
  let volume: number[] = [];
  let totalVolume: number = 0;

  for (let i = 0; i < data[0].length; i++) {
    rentCost.push(0);
    rentIncome.push(0);
    marginGross.push(0);
    marginProfit.push(0);
    allowance.push(0);
    profit.push(0);
    price.push(data[2][i]);
    directCost.push(data[0][i]);
    totalCost.push(data[1][i]);
    volume.push(data[3][i]);
  }

  for (let col = 0; col < data[0].length; col++) {
    marginProfit[col] =
      Math.round(parseFloat((price[col] - totalCost[col]).toFixed(12)) * 100) /
      100;

    if (totalCost[col] === 0) {
      console.log('delenie nulou');
      rentCost[col] = 0;
    } else
      rentCost[col] =
        Math.round((marginProfit[col] / totalCost[col]) * 10000) / 100;

    if (price[col] === 0) {
      console.log('delenie nulou');
      rentIncome[col] = 0;
    } else
      rentIncome[col] =
        Math.round((marginProfit[col] / price[col]) * 10000) / 100;

    marginGross[col] =
      Math.round(parseFloat((price[col] - directCost[col]).toFixed(12)) * 100) /
      100;

    if (price[col] === 0) {
      console.log('delenie nulou');
      allowance[col] = 0;
    } else
      allowance[col] =
        Math.round(
          parseFloat((1 - directCost[col] / price[col]).toFixed(12)) * 100
        ) / 100;

    totalVolume = volume.reduce((a, b) => a + b, 0);

    profit[col] =
      Math.round(
        100 *
        parseFloat(
          (
            parseFloat(
              (
                totalVolume * price[col] -
                totalVolume * directCost[col]
              ).toFixed(12)
            ) -
            parseFloat(
              (
                totalCost[col] * totalVolume -
                directCost[col] * totalVolume
              ).toFixed(12)
            )
          ).toFixed(12)
        )
      ) / 100;
  }

  return {
    rentCost,
    rentIncome,
    marginProfit,
    marginGross,
    allowance,
    profit,
  };
}

export function usePretoCalc(data: number[][], items: any) {
  let valuesWithCauses: Map<string, number> = new Map<string, number>();
  let values: number[] = [];
  let valuesKumul: number[] = [];
  let percentages: number[] = [];
  let percentagesKumul: number[] = [];
  let sum: number = 0;
  let causes: string[] = [];
  let splitedCauses: string[][] = []
  for (let i = 0; i < items.length; i++) {
    percentages.push(0);
    percentagesKumul.push(0);
  }
  for (let i = 0; i < items.length; i++) {
    valuesWithCauses.set(items[i], data[i][0]);
    sum = parseFloat((sum + data[i][0]).toFixed(12));
  }
  let map: Map<string, number> = new Map(
    [...valuesWithCauses.entries()].sort((a, b) => b[1] - a[1])
  );
  let temp: number = 0;
  let idx: number = 0;
  let val: number = 0;

  for (const [key, value] of map.entries()) {
    temp = parseFloat((temp + (value * 100) / sum).toFixed(12));
    val = parseFloat((val + value).toFixed(12));
    valuesKumul[idx] = val;
    percentages[idx] = Math.round((value * 10000) / sum) / 100;
    percentagesKumul[idx] = Math.round(temp * 100) / 100;
    causes.push(key);
    values.push(value);
    idx++;
  }

  causes.map((cause: string) => {
    splitedCauses.push(cause.split(" "))
  })

  return {
    causes: splitedCauses,
    percentages,
    values,
    percentagesKumul,
    valuesKumul,
    sum,
  };
}

const divideArrays = (numerator: number[], denominator: number[]): number[] => {
  let arr: number[] = [];
  for (let i = 0; i < numerator.length; i++) {
    if (numerator[i] === 0 || denominator[i] === 0) arr.push(0);
    else arr.push(Math.round((10000 * numerator[i]) / denominator[i]) / 100);
  }
  return arr;
};
