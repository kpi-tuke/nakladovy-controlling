import { cvpCalculation } from '@renderer/pages/cvp/cvpCalculation';

describe('cvpCalculation', () => {
  let result: ReturnType<typeof cvpCalculation>;
  const data = [
    ['5', 'ks', '2', '1'],
    ['10', 'kg', '3', '2'],
  ];

  const fixCosts = 25;
  const minProfit = 5;

  beforeAll(() => {
    result = cvpCalculation(data, fixCosts, minProfit);
  });

  it('should calculate correct volumes', () => {
    expect(result.volumes).toEqual([5, 10]);
  });

  it('should calculate correct prices', () => {
    expect(result.prices).toEqual([2, 3]);
  });

  it('should calculate correct costs', () => {
    expect(result.costs).toEqual([1, 2]);
  });

  it('should calculate correct fixTotals', () => {
    expect(result.fixTotals).toEqual([25, 25]);
  });

  it('should calculate correct minProfits', () => {
    expect(result.minProfits).toEqual([5, 5]);
  });

  it('should calculate correct zeroTon', () => {
    expect(result.zeroTon).toEqual([25, 25]);
  });

  it('should calculate correct zeroEur', () => {
    expect(result.zeroEur).toEqual([50, 75.76]);
  });

  it('should calculate correct zeroProf', () => {
    expect(result.zeroProf).toEqual([30, 30]);
  });

  it('should calculate correct zeroSellPrice', () => {
    expect(result.zeroSellPrice).toEqual([4.17, 2.08]);
  });

  it('should calculate correct paymentMoney', () => {
    expect(result.paymentMoney).toEqual([1, 1]);
  });

  it('should calculate correct fixedCosts', () => {
    expect(result.fixedCosts).toEqual([5, 2.5]);
  });

  it('should calculate correct capacityUsage', () => {
    expect(result.capacityUsage).toEqual([500, 250]);
  });

  it('should calculate correct totalCosts', () => {
    expect(result.totalCosts).toEqual([30, 45]);
  });

  it('should calculate correct incomeTotal', () => {
    expect(result.incomeTotal).toEqual([10, 30]);
  });

  it('should calculate correct economicResult', () => {
    expect(result.economicResult).toEqual([-20, -15]);
  });
});
