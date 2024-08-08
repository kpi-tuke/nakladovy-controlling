import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { GraphCard } from './GraphCard';
import { GraphTitle } from './GraphTitle';
import { graphColors } from './colors';
import CustomLegend from './CustomLegend';
import CustomTooltip from './CustomTooltip';
import { useTheme } from '@mui/material';

type BarData = {
  name: string;
  values: number[];
};

type Props = {
  height: number;
  title: string;
  data: BarData[];
  labels: string[];
};

const LineGraph: React.FC<Props> = ({ height, title, data, labels }) => {
  const {
    palette: {
      text: { primary: primaryTextColor },
    },
  } = useTheme();

  const finalData = useMemo(() => {
    return labels.map((label, index) => {
      const res = {
        name: label,
      };

      data.forEach((d) => {
        res[d.name] = d.values[index];
      });

      return res;
    });
  }, [data, labels]);

  return (
    <GraphCard>
      <GraphTitle>{title}</GraphTitle>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart height={250} data={finalData} margin={{ top: 20, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke={primaryTextColor} />
          <YAxis stroke={primaryTextColor} />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />

          {data.map((d, index) => (
            <Bar dataKey={d.name} fill={graphColors[index]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </GraphCard>
  );
};

export default LineGraph;
