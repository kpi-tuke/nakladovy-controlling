import { CellValue } from '@renderer/store/rootReducer';
import {
  divideArrays,
  multiplyArrays,
  subtractArrays,
  sumArrays,
} from '../../helper';
import { formatNumber } from '@renderer/utils/formatNumber';

export function cvpCalculation(data: CellValue[][], fixCosts) {
  const volumes: number[] = [];
  const prices: number[] = [];
  const costs: number[] = [];
  const fixTotals: number[] = [];
  const minProfits: number[] = [];
  const productionCapacity: number[] = [];

  data.forEach((rowData, idx) => {
    // objem produkcie
    volumes[idx] = formatNumber(rowData[0]);

    // predajná cena jednotková
    prices[idx] = formatNumber(rowData[2]);

    // variabilné náklady jednotkové
    costs[idx] = formatNumber(rowData[3]);

    // minimanly zisk
    minProfits[idx] = formatNumber(rowData[4]);

    // vyrobná kapacita
    productionCapacity[idx] = formatNumber(rowData[5]);

    // fixne náklady
    fixTotals[idx] = formatNumber(fixCosts);
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
  const capacityUsage = multiplyArrays(
    divideArrays(zeroTon, productionCapacity),
    new Array(volumes.length).fill(100),
  );

  // multiplyArrays(productionCapacity, new Array(volumes.length).fill(100)),

  const totalCosts = sumArrays(fixTotals, multiplyArrays(volumes, costs));

  const incomeTotal = multiplyArrays(volumes, prices);

  const economicResult = subtractArrays(incomeTotal, totalCosts);

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
    totalCosts,
    incomeTotal,
    economicResult,
  };
}
