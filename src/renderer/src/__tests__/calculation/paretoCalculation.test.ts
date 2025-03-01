import { paretoCalculation } from '@renderer/pages/pareto/paretoCalculation';

describe('economicCalculation', () => {
  let result: ReturnType<typeof paretoCalculation>;
  const data = [[5], [1], [9]];

  const items = ['Chyba 1', 'Chyba 2', 'Chyba 3'];

  beforeAll(() => {
    result = paretoCalculation(data, items);
  });

  it('should calculate correct causes', () => {
    expect(result.causes).toEqual(['Chyba 3', 'Chyba 1', 'Chyba 2']);
  });

  it('should calculate correct percentages', () => {
    expect(result.percentages).toEqual([60, 33.33, 6.67]);
  });

  it('should calculate correct values', () => {
    expect(result.values).toEqual([9, 5, 1]);
  });

  it('should calculate correct percentagesKumul', () => {
    expect(result.percentagesKumul).toEqual([60, 93.33, 100]);
  });

  it('should calculate correct valuesKumul', () => {
    expect(result.valuesKumul).toEqual([9, 14, 15]);
  });

  it('should calculate correct sum', () => {
    expect(result.sum).toEqual(15);
  });
});
