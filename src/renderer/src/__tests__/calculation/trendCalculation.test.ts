import { trendCalculation } from '@renderer/pages/trend/trendCalculation';

describe('economicCalculation', () => {
  let result: ReturnType<typeof trendCalculation>;
  const data = [
    [5, 7, 5],
    [9, 2, 6],
  ];

  const headers = ['2000', '2001', '2002'];

  const values = [
    {
      id: '1',
      value: '501',
    },
    {
      id: '2',
      value: '601',
    },
    {
      id: '3',
      value: '',
    },
  ];

  beforeAll(() => {
    result = trendCalculation(data, headers, values);
  });

  it('should calculate correct costData', () => {
    expect(result.costData).toEqual([5, 7, 5]);
  });

  it('should calculate correct incomeData', () => {
    expect(result.incomeData).toEqual([9, 2, 6]);
  });

  it('should calculate correct betweenYears', () => {
    expect(result.betweenYears).toEqual(['2001/2000', '2002/2001']);
  });

  it('should calculate correct absolutnyPrirastok', () => {
    expect(result.absolutnyPrirastok).toEqual([
      [2, -2],
      [-7, 4],
    ]);
  });

  it('should calculate correct koeficientRastu', () => {
    expect(result.koeficientRastu).toEqual([
      [1.4, 0.71],
      [0.22, 3],
    ]);
  });

  it('should calculate correct tempoRastu', () => {
    expect(result.tempoRastu).toEqual([
      [140, 71],
      [22, 300],
    ]);
  });

  it('should calculate correct koeficientPrirastku', () => {
    expect(result.koeficientPrirastku).toEqual([
      [0.4, -0.29],
      [-0.78, 2],
    ]);
  });

  it('should calculate correct tempoPrirastku', () => {
    expect(result.tempoPrirastku).toEqual([
      [40, -29],
      [-78, 200],
    ]);
  });
});
