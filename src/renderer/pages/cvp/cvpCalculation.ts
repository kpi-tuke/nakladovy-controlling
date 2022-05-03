import { divideArrays, subtractArrays } from '../../helper';

export function cvpCalculation(
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

  zeroEur = divideArrays(
    costs.map(() => fixTotal),
    subtractArrays(
      costs.map(() => 1),
      divideArrays(costs, prices)
    )
  );
  zeroTon = divideArrays(
    costs.map(() => fixTotal),
    subtractArrays(prices, costs)
  );
  zeroProf = divideArrays(
    costs.map(() => parseFloat((fixTotal + minProfit).toFixed(12))),
    subtractArrays(prices, costs)
  );

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
