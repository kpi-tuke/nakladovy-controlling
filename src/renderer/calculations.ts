export function economicResult(data: number[][], values: any) {
  let costsByYear: number[] = data[0].map(() => 0)
  let incomeByYear: number[] = data[0].map(() => 0)

  //sums of costs and incomes by year
  data.map((rowData: number[], row: number) => {
    rowData.map((value: number, col: number) => {
      // 500-599 codes of costs, 600-699 codes od incomes
      if (parseInt(values[row]) >= 600) {
        incomeByYear[col] = parseFloat((incomeByYear[col] + value).toFixed(12));
      } else {
        costsByYear[col] = parseFloat((costsByYear[col] + value).toFixed(12));
      }
    })
  })

  let profitByYear: number[] = subtractArrays(incomeByYear, costsByYear)
  let incomeProfitabilityByYear: number[] = divideArrays(profitByYear, incomeByYear)
  let costProfitabilityByYear: number[] = divideArrays(profitByYear, costsByYear)
  let costEfficiencyByYear: number[] = divideArrays(incomeByYear, costsByYear)
  let costIndicatorByYear: number[] = divideArrays(costsByYear, incomeByYear)

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

export function structureResult(data: number[][]) {
  let rowSums: number[] = []
  let colSums: number[] = []

  data.map((rowData: number[], row: number) => {
    rowSums[row] = 0;
    rowData.map((value: number) => {
      rowSums[row] = parseFloat((rowSums[row] + value).toFixed(12))
    });
  });

  for (let i = 0; i < data[0].length; i++) {
    colSums.push(0)
  }

  data.map((rowData: number[]) => {
    rowData.map((value: number, idx: number) => {
      colSums[idx] = parseFloat((colSums[idx] + value).toFixed(12))
    });
  });

  const totalCost: number = rowSums.reduce(
    (a: number, b: number) => parseFloat((a + b).toFixed(12)),
    0
  )
  return { rowSums, colSums, totalCost }
}

export function indexResult(data: number[][], headers: any, values: any) {
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
        incomeSumsForYears[col] = parseFloat((incomeSumsForYears[col] + value).toFixed(12));
      } else {
        costSumsForYears[col] = parseFloat((costSumsForYears[col] + value).toFixed(12));
      }
    });
  });

  for (let i = 0; i < values.length; i++) {
    if (values[i] < 600)
      costSumBase = parseFloat((costSumBase + data[i][0]).toFixed(12))
  }

  incomeDiff = subtractArrays(divideArrays(incomeSumsForYears.slice(1).map(value => value * 100), incomeSumsForYears.slice(0,-1)), incomeSumsForYears.map(()=>100))
  costDiff = subtractArrays(divideArrays(costSumsForYears.slice(1).map(value => value * 100), costSumsForYears.slice(0,-1)), costSumsForYears.map(()=>100))
  chainIndexes = divideArrays(costSumsForYears.slice(1), costSumsForYears.slice(0, -1));
  reaction = divideArrays(costDiff, incomeDiff);
  baseIndexes = divideArrays(costSumsForYears, costSumsForYears.map(() => costSumBase));

  for (let i = 0; i < headers.length - 2; i++) {
    betweenYears[i] = headers[i + 1] + '/' + headers[i + 2];
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
    chainIndexes,
    baseIndexes,
    costDiff,
    incomeDiff,
    reaction,
    betweenYears,
  };
}

