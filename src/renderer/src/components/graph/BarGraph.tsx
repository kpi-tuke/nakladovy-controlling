import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
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
import CustomYAxisLabel from './CustomYAxisLabel';

type BarData = {
  name: string;
  values: number[];
};

type Props = {
  height: number;
  title: string;
  data: BarData[];
  labels: string[];
  showLegend?: boolean;
  yAxisLabel?: string;
  showValueInBar?: boolean;
  yAxisFontSize?: number;
  xAxisFontSize?: number;
};

const BarGraph: React.FC<Props> = ({
  height,
  title,
  data,
  labels,
  showLegend = true,
  yAxisLabel,
  showValueInBar = true,
  yAxisFontSize = 14,
  xAxisFontSize = 14,
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
        <BarChart height={250} data={finalData} margin={{ top: 20, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            stroke={primaryTextColor}
            fontSize={xAxisFontSize}
            fontWeight={'bold'}
          />
          <YAxis
            stroke={primaryTextColor}
            label={
              yAxisLabel ? (
                <CustomYAxisLabel value={yAxisLabel} angle={-90} />
              ) : undefined
            }
            fontSize={yAxisFontSize}
          />
          <Tooltip content={<CustomTooltip />} />
          {showLegend && <Legend content={<CustomLegend />} />}

          {data.map((d, index) => (
            <Bar dataKey={d.name} fill={getColorByIndex(index)}>
              {showValueInBar && (
                <LabelList
                  dataKey={d.name}
                  position="inside"
                  fill={primaryTextColor}
                  fontWeight={'bold'}
                />
              )}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </GraphCard>
  );
};

export default BarGraph;
