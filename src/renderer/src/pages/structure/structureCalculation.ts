import { CellValue } from '@renderer/store/rootReducer';
import { formatNumber } from '@renderer/utils/formatNumber';

export function structureCalculation(data: CellValue[][]) {
  let rowSums: number[] = [];
  let colSums: number[] = [];

  data.forEach((rowData, row) => {
    rowSums[row] = 0;
    rowData.forEach((value) => {
      rowSums[row] = parseFloat((+rowSums[row] + +value).toFixed(12));
    });
  });

  for (let i = 0; i < data[0].length; i++) {
    colSums.push(0);
  }

  data.forEach((rowData) => {
    rowData.forEach((value, idx) => {
      colSums[idx] = parseFloat((+colSums[idx] + +value).toFixed(12));
    });
  });

  const totalCost: number = rowSums.reduce(
    (a: number, b: number) => parseFloat((a + b).toFixed(12)),
    0,
  );
  return {
    rowSums: rowSums.map(formatNumber),
    colSums: colSums.map(formatNumber),
    totalCost,
  };
}
