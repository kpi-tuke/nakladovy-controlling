import { indexCalculation } from '@renderer/pages/index/indexCalculation';

describe('economicCalculation', () => {
  let result: ReturnType<typeof indexCalculation>;
  const data = [
    [6, 5, 1],
    [9, 3, 7],
  ];

  const values = [
    {
      id: '1',
      value: '501',
    },
    {
      id: '2',
      value: '666',
    },
  ];

  const headers = ['Bázický rok', '2000', '2001'];

  beforeAll(() => {
    result = indexCalculation(data, headers, values);
  });

  it('should calculate correct costSumsForYears', () => {
    expect(result.costSumsForYears).toEqual([5, 1]);
  });

  it('should calculate correct incomeSumsForYears', () => {
    expect(result.incomeSumsForYears).toEqual([3, 7]);
  });

  it('should calculate correct bazickyIndex', () => {
    expect(result.bazickyIndex).toEqual([
      [0.83, 0.17],
      [0.33, 0.78],
    ]);
  });

  it('should calculate correct absolutnaDiferencia', () => {
    expect(result.absolutnaDiferencia).toEqual([
      [-1, -5],
      [-6, -2],
    ]);
  });

  it('should calculate correct percentoZmenyNakladov', () => {
    expect(result.percentoZmenyNakladov).toEqual([-80]);
  });

  it('should calculate correct percentoZmenyVynosov', () => {
    expect(result.percentoZmenyVynosov).toEqual([133]);
  });

  it('should calculate correct koeficientReakcie', () => {
    expect(result.koeficientReakcie).toEqual([-0.6015]);
  });

  it('should calculate correct retazovyIndexNakladov', () => {
    expect(result.retazovyIndexNakladov).toEqual([[0.2], [2.33]]);
  });

  it('should calculate correct absolutnaDiferenciaNakladov', () => {
    expect(result.absolutnaDiferenciaNakladov).toEqual([[-4], [4]]);
  });

  it('should calculate correct betweenYears', () => {
    expect(result.betweenYears).toEqual(['2000/2001']);
  });
});
