import { CellValue } from './store/rootReducer';

// [ [1,2,3], [4,5,6], [7,8,9] ] => [ [ [1,2],[4,5],[7,8] ], [ [3],[6],[9] ] ]
export function splitTable(
  colsPerTable: number,
  header: string[],
  data: CellValue[][]
) {
  let numberOfTables = Math.ceil(data[0].length / colsPerTable);
  let separatedData: CellValue[][][] = [];
  let separatedHeaders: string[][] = [];

  for (let i = 0; i < numberOfTables; i++) {
    separatedData.push([]);
    separatedHeaders.push([]);
    for (let j = 0; j < data.length; j++) {
      separatedData[i].push([]);
    }
  }

  let tableNumber: number = 0;
  for (let col = 0; col < data[0].length; col++) {
    if (col % colsPerTable === 0 && col !== 0) tableNumber++;
    for (let row = 0; row < data.length; row++) {
      separatedData[tableNumber][row].push(data[row][col]);
    }
    separatedHeaders[tableNumber].push(header[col]);
  }

  return { separatedHeaders, separatedData };
}

export const divideArrays = (
  numerator: number[],
  denominator: number[]
): number[] => {
  let arr: number[] = [];
  for (let i = 0; i < numerator.length; i++) {
    if (numerator[i] === 0 || denominator[i] === 0) arr.push(0);
    else arr.push(Math.round((100 * numerator[i]) / denominator[i]) / 100);
  }
  return arr;
};

export const multiplyArrays = (
  array1: number[],
  array2: number[]
): number[] => {
  let product: number[] = [];
  for (let i = 0; i < array1.length; i++) {
    product.push(array1[i] * array2[i]);
  }
  return product;
};

export const subtractArrays = (
  minuend: number[],
  subtrahend: number[]
): number[] => {
  let arr: number[] = [];
  for (let i = 0; i < minuend.length; i++) {
    arr.push(
      Math.round(100 * parseFloat((minuend[i] - subtrahend[i]).toFixed(12))) /
        100
    );
  }
  return arr;
};

export const sumArrays = (array1: number[], array2: number[]): number[] => {
  let sum: number[] = [];
  for (let i = 0; i < array1.length; i++) {
    sum.push(array1[i] + array2[i]);
  }
  return sum;
};

export const isNumeric = (str: string): boolean => {
  return /^\d+$/.test(str);
};
