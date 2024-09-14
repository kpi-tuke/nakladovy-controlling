import { formatNumber } from '@renderer/utils/formatNumber';
import {
  divideArrays,
  subtractArrays,
  sumArrays,
  multiplyArrays,
} from '../../helper';

export function sortimentCalculation(data: number[][]) {
  const directCost: number[] = data[0].map(formatNumber);

  const totalCost: number[] = data[1].map(formatNumber);

  const price: number[] = data[2].map(formatNumber);

  const volume: number[] = data[3].map(formatNumber);

  const priamyMaterial: number[] = data[4].map(formatNumber);

  const priameMzdy: number[] = data[5].map(formatNumber);

  const ostatnePriameNaklady: number[] = data[6].map(formatNumber);

  const marginProfit: number[] = subtractArrays(price, totalCost);
  const marginGross: number[] = subtractArrays(price, directCost);

  const allowance: number[] = subtractArrays(
    price.map(() => 1),
    divideArrays(directCost, price),
  );

  const totalVolume: number = volume.reduce((a, b) => a + b, 0);

  const profit: number[] = subtractArrays(
    subtractArrays(
      price.map((value) => value * totalVolume),
      directCost.map((value) => value * totalVolume),
    ),
    subtractArrays(
      totalCost.map((value) => value * totalVolume),
      directCost.map((value) => value * totalVolume),
    ),
  );
  const rentCost: number[] = divideArrays(marginProfit, totalCost);

  const rentIncome: number[] = divideArrays(marginProfit, price);

  const totalDirectCosts = sumArrays(
    sumArrays(priamyMaterial, priameMzdy),
    ostatnePriameNaklady,
  );

  const totalIndirectCosts = subtractArrays(totalCost, totalDirectCosts);

  const unitProfit = subtractArrays(totalDirectCosts, totalCost);

  const income = multiplyArrays(totalDirectCosts, volume);

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
