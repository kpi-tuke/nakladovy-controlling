export function structureCalculation(data: number[][]) {
  let rowSums: number[] = [];
  let colSums: number[] = [];

  data.forEach((rowData: number[], row: number) => {
    rowSums[row] = 0;
    rowData.forEach((value: number) => {
      rowSums[row] = parseFloat((rowSums[row] + value).toFixed(12));
    });
  });

  for (let i = 0; i < data[0].length; i++) {
    colSums.push(0);
  }

  data.forEach((rowData: number[]) => {
    rowData.forEach((value: number, idx: number) => {
      colSums[idx] = parseFloat((colSums[idx] + value).toFixed(12));
    });
  });

  const totalCost: number = rowSums.reduce(
    (a: number, b: number) => parseFloat((a + b).toFixed(12)),
    0
  );
  return { rowSums, colSums, totalCost };
}
