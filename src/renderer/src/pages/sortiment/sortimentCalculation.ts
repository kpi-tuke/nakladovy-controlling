import { formatNumber } from '@renderer/utils/formatNumber';
import {
  divideArrays,
  subtractArrays,
  sumArrays,
  multiplyArrays,
} from '../../helper';

export function sortimentCalculation(data: number[][]) {
  const priamyMaterial = data[0].map(formatNumber);

  const priameMzdy = data[1].map(formatNumber);

  const ostatnePriameNaklady = data[2].map(formatNumber);

  const totalCost = data[3].map(formatNumber);

  const price = data[4].map(formatNumber);

  const volume = data[5].map(formatNumber);

  const totalDirectCosts = sumArrays(
    sumArrays(priamyMaterial, priameMzdy),
    ostatnePriameNaklady,
  );

  const marginProfit = subtractArrays(price, totalCost);
  const marginGross = subtractArrays(price, totalDirectCosts);

  const allowance = subtractArrays(
    price.map(() => 1),
    divideArrays(totalDirectCosts, price),
  );

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
  );
  const rentCost = divideArrays(marginProfit, totalCost);

  const rentIncome = multiplyArrays(
    divideArrays(marginProfit, price),
    marginGross.map(() => 100),
  );

  const totalIndirectCosts = subtractArrays(totalCost, totalDirectCosts);

  const unitProfit = subtractArrays(totalDirectCosts, totalCost);

  const income = multiplyArrays(unitProfit, volume);

  const totalCosts = sumArrays(totalDirectCosts, totalIndirectCosts);

  const totalProfit = subtractArrays(income, totalCosts);

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
