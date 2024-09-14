import { CellValue } from '@renderer/store/rootReducer';
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

  data.forEach((rowData, idx) => {
    // objem produkcie
    volumes[idx] = parseFloat(rowData[0] as string);
    // predajná cena jednotková
    prices[idx] = parseFloat(rowData[2] as string);
    // variabilné náklady jednotkové
    costs[idx] = parseFloat(rowData[3] as string);

    fixTotals[idx] = parseFloat(rowData[4] as string);
    minProfits[idx] = parseFloat(rowData[5] as string);
  });

  // nulový bod
  const zeroTon = divideArrays(fixTotals, subtractArrays(prices, costs));

  // nulový bod (€)
  const zeroEur = divideArrays(
    fixTotals,
    subtractArrays(
      costs.map(() => 1),
      divideArrays(costs, prices),
    ),
  );

  // nulový bod Zmin (ks)
  const zeroProf = divideArrays(
    costs.map((_, index) =>
      parseFloat((fixTotals[index] + minProfits[index]).toFixed(12)),
    ),
    subtractArrays(prices, costs),
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
    multiplyArrays(volumes, new Array(volumes.length).fill(100)),
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
