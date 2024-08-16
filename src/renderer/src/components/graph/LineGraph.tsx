import React, { useMemo } from 'react';
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { GraphCard } from './GraphCard';
import { GraphTitle } from './GraphTitle';
import { getColorByIndex } from './colors';
import CustomLegend from './CustomLegend';
import CustomTooltip from './CustomTooltip';
import { useTheme } from '@mui/material';
import CustomLabel from './CustomReferenceLineLabel';
import CustomYAxisLabel from './CustomYAxisLabel';

type LineData = {
  name: string;
  values: (number | string)[];
};

type ReferenceLine = {
  x: string;
  stroke: string;
  label: string;
  width?: number;
};

type Props = {
  height: number;
  title: string;
  data: LineData[];
  labels: string[];
  referenceLines?: ReferenceLine[];
  yAxisLabel?: string;
  xAxisLabel?: string;
};

const LineGraph: React.FC<Props> = ({
  height,
  title,
  data,
  labels,
  referenceLines = [],
  yAxisLabel,
  xAxisLabel,
}) => {
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
        <LineChart
          height={250}
          data={finalData}
          margin={{ top: 20, right: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            stroke={primaryTextColor}
            label={
              xAxisLabel
                ? {
                    value: xAxisLabel,
                    position: 'insideBottom',
                    offset: 0,
                    fontSize: 12,
                    fill: primaryTextColor,
                    fontWeight: 'bold',
                  }
                : undefined
            }
            fontWeight={'bold'}
          />
          <YAxis
            stroke={primaryTextColor}
            label={
              yAxisLabel ? (
                <CustomYAxisLabel
                  value={yAxisLabel}
                  angle={-90}
                  position="insideBottom"
                />
              ) : undefined
            }
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />

          {data.map((d, index) => (
            <Line
              key={d.name}
              type="monotone"
              dataKey={d.name}
              stroke={getColorByIndex(index)}
              strokeWidth={3}
            />
          ))}

          {referenceLines.map((line, index) => (
            <ReferenceLine x={line.x} stroke={line.stroke} key={index}>
              <Label
                content={<CustomLabel customWidth={line.width} />}
                fill={line.stroke}
                value={line.label}
              />
            </ReferenceLine>
          ))}
        </LineChart>
      </ResponsiveContainer>
    </GraphCard>
  );
};

export default LineGraph;
