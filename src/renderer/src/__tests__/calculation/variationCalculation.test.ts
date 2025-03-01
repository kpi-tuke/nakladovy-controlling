import { variationCalculation } from '@renderer/pages/variation/variationCalculation';

describe('economicCalculation', () => {
  let result: ReturnType<typeof variationCalculation>;
  const data = [
    [6, 5],
    [7, 3],
  ];

  beforeAll(() => {
    result = variationCalculation(data);
  });

  it('should calculate correct absolutnaDiferencia', () => {
    expect(result.absolutnaDiferencia).toEqual([-1, -4]);
  });

  it('should calculate correct plneniePlanu', () => {
    expect(result.plneniePlanu).toEqual([83, 43]);
  });
});
