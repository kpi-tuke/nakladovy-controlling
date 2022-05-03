import { divideArrays, subtractArrays } from '../../helper';

export function sortimentCalculation(data: number[][]) {
  let directCost: number[] = data[0].map((value) => value);
  let totalCost: number[] = data[1].map((value) => value);
  let price: number[] = data[2].map((value) => value);
  let volume: number[] = data[3].map((value) => value);
  let marginProfit: number[] = subtractArrays(price, totalCost);
  let marginGross: number[] = subtractArrays(price, directCost);
  let allowance: number[] = subtractArrays(
    price.map(() => 1),
    divideArrays(directCost, price)
  );
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
  );
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
