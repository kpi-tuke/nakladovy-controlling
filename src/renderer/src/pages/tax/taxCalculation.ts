import { formatNumber } from '@renderer/utils/formatNumber';

export const taxCalculation = (data: number[][], tax: number) => {
  const uznaneNaklady: number[] = [];
  const neuznaneNaklady: number[] = [];
  const vynosy: number[] = [];

  data.forEach((rowData, idx) => {
    uznaneNaklady[idx] = formatNumber(rowData[0]);

    neuznaneNaklady[idx] = formatNumber(rowData[1]);

    vynosy[idx] = formatNumber(rowData[2]);
  });

  const uznaneNakladySum = uznaneNaklady.reduce((a, b) => a + b, 0);

  const neuznaneNakladySum = neuznaneNaklady.reduce((a, b) => a + b, 0);

  const vynosySum = vynosy.reduce((a, b) => a + b, 0);

  const nakladyCelkove = uznaneNakladySum + neuznaneNakladySum;

  const vysledokHospodareniaUctovny = vynosySum - nakladyCelkove;

  const vysledokHospodareniaDanovy = vynosySum - uznaneNakladySum;

  const rozdielVysledkuHodpodarenia =
    vysledokHospodareniaUctovny - vysledokHospodareniaDanovy;

  const danovaPovinnost = (vysledokHospodareniaDanovy * tax) / 100;

  return {
    uznaneNakladySum,
    neuznaneNakladySum,
    vynosySum,
    nakladyCelkove,
    vysledokHospodareniaUctovny,
    vysledokHospodareniaDanovy,
    rozdielVysledkuHodpodarenia,
    danovaPovinnost,
  };
};
