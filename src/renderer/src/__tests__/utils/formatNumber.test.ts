import { formatNumber } from '@renderer/utils/formatNumber';

describe('formatNumber', () => {
  it('should return 0 for falsy values', () => {
    expect(formatNumber(undefined)).toBe(0);
    expect(formatNumber(null)).toBe(0);
    expect(formatNumber('')).toBe(0);
    expect(formatNumber(0)).toBe(0);
    expect(formatNumber(false)).toBe(0);
  });

  it('should correctly format string inputs representing numbers >= 0.01', () => {
    expect(formatNumber('123.456')).toBe(123.46);
    expect(formatNumber('0.01')).toBe(0.01);
    expect(formatNumber('0')).toBe(0);
  });

  it('should correctly format numeric inputs >= 0.01', () => {
    expect(formatNumber(123.456)).toBe(123.46);
    expect(formatNumber(0.015)).toBe(0.01);
    expect(formatNumber(0.01)).toBe(0.01);
  });

  it('should format numbers < 0.01 with 4 decimal places', () => {
    expect(formatNumber(0.005)).toBe(0.005);
    expect(formatNumber(0.009)).toBe(0.009);
  });

  it('should correctly format negative numbers', () => {
    expect(formatNumber(-123.456)).toBe(-123.456);
    expect(formatNumber(-0.005)).toBe(-0.005);
  });
});
