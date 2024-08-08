import React, { useMemo } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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

type LineData = {
  name: string;
  values: number[];
};

type Props = {
  height: number;
  title: string;
  data: LineData[];
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
        <LineChart height={250} data={finalData} margin={{ top: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke={primaryTextColor} />
          <YAxis stroke={primaryTextColor} />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />

          {data.map((d, index) => (
            <Line
              key={d.name}
              type="monotone"
              dataKey={d.name}
              stroke={graphColors[index]}
              strokeWidth={3}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </GraphCard>
  );
};

export default LineGraph;
