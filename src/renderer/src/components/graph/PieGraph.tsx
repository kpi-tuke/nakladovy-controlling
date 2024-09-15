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
import { useTheme } from '@mui/material';

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
  const {
    palette: {
      text: { primary: primaryTextColor },
    },
  } = useTheme();

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={primaryTextColor}
        fontWeight={'bold'}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
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
