export function structureCalculation(data: number[][]) {
  let rowSums: number[] = [];
  let colSums: number[] = [];

  data.map((rowData: number[], row: number) => {
    rowSums[row] = 0;
    rowData.map((value: number) => {
      rowSums[row] = parseFloat((rowSums[row] + value).toFixed(12));
    });
  });

  for (let i = 0; i < data[0].length; i++) {
    colSums.push(0);
  }

  data.map((rowData: number[]) => {
    rowData.map((value: number, idx: number) => {
      colSums[idx] = parseFloat((colSums[idx] + value).toFixed(12));
    });
  });

  const totalCost: number = rowSums.reduce(
    (a: number, b: number) => parseFloat((a + b).toFixed(12)),
    0
  );
  return { rowSums, colSums, totalCost };
}
