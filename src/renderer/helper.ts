// [ [1,2,3], [4,5,6], [7,8,9] ] => [ [ [1,2],[4,5],[7,8] ], [ [3],[6],[9] ] ]
export function splitTable(
  colsPerTable: number,
  header: string[],
  data: number[][]
) {
  let numberOfTables = Math.ceil(data[0].length / colsPerTable);
  let separatedData: number[][][] = [];
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

export function sortTable(headers: string[], data: number[][], offset: number) {
  if (new Set(headers).size !== headers.length)
    return { newHeaders: headers, newData: data };
  let tableCols: Map<string, number[]> = new Map<string, number[]>();
  let wrongCols: Map<string, number[]> = new Map<string, number[]>();
  for (let i = offset; i < headers.length; i++) {
    if (isNaN(parseInt(headers[i]))) {
      let col: number[] = data.map((value) => value[i]);
      wrongCols.set(headers[i], col);
    } else {
      let col: number[] = data.map((value) => value[i]);
      tableCols.set(headers[i], col);
    }
  }
  let map: Map<string, number[]> = new Map(
    [...tableCols.entries()].sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
  );

  for (const [key, value] of wrongCols.entries()) {
    map.set(key, value);
  }

  let newHeaders: string[] = [];
  let newData: number[][] = [];
  for (let i = 0; i < offset; i++) {
    newHeaders.push(headers[i]);
  }
  for (let row = 0; row < data.length; row++) {
    let col = offset;
    newData.push([]);

    for (let i = 0; i < offset; i++) {
      newData[row][i] = data[row][i];
    }

    for (const [key, value] of map.entries()) {
      newHeaders[col] = key;
      newData[row][col] = value[row];
      col++;
    }
  }
  return { newHeaders, newData };
}

export type SortDirection = 'asc' | 'desc';

export const sortTableByYear = (
  headers: string[],
  data: number[][],
  sortDirection: SortDirection
) => {
  if (new Set(headers).size !== headers.length) return { headers, data };

  for (const header of headers) {
    if (!isNumeric(header)) {
      throw new Error('Hlavička musí byť číslo!');
    }
  }

  const formattedData: { [key: string]: number[] } = {};

  headers.forEach((header, index) => {
    formattedData[header] = [];
    formattedData[header] = data.map((row) => row[index]);
  });

  const sortedHeaders =
    sortDirection === 'asc'
      ? [...headers].sort((a, b) => +b - +a)
      : [...headers].sort((a, b) => +a - +b);

  const sortedData: number[][] = Array.from({ length: data.length }, () => []);

  for (let i = 0; i < sortedHeaders.length; i++) {
    for (let j = 0; j < formattedData[sortedHeaders[i]].length; j++) {
      sortedData[j].push(formattedData[sortedHeaders[i]][j]);
    }
  }

  return { headers: sortedHeaders, data: sortedData };
};

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

function isNumeric(str: string): boolean {
  return /\d/.test(str);
}
