export const formatNumber = (value: any): number => {
  return +(typeof value === 'string' ? parseFloat(value) : value).toFixed(2);
};
