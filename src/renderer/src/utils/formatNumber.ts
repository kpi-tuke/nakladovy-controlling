export const formatNumber = (value: any): number => {
  if (!value) return 0;

  return +(typeof value === 'string' ? parseFloat(value) : value).toFixed(3);
};
