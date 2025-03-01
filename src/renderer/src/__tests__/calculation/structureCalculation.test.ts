import { structureCalculation } from '@renderer/pages/structure/structureCalculation';

describe('economicCalculation', () => {
  let result: ReturnType<typeof structureCalculation>;
  const data = [
    [6, 5],
    [3, 3],
    [6, 5],
  ];

  beforeAll(() => {
    result = structureCalculation(data as number[][]);
  });

  it('should calculate correct rowSums', () => {
    expect(result.rowSums).toEqual([11, 6, 11]);
  });

  it('should calculate correct colSums', () => {
    expect(result.colSums).toEqual([15, 13]);
  });

  it('should calculate correct totalCost', () => {
    expect(result.totalCost).toEqual(28);
  });
});
