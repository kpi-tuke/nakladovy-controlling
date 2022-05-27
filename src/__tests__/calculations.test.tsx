import {economicCalculation} from "../renderer/pages/economic/economicCalculation";
import {structureCalculation} from "../renderer/pages/structure/structureCalculation";
import {sortimentCalculation} from "../renderer/pages/sortiment/sortimentCalculation";
import {cvpCalculation} from "../renderer/pages/cvp/cvpCalculation";
import {indexCalculation} from "../renderer/pages/index/indexCalculation";
import {paretoCalculation} from "../renderer/pages/pareto/paretoCalculation";

test('economicCalculation test1', () => {
  expect(
    economicCalculation(
      [
        [1307569, 1442146],
        [1356220, 1563250],
        [5601048, 6317942],
      ],
      ['501', '502', '602']
    )
  ).toEqual({
    costData: [2663789, 3005396],
    incomeData: [5601048, 6317942],
    profitData: [2937259, 3312546],
    incomeProfitabilityData: [0.52, 0.52],
    costProfitabilityData: [1.1, 1.1],
    costEfficiencyData: [2.1, 2.1],
    costIndicatorData: [0.48, 0.48],
  });
});

test('economicCalculation test2', () => {
  expect(
    economicCalculation(
      [
        [68145, 78436, 52898, 49008],
        [58625, 63625, 50516, 48400],
      ],
      ['601', '501']
    )
  ).toEqual({
    costData: [58625, 63625, 50516, 48400],
    incomeData: [68145, 78436, 52898, 49008],
    profitData: [9520, 14811, 2382, 608],
    incomeProfitabilityData: [0.14, 0.19, 0.05, 0.01],
    costProfitabilityData: [0.16, 0.23, 0.05, 0.01],
    costEfficiencyData: [1.16, 1.23, 1.05, 1.01],
    costIndicatorData: [0.86, 0.81, 0.95, 0.99],
  });
});

test('structureCalculation test', () => {
  expect(
    structureCalculation([
      [584, 0, 52, 6],
      [0, 0, 60, 10],
      [0, 45, 42, 29],
      [0, 17, 16, 11],
      [0, 0, 40, 10],
      [0, 0, 10, 68],
    ])
  ).toEqual({
    rowSums: [642, 70, 116, 44, 50, 78],
    colSums: [584, 62, 220, 134],
    totalCost: 1000,
  });
});

test('indexCalculation test', () => {
  expect(
    indexCalculation(
      [
        [1307569, 1356220, 1442146],
        [0, 5601048, 6317942],
      ],
      ['Bázický rok', '2000', '2001'],
      ['501', '601']
    )
  ).toEqual({
    newHeaders: ['2000', '2001'],
    costSumsForYears: [1356220, 1442146],
    incomeSumsForYears: [5601048, 6317942],
    costSumBase: 1307569,
    chainIndexes: [1.06],
    baseIndexes: [1.04, 1.1],
    costDiff: [6.34],
    incomeDiff: [12.8],
    reaction: [0.5],
    betweenYears: ['2000/2001'],
  });
});

test('CVPCalculation test1', () => {
  expect(
    cvpCalculation(
      [
        [8600, 8, 5.6],
        [5300, 15, 6.8],
      ],
      150870,
      54000
    )
  ).toEqual({
    volumes: [8600, 5300],
    prices: [8, 15],
    costs: [5.6, 6.8],
    fixTotal: 150870,
    minProfit: 54000,
    zeroEur: [502900, 274309.09],
    zeroTon: [62862.5, 18398.78],
    zeroProf: [85362.5, 24984.15],
  });
});

test('CVPCalculation test2', () => {
  expect(
    cvpCalculation(
      [
        [20, 10, 7],
        [30, 5, 3],
      ],
      50,
      200
    )
  ).toEqual({
    volumes: [20, 30],
    prices: [10, 5],
    costs: [7, 3],
    fixTotal: 50,
    minProfit: 200,
    zeroEur: [166.67, 125],
    zeroTon: [16.67, 25],
    zeroProf: [83.33, 125],
  });
});

test('sortimentCalculation test1', () => {
  expect(
    sortimentCalculation([
      [985, 1215],
      [1745, 1581],
      [2700, 2600],
      [8000, 4000],
    ])
  ).toEqual({
    rentCost: [0.55, 0.64],
    rentIncome: [0.35, 0.39],
    marginProfit: [955, 1019],
    marginGross: [1715, 1385],
    allowance: [0.64, 0.53],
    profit: [11460000, 12228000],
  });
});

test('sortimentCalculation test2', () => {
  expect(
    sortimentCalculation([
      [39.6, 38.36, 35.27, 31.82, 29.3],
      [43.18, 41.94, 38.85, 35.4, 32.88],
      [75.24, 71.68, 64.37, 59.73, 53.09],
      [136846, 42969, 41354, 250818, 146059],
    ])
  ).toEqual({
    rentCost: [0.74, 0.71, 0.66, 0.69, 0.61],
    rentIncome: [0.43, 0.41, 0.4, 0.41, 0.38],
    marginProfit: [32.06, 29.74, 25.52, 24.33, 20.21],
    marginGross: [35.64, 33.32, 29.1, 27.91, 23.79],
    allowance: [0.47, 0.46, 0.45, 0.47, 0.45],
    profit: [19814554.76, 18380688.04, 15772533.92, 15037059.18, 12490709.66],
  });
});

test('paretoCalculation test1', () => {
  expect(
    paretoCalculation(
      [[3998], [1307], [361], [82], [104], [1573], [5]],
      [
        'Chyby mechanického trieskového opracovania',
        'Chyby tvárnenia materiálu',
        'Materiálové chyby',
        'Chyby zvárania',
        'Chyby povrchu a povrchovej úpravy',
        'Chyby kompletizácie, balenia',
        'Chyby dokumentácie',
      ]
    )
  ).toEqual({
    causes: [
      'Chyby mechanického trieskového opracovania',
      'Chyby kompletizácie, balenia',
      'Chyby tvárnenia materiálu',
      'Materiálové chyby',
      'Chyby povrchu a povrchovej úpravy',
      'Chyby zvárania',
      'Chyby dokumentácie',
    ],
    percentages: [53.81, 21.17, 17.59, 4.86, 1.4, 1.1, 0.07],
    values: [3998, 1573, 1307, 361, 104, 82, 5],
    percentagesKumul: [53.81, 74.98, 92.57, 97.43, 98.83, 99.93, 100],
    valuesKumul: [3998, 5571, 6878, 7239, 7343, 7425, 7430],
    sum: 7430,
  });
});

test('paretoCalculation test2 decimal numbers', () => {
  expect(
    paretoCalculation(
      [[9.8], [1.9]],
      [
        'Chyby mechanického trieskového opracovania',
        'Chyby tvárnenia materiálu',
      ],
    )
  ).toEqual({
    causes: [
      'Chyby mechanického trieskového opracovania',
      'Chyby tvárnenia materiálu',
    ],
    percentages: [83.76, 16.24],
    values: [9.8, 1.9],
    percentagesKumul: [83.76, 100],
    valuesKumul: [ 9.8, 11.7],
    sum: 11.7,
  });
});
