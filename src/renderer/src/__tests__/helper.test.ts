import {
  divideArrays,
  isNumeric,
  multiplyArrays,
  splitTable,
  subtractArrays,
  sumArrays,
  transposeMatrix,
} from '@renderer/helper';

describe('splitTable', () => {
  it('should split table into separate tables based on colsPerTable', () => {
    const header = ['A', 'B', 'C'];
    const data = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const colsPerTable = 2;

    const result = splitTable(colsPerTable, header, data);
    const expectedSeparatedHeaders = [['A', 'B'], ['C']];
    const expectedSeparatedData = [
      [
        [1, 2],
        [4, 5],
        [7, 8],
      ],
      [[3], [6], [9]],
    ];

    expect(result.separatedHeaders).toEqual(expectedSeparatedHeaders);
    expect(result.separatedData).toEqual(expectedSeparatedData);
  });
});

describe('divideArrays', () => {
  it('should divide corresponding elements and handle zeros', () => {
    const numerator = [10, 20, 0];
    const denominator = [2, 5, 0];
    // Expected:
    // 10/2 = 5, 20/5 = 4, when denominator is 0 => 0
    const result = divideArrays(numerator, denominator);
    const expected = [5, 4, 0];
    expect(result).toEqual(expected);
  });
});

describe('multiplyArrays', () => {
  it('should multiply corresponding elements of two arrays', () => {
    const array1 = [2, 3];
    const array2 = [4, 5];
    const result = multiplyArrays(array1, array2);
    const expected = [8, 15];
    expect(result).toEqual(expected);
  });
});

describe('subtractArrays', () => {
  it('should subtract corresponding elements and round to two decimals', () => {
    const minuend = [10, 20, 30];
    const subtrahend = [1, 2, 3];
    const result = subtractArrays(minuend, subtrahend);
    const expected = [9, 18, 27];
    expect(result).toEqual(expected);
  });
});

describe('sumArrays', () => {
  it('should sum corresponding elements of two arrays', () => {
    const array1 = [1, 2, 3];
    const array2 = [4, 5, 6];
    const result = sumArrays(array1, array2);
    const expected = [5, 7, 9];
    expect(result).toEqual(expected);
  });
});

describe('isNumeric', () => {
  it('should return true for strings containing only digits', () => {
    expect(isNumeric('123')).toBe(true);
    expect(isNumeric('0')).toBe(true);
    expect(isNumeric('00123')).toBe(true);
  });

  it('should return false for strings that are not purely numeric', () => {
    expect(isNumeric('123a')).toBe(false);
    expect(isNumeric('12.3')).toBe(false);
    expect(isNumeric('abc')).toBe(false);
    expect(isNumeric('')).toBe(false);
  });
});

describe('transposeMatrix', () => {
  it('should correctly transpose a given matrix', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const result = transposeMatrix(matrix);
    const expected = [
      [1, 4],
      [2, 5],
      [3, 6],
    ];
    expect(result).toEqual(expected);
  });
});
