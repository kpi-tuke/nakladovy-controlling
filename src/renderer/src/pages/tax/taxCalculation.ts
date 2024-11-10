import { formatNumber } from '@renderer/utils/formatNumber';

export const taxCalculation = (
  data: number[][],
  tax: number,
  vynosy: number,
) => {
  const uznaneNaklady: number[] = [];
  const neuznaneNaklady: number[] = [];

  data.forEach((rowData, idx) => {
    uznaneNaklady[idx] = formatNumber(rowData[0]);

    neuznaneNaklady[idx] = formatNumber(rowData[1]);
  });

  const uznaneNakladySum = uznaneNaklady.reduce((a, b) => a + b, 0);

  const neuznaneNakladySum = neuznaneNaklady.reduce((a, b) => a + b, 0);

  const nakladyCelkove = uznaneNakladySum + neuznaneNakladySum;

  const vysledokHospodareniaUctovny = vynosy - nakladyCelkove;

  const vysledokHospodareniaDanovy = vynosy - uznaneNakladySum;

  const rozdielVysledkuHodpodarenia =
    vysledokHospodareniaUctovny - vysledokHospodareniaDanovy;

  const danovaPovinnost = (vysledokHospodareniaDanovy * tax) / 100;

  return {
    uznaneNakladySum,
    neuznaneNakladySum,
    nakladyCelkove,
    vysledokHospodareniaUctovny,
    vysledokHospodareniaDanovy,
    rozdielVysledkuHodpodarenia,
    danovaPovinnost,
  };
};
