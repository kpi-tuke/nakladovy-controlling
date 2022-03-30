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
          incomeTotal += value
          incomeData[col] =
            incomeData[col] + value
        })
      : rowData.map((value: number, col: number) => {
          costTotal += value
          costData[col] =
            costData[col] + value
        });
  });

  for (let i = 0; i < data[0].length; i++) {
    profitData.push(incomeData[i] - costData[i]);
  }

  let incomeProfitabilityData: number[] = divideArrays(profitData, incomeData);
  let costProfitabilityData: number[] = divideArrays(profitData, costData);
  let costEfficiencyData: number[] = divideArrays(incomeData, costData);
  let costIndicatorData: number[] = divideArrays(costData, incomeData);

  let profitTotal: number = incomeTotal - costTotal;

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
      rowSums[row] = rowSums[row] + value
    });
  });

  for (let i = 0; i < data[0].length; i++) {
    colSums.push(0);
  }

  data.map((rowData: number[]) => {
    rowData.map((value: number, idx: number) => {
      colSums[idx] = colSums[idx] + value
    });
  });

  const totalCost: number = rowSums.reduce((a: number, b: number) => a + b, 0);

  return { rowSums, colSums, totalCost };
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
            ? incomeSumBase =
                incomeSumBase + value
            : incomeSumsForYears[col - 1] =
                incomeSumsForYears[col - 1] + value
        })
      : rowData.map((value: number, col: number) => {
          col === 0
            ? costSumBase =
                costSumBase + value
            : costSumsForYears[col - 1] =
                costSumsForYears[col - 1] + value
        });
  });

  for (let i = 0; i < headers.length - 2; i++) {
    if (costSumsForYears[i] === 0) chainIndexes[i] = 0;
    else
      chainIndexes[i] =
        Math.round((costSumsForYears[i + 1] / costSumsForYears[i]) * 100) / 100;

    if (incomeSumsForYears[i] === 0) incomeDiff[i] = 0;
    else
      incomeDiff[i] =
        (incomeSumsForYears[i + 1] * 100) / incomeSumsForYears[i] - 100;

    if (costSumsForYears[i] === 0) costDiff[i] = 0;
    else
      costDiff[i] = (costSumsForYears[i + 1] * 100) / costSumsForYears[i] - 100;

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

export function useCVPCalc(data: number[][], fixTotal: number, minProfit: number) {
  let volumes: number[] = [];
  let prices: number[] = [];
  let costs: number[] = [];

  const zeroEur: number[] = [];
  const zeroTon: number[] = [];
  const zeroProf: number[] = [];

  data.map((rowData: number[], idx: number) => {
    volumes[idx] = rowData[0]
    prices[idx] = rowData[1]
    costs[idx] = rowData[2]
  });
  for (let i = 0; i < data.length; i++) {

    if (prices[i] === 0 || costs[i] === prices[i]) zeroEur[i] = 0
    else zeroEur[i] = fixTotal / (1 - costs[i] / prices[i]);

    if (prices[i] === costs[i]) zeroTon[i] = 0
    else zeroTon[i] = fixTotal / (prices[i] - costs[i]);

    if (prices[i] === costs[i]) zeroProf[i] = 0
    else zeroProf[i] =
       (fixTotal + minProfit) /
      (prices[i] - costs[i]);
  }

  return {
    volumes,
    prices,
    costs,
    fixTotal: isNaN(fixTotal) ? 0 : fixTotal,
    minProfit: isNaN(minProfit) ? 0 : minProfit,
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
      Math.round((price[col] - totalCost[col]) * 100) /
      100;

    if (totalCost[col] === 0) {
      console.log('delenie nulou');
      rentCost[col] = 0;
    } else
      rentCost[col] =
        Math.round((marginProfit[col] / totalCost[col]) * 100) /
        100;

    if (price[col] === 0) {
      console.log('delenie nulou');
      rentIncome[col] = 0;
    } else
      rentIncome[col] =
        Math.round((marginProfit[col] / price[col]) * 100) / 100;

    marginGross[col] =
      Math.round((price[col] - directCost[col]) * 100) /
      100;

    if (price[col] === 0) {
      console.log('delenie nulou');
      allowance[col] = 0;
    } else
      allowance[col] =
        Math.round(
          (1 - directCost[col] / price[col]) * 100
        ) / 100;

    profit[col] =
      Math.round(
        (volume[col] * price[col] -
          volume[col] * totalCost[col]) *
          100
      ) / 100;
  }

  return {
    rentCost: rentCost,
    rentIncome: rentIncome,
    marginProfit: marginProfit,
    marginGross: marginGross,
    allowance: allowance,
    profit: profit,
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

  for (let i = 0; i < items.length; i++) {
    percentages.push(0);
    percentagesKumul.push(0);
  }
  for (let i = 0; i < items.length; i++) {
    valuesWithCauses.set(items[i], data[i][0]);
    sum = sum + data[i][0];
  }
  let map: Map<string, number> = new Map(
    [...valuesWithCauses.entries()].sort((a, b) => b[1] - a[1])
  );
  let temp = 0;
  var idx = 0;
  var val = 0;
  for (const [key, value] of map.entries()) {
    temp = temp + (value * 100) / sum;
    val = val + value;
    valuesKumul[idx] = val;
    percentages[idx] = Math.round((value * 10000) / sum) / 100;
    percentagesKumul[idx] = Math.round(temp * 100) / 100;
    causes.push(key);
    values.push(value);
    idx++;
  }

  return {
    causes: causes,
    percentages: percentages,
    values: values,
    kumul: percentagesKumul,
    valuesKumul: valuesKumul,
    sum: sum,
  };
}

const divideArrays = (numerator: number[], denominator: number[]): number[] => {
  let arr: number[] = [];
  for (let i = 0; i < numerator.length; i++) {
    if (numerator[i] === 0 || denominator[i] === 0) arr.push(0);
    else arr.push(Math.round((100 * numerator[i]) / denominator[i]) / 100);
  }
  return arr;
};
