import {
  divideArrays,
  subtractArrays,
  sumArrays,
  multiplyArrays,
} from '../../helper';

export function sortimentCalculation(data: number[][]) {
  const directCost: number[] = data[0].map((value) => value);
  const totalCost: number[] = data[1].map((value) => value);
  const price: number[] = data[2].map((value) => value);
  const volume: number[] = data[3].map((value) => value);
  const marginProfit: number[] = subtractArrays(price, totalCost);
  const marginGross: number[] = subtractArrays(price, directCost);

  const allowance: number[] = subtractArrays(
    price.map(() => 1),
    divideArrays(directCost, price)
  );

  const totalVolume: number = volume.reduce((a, b) => a + b, 0);

  const profit: number[] = subtractArrays(
    subtractArrays(
      price.map((value) => value * totalVolume),
      directCost.map((value) => value * totalVolume)
    ),
    subtractArrays(
      totalCost.map((value) => value * totalVolume),
      directCost.map((value) => value * totalVolume)
    )
  );
  const rentCost: number[] = divideArrays(marginProfit, totalCost);

  const rentIncome: number[] = divideArrays(marginProfit, price);

  const totalDirectCosts = sumArrays(sumArrays(data[4], data[5]), data[6]);

  const totalIndirectCosts = subtractArrays(data[1], totalDirectCosts);

  const unitProfit = subtractArrays(totalDirectCosts, data[1]);

  const income = multiplyArrays(totalDirectCosts, data[3]);

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
