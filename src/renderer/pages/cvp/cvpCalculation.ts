import { CellValue } from 'renderer/store/rootReducer';
import {
  divideArrays,
  multiplyArrays,
  subtractArrays,
  sumArrays,
} from '../../helper';

export function cvpCalculation(data: CellValue[][]) {
  const volumes: number[] = [];
  const prices: number[] = [];
  const costs: number[] = [];
  const fixTotals: number[] = [];
  const minProfits: number[] = [];

  data.forEach((rowData: number[], idx: number) => {
    // objem produkcie
    volumes[idx] = rowData[0];
    // predajná cena jednotková
    prices[idx] = rowData[2];
    // variabilné náklady jednotkové
    costs[idx] = rowData[3];

    fixTotals[idx] = rowData[4];
    minProfits[idx] = rowData[5];
  });

  const zeroEur = divideArrays(
    fixTotals,
    subtractArrays(
      costs.map(() => 1),
      divideArrays(costs, prices)
    )
  );

  const zeroTon = divideArrays(fixTotals, subtractArrays(prices, costs));

  const zeroProf = divideArrays(
    costs.map((_, index) =>
      parseFloat((fixTotals[index] + minProfits[index]).toFixed(12))
    ),
    subtractArrays(prices, costs)
  );

  // pri predajnej cene
  const zeroSellPrice = divideArrays(fixTotals, sumArrays(volumes, costs));

  // príspevok na úhradu fixných nákladov a zisku
  const paymentMoney = subtractArrays(prices, costs);

  // náklady fixné jednotkové
  const fixedCosts = divideArrays(fixTotals, volumes);

  // kritické využitie výrobnej kapacity
  const capacityUsage = divideArrays(
    zeroTon,
    multiplyArrays(volumes, new Array(volumes.length).fill(100))
  );

  return {
    volumes,
    prices,
    costs,
    zeroEur,
    zeroTon,
    zeroProf,
    fixTotals,
    minProfits,
    zeroSellPrice,
    paymentMoney,
    fixedCosts,
    capacityUsage,
  };
}
