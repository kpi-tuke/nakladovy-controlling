import { formatNumber } from '@renderer/utils/formatNumber';
import { divideArrays, subtractArrays, multiplyArrays } from '../../helper';

export function sortimentCalculation(data: number[][]) {
  // priame náklady
  const totalDirectCosts = data[0].map(formatNumber);

  // úplné vlastné náklady výkonu
  const totalCost = data[1].map(formatNumber);

  // predajna cena
  const price = data[2].map(formatNumber);

  // objem výroby
  const volume = data[4].map(formatNumber);

  const marginGross = subtractArrays(price, totalDirectCosts).map(formatNumber);

  const allowance = subtractArrays(
    price.map(() => 1),
    divideArrays(totalDirectCosts, price),
  ).map(formatNumber);

  const totalVolume = volume.reduce((a, b) => a + b, 0);

  const profit = subtractArrays(
    subtractArrays(
      price.map((value) => value * totalVolume),
      totalDirectCosts.map((value) => value * totalVolume),
    ),
    subtractArrays(
      totalCost.map((value) => value * totalVolume),
      totalDirectCosts.map((value) => value * totalVolume),
    ),
  ).map(formatNumber);

  const unitProfit = subtractArrays(price, totalCost).map(formatNumber);

  const rentCost = multiplyArrays(
    divideArrays(unitProfit, totalCost),
    Array.from({ length: data.length }, () => 100),
  ).map(formatNumber);

  const rentIncome = multiplyArrays(
    divideArrays(unitProfit, price),
    marginGross.map(() => 100),
  ).map(formatNumber);

  const marginProfit = multiplyArrays(
    divideArrays(unitProfit, price),
    Array.from({ length: data.length }, () => 100),
  ).map(formatNumber);

  const totalIndirectCosts = subtractArrays(totalCost, totalDirectCosts).map(
    formatNumber,
  );

  const income = multiplyArrays(price, volume).map(formatNumber);

  const totalCosts = multiplyArrays(totalCost, volume).map(formatNumber);

  const totalProfit = subtractArrays(income, totalCosts).map(formatNumber);

  return {
    rentCost: rentCost.map(formatNumber),
    rentIncome: rentIncome.map(formatNumber),
    marginProfit: marginProfit.map(formatNumber),
    marginGross: marginGross.map(formatNumber),
    allowance: allowance.map(formatNumber),
    profit: profit.map(formatNumber),
    totalDirectCosts: totalDirectCosts.map(formatNumber),
    totalIndirectCosts: totalIndirectCosts.map(formatNumber),
    unitProfit: unitProfit.map(formatNumber),
    income: income.map(formatNumber),
    totalCosts: totalCosts.map(formatNumber),
    totalProfit: totalProfit.map(formatNumber),
  };
}