export function cvpResult(
  data: number[][],
  fixTotal: number,
  minProfit: number
) {
  let volumes: number[] = [];
  let prices: number[] = [];
  let costs: number[] = [];

  let zeroEur: number[];
  let zeroTon: number[];
  let zeroProf: number[];

  data.map((rowData: number[], idx: number) => {
    volumes[idx] = rowData[0];
    prices[idx] = rowData[1];
    costs[idx] = rowData[2];
  });

  zeroEur = divideArrays(costs.map(() => fixTotal), subtractArrays(costs.map(() => 1), divideArrays(costs, prices)));
  zeroTon = divideArrays(costs.map(() => fixTotal), subtractArrays(prices, costs));
  zeroProf = divideArrays(costs.map(() => parseFloat((fixTotal + minProfit).toFixed(12))), subtractArrays(prices, costs));

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

export function sortimentResult(data: number[][]) {
  let directCost: number[] = data[0].map((value) => value);
  let totalCost: number[] = data[1].map((value) => value);
  let price: number[] = data[2].map((value) => value);
  let volume: number[] = data[3].map((value) => value);
  let marginProfit: number[] = subtractArrays(price, totalCost)
  let marginGross: number[] = subtractArrays(price, directCost)
  let allowance: number[] = subtractArrays(price.map(() => 1), divideArrays(directCost, price))
  let totalVolume: number = volume.reduce((a, b) => a + b, 0);
  let profit: number[] = subtractArrays(
    subtractArrays(
      price.map((value) => value * totalVolume),
      directCost.map((value) => value * totalVolume)
    ),
    subtractArrays(
      totalCost.map((value) => value * totalVolume),
      directCost.map((value) => value * totalVolume)
    )
  )
  let rentCost: number[] = divideArrays(marginProfit, totalCost);
  let rentIncome: number[] = divideArrays(marginProfit, price);

  return {
    rentCost,
    rentIncome,
    marginProfit,
    marginGross,
    allowance,
    profit,
  };
}

export function pretoResult(data: number[][], items: string[]) {
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

  return {
    causes,
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
    else arr.push(Math.round((100 * numerator[i]) / denominator[i]) / 100);
  }
  return arr;
};

const subtractArrays = (minuend: number[], subtrahend: number[]): number[] => {
  let arr: number[] = [];
  for (let i = 0; i < minuend.length; i++) {
    arr.push(Math.round(100 * parseFloat((minuend[i] - subtrahend[i]).toFixed(12))) / 100);
  }
  return arr;
};

export function sortTable(headers: string[], data: number[][], offset: number) {
  let tableCols: Map<string, number[]> = new Map<string, number[]>();
  let wrongCols: Map<string, number[]> = new Map<string, number[]>();
  for (let i = offset; i < headers.length; i++) {
    if(isNaN(parseInt(headers[i]))) {
      let col: number[] = data.map((value) => value[i])
      wrongCols.set(headers[i], col);
    }
    else {
      let col: number[] = data.map((value) => value[i])
      tableCols.set(headers[i], col);
    }
  }
  let map: Map<string, number[]> = new Map(
    [...tableCols.entries()].sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
  );

  for (const [key, value] of wrongCols.entries()) {
    map.set(key, value)
  }

  let newHeaders: string[] = []
  let newData: number[][] = []
  for(let i = 0; i < offset; i++) {
    newHeaders.push(headers[i])
  }
  for (let row = 0; row < data.length; row++) {
    let col = offset
    newData.push([])

    for(let i = 0; i < offset; i++) {
      newData[row][i] = data[row][i]
    }

    for (const [key, value] of map.entries()) {
      newHeaders[col] = key;
      newData[row][col] = value[row]
      col++
    }
  }
  return {newHeaders, newData}
}

// [ [1,2,3], [4,5,6], [7,8,9] ] => [ [ [1,2],[4,5],[7,8] ], [ [3],[6],[9] ] ]
export function splitTable(colsPerTable: number, header: string[], data: number[][]) {
  let numberOfTables = Math.ceil(data[0].length / colsPerTable);
  let separatedData: number[][][] = [];
  let separatedHeaders: string[][] = [];

  for (let i = 0; i < numberOfTables; i++) {
    separatedData.push([]);
    separatedHeaders.push([]);
    for (let j = 0; j < data.length; j++) {
      separatedData[i].push([]);
    }
  }

  let tableNumber: number = 0;
  for (let col = 0; col < data[0].length; col++) {
    if (col % colsPerTable === 0 && col !== 0) tableNumber++;
    for (let row = 0; row < data.length; row++) {
      separatedData[tableNumber][row].push(data[row][col]);
    }
    separatedHeaders[tableNumber].push(header[col]);
  }

  return {separatedHeaders, separatedData}
}
