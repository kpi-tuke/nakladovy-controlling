import { formatNumber } from '@renderer/utils/formatNumber';
import {
  divideArrays,
  subtractArrays,
  sumArrays,
  multiplyArrays,
} from '../../helper';

export function sortimentCalculation(data: number[][]) {
  const priamyMaterial = data[1].map(formatNumber);

  const priameMzdy = data[2].map(formatNumber);

  const ostatnePriameNaklady = data[3].map(formatNumber);

  const totalCost = data[4].map(formatNumber);

  const price = data[5].map(formatNumber);

  const volume = data[6].map(formatNumber);

  const totalDirectCosts = sumArrays(
    sumArrays(priamyMaterial, priameMzdy),
    ostatnePriameNaklady,
  ).map(formatNumber);

  const marginProfit = subtractArrays(price, totalCost).map(formatNumber);
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

  const rentCost = divideArrays(marginProfit, totalCost).map(formatNumber);

  const rentIncome = multiplyArrays(
    divideArrays(marginProfit, price),
    marginGross.map(() => 100),
  ).map(formatNumber);

  const totalIndirectCosts = subtractArrays(totalCost, totalDirectCosts).map(
    formatNumber,
  );

  const unitProfit = subtractArrays(price, totalCost).map(formatNumber);

  const income = multiplyArrays(price, volume).map(formatNumber);

  const totalCosts = sumArrays(totalDirectCosts, totalIndirectCosts).map(
    formatNumber,
  );

  const totalProfit = subtractArrays(income, totalCosts).map(formatNumber);

  return {
    rentCost,
    rentIncome,
    marginProfit,
    marginGross,
    allowance,
    profit,
    totalDirectCosts,
    totalIndirectCosts,
    unitProfit,
    income,
    totalCosts,
    totalProfit,
  };
}
