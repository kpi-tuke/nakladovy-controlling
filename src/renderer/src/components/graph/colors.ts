const graphColors = [
  '#2b56ff', // Blue
  '#fa7f05', // Orange
  '#2ca02c', // Green
  '#fa0505', // Red
  '#a005fa', // Purple
  '#8c564b', // Brown
  '#e377c2', // Pink
  '#7f7f7f', // Gray
  '#fae505', // Yellow
  '#00ffdd', // Cyan
];

export function getColorByIndex(index: number): string {
  const colorIndex = index % graphColors.length;
  return graphColors[colorIndex];
}
