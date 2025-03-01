import { economicCalculation } from '@renderer/pages/economic/economicCalculation';

describe('economicCalculation', () => {
  let result: ReturnType<typeof economicCalculation>;
  const data = [
    ['8', '6'],
    ['2', '9'],
    ['9', '2'],
    ['4', '5'],
    ['2', '8'],
    ['9', '2'],
    ['3', '6'],
    ['6', '6'],
  ];

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
      value: '502',
      id: '3',
    },
    {
      value: '521',
      id: '28bc8300-463c-4e78-82a9-ac64c7023c1d',
    },
    {
      value: '551',
      id: 'de72fe3e-c8e1-4768-b1d9-08d5fa2980ae',
    },
    {
      value: '561',
      id: '39126661-c2c8-47bd-8bbc-1d4e10570ba2',
    },
    {
      value: '511',
      id: '056f7e41-25a4-4248-8e1c-936e263a68f6',
    },
    {
      value: '531',
      id: 'c807e7a2-553f-447f-8d6e-55afea72f178',
    },
  ];

  beforeAll(() => {
    result = economicCalculation(data, values, 2);
  });

  it('should calculate correct costData', () => {
    expect(result.costData).toEqual([41, 35]);
  });

  it('should calculate correct incomeData', () => {
    expect(result.incomeData).toEqual([2, 9]);
  });

  it('should calculate correct profitData', () => {
    expect(result.profitData).toEqual([-39, -26]);
  });

  it('should calculate correct incomeProfitabilityData', () => {
    expect(result.incomeProfitabilityData).toEqual([-19.5, -2.8889]);
  });

  it('should calculate correct costProfitabilityData', () => {
    expect(result.costProfitabilityData).toEqual([-0.9512, -0.7429]);
  });

  it('should calculate correct costEfficiencyData', () => {
    expect(result.costEfficiencyData).toEqual([0.05, 0.26]);
  });

  it('should calculate correct costIndicatorData', () => {
    expect(result.costIndicatorData).toEqual([20.5, 3.89]);
  });

  it('should calculate correct materialCostData', () => {
    expect(result.materialCostData).toEqual([4, 0.67]);
  });

  it('should calculate correct wageCostData', () => {
    expect(result.wageCostData).toEqual([2, 0.56]);
  });

  it('should calculate correct depreciationCostData', () => {
    expect(result.depreciationCostData).toEqual([1, 0.89]);
  });

  it('should calculate correct financialConstData', () => {
    expect(result.financialConstData).toEqual([4.5, 0.22]);
  });

  it('should calculate correct servicesConstData', () => {
    expect(result.servicesConstData).toEqual([1.5, 0.67]);
  });

  it('should calculate correct taxesConstData', () => {
    expect(result.taxesConstData).toEqual([3, 0.67]);
  });
});
