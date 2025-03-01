import { sortimentCalculation } from '@renderer/pages/sortiment/sortimentCalculation';

describe('economicCalculation', () => {
  let result: ReturnType<typeof sortimentCalculation>;
  const data = [
    [6, 3],
    [9, 10],
    [5, 6],
    ['ks', 'kg'],
    [80, 5],
    ['ks', 't'],
  ];

  beforeAll(() => {
    result = sortimentCalculation(data as number[][]);
  });

  it('should calculate correct rentCost', () => {
    expect(result.rentCost).toEqual([-44.44, -40]);
  });

  it('should calculate correct rentIncome', () => {
    expect(result.rentIncome).toEqual([-80, -66.67]);
  });

  it('should calculate correct marginProfit', () => {
    expect(result.marginProfit).toEqual([-80, -66.67]);
  });

  it('should calculate correct marginGross', () => {
    expect(result.marginGross).toEqual([-1, 3]);
  });

  it('should calculate correct allowance', () => {
    expect(result.allowance).toEqual([-0.2, 0.5]);
  });

  it('should calculate correct profit', () => {
    expect(result.profit).toEqual([-340, -340]);
  });

  it('should calculate correct totalDirectCosts', () => {
    expect(result.totalDirectCosts).toEqual([6, 3]);
  });

  it('should calculate correct totalIndirectCosts', () => {
    expect(result.totalIndirectCosts).toEqual([3, 7]);
  });

  it('should calculate correct unitProfit', () => {
    expect(result.unitProfit).toEqual([-4, -4]);
  });

  it('should calculate correct income', () => {
    expect(result.income).toEqual([400, 30]);
  });

  it('should calculate correct totalCosts', () => {
    expect(result.totalCosts).toEqual([720, 50]);
  });

  it('should calculate correct totalProfit', () => {
    expect(result.totalProfit).toEqual([-320, -20]);
  });
});
