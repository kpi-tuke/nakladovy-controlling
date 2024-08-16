const graphColors = [
  '#02b2af',
  '#72ccff',
  '#da01fe',
  '#9001cb',
  '#ffa501',
  '#ff6f00',
  '#00c853',
  '#6200ea',
  '#ff1744',
  '#00b8d4',
];

export function getColorByIndex(index: number): string {
  const colorIndex = index % graphColors.length;
  return graphColors[colorIndex];
}
