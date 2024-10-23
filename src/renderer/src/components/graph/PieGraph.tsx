import React from 'react';
import { GraphCard } from './GraphCard';
import { GraphTitle } from './GraphTitle';
import {
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
} from 'recharts';
import { getColorByIndex } from './colors';
import CustomLegend from './CustomLegend';

type PieData = {
  name: string;
  value: number;
};

type Props = {
  height: number;
  title: string;
  data: PieData[];
};

const PieGraph: React.FC<Props> = ({ height, title, data }) => {
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
  }) => {
    const labelRadius = outerRadius + 20;
    const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
    const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);
    const lineRadius = outerRadius + 5;
    const xLine = cx + lineRadius * Math.cos(-midAngle * RADIAN);
    const yLine = cy + lineRadius * Math.sin(-midAngle * RADIAN);

    return (
      <>
        <line
          x1={xLine}
          y1={yLine}
          x2={x}
          y2={y}
          stroke={'#000'}
          strokeWidth={1}
        />
        <text
          x={x}
          y={y}
          fill={'#000'}
          fontWeight={'bold'}
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </>
    );
  };

  return (
    <GraphCard>
      <GraphTitle>{title}</GraphTitle>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <CartesianGrid strokeDasharray="3 3" />

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            fill="#8884d8"
            dataKey="value"
            label={renderCustomizedLabel}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={getColorByIndex(index)} />
            ))}
          </Pie>
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </GraphCard>
  );
};

export default PieGraph;
