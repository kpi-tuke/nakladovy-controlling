export const formatNumber = (value: any): number => {
  if (!value) return 0;

  const numberValue: number =
    typeof value === 'string' ? parseFloat(value) : value;

  if (numberValue < 0.01) {
    return +numberValue.toFixed(4);
  }

  return +numberValue.toFixed(2);
};
