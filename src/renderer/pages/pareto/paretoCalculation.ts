export function paretoCalculation(data: number[][], items: string[]) {
  let valuesWithCauses: Map<string, number> = new Map<string, number>();
  let values: number[] = [];
  let valuesKumul: number[] = [];
  let percentages: number[] = [];
  let percentagesKumul: number[] = [];
  let sum: number = 0;
  let causes: string[] = [];

  for (let i = 0; i < items.length; i++) {
    percentages.push(0);
    percentagesKumul.push(0);
    valuesWithCauses.set(items[i], data[i][0]);
    sum = parseFloat((sum + data[i][0]).toFixed(12));
  }

  let map: Map<string, number> = new Map(
    [...valuesWithCauses.entries()].sort((a, b) => b[1] - a[1])
  );
  let temp: number = 0;
  let idx: number = 0;
  let val: number = 0;

  for (const [key, value] of map.entries()) {
    if (sum === 0) temp = 0;
    else temp = parseFloat((temp + (value * 100) / sum).toFixed(12));

    val = parseFloat((val + value).toFixed(12));
    valuesKumul[idx] = val;

    if (sum === 0) percentages[idx] = 0;
    else percentages[idx] = Math.round((value * 10000) / sum) / 100;

    percentagesKumul[idx] = Math.round(temp * 100) / 100;
    causes.push(key);
    values.push(value);
    idx++;
  }

  return {
    causes,
    percentages,
    values,
    percentagesKumul,
    valuesKumul,
    sum,
  };
}
