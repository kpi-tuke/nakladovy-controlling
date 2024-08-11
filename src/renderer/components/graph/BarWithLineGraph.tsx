import React, { useEffect, useMemo, useState } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { GraphCard } from './GraphCard';
import { GraphTitle } from './GraphTitle';
import CustomLegend from './CustomLegend';
import CustomTooltip from './CustomTooltip';
import CustomYAxisLabel from './CustomYAxisLabel';
import { useTheme } from '@mui/material';
import { getColorByIndex } from './colors';

type ItemData = {
  name: string;
  values: number[];
};

type Props = {
  height: number;
  title: string;
  barData: ItemData[];
  lineData: ItemData[];
  labels: string[];
  barLabelSize?: number;
  showLegend?: boolean;
  yAxisLabelLeft?: string;
  yAxisLabelRight?: string;
  showValueInBar?: boolean;
};

const BarWithLineGraph: React.FC<Props> = ({
  height,
  title,
  labels,
  barData,
  lineData,
  barLabelSize = 14,
  showLegend = true,
  yAxisLabelLeft,
  yAxisLabelRight,
  showValueInBar = true,
}) => {
  const {
    palette: {
      text: { primary: primaryTextColor },
    },
  } = useTheme();

  const [yDomain, setYDomain] = useState([0, 100]);

  useEffect(() => {
    const maxBarValue = Math.max(...barData.flatMap((d) => d.values));

    const minLineValue = Math.min(...lineData.flatMap((l) => l.values));

    const yDomain = [
      0,
      Math.floor(+((maxBarValue / minLineValue) * 100).toFixed(2)),
    ];

    setYDomain(yDomain);
  }, [barData, lineData, labels]);

  const finalData = useMemo(() => {
    return labels.map((label, index) => {
      const res = {
        name: label,
      };

      barData.forEach((d) => {
        res[d.name] = d.values[index];
      });

      lineData.forEach((l) => {
        res[l.name] = l.values[index];
      });

      return res;
    });
  }, [labels, barData, lineData]);

  return (
    <GraphCard>
      <GraphTitle>{title}</GraphTitle>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart height={height} data={finalData}>
          <XAxis
            dataKey="name"
            stroke={primaryTextColor}
            fontSize={barLabelSize}
            fontWeight={'bold'}
          />

          <YAxis
            yAxisId="left"
            orientation="left"
            stroke={primaryTextColor}
            domain={yDomain}
            label={
              yAxisLabelLeft ? (
                <CustomYAxisLabel
                  value={yAxisLabelLeft}
                  angle={-90}
                  position="insideBottom"
                />
              ) : undefined
            }
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            stroke={primaryTextColor}
            domain={[0, 100]}
            label={
              yAxisLabelRight ? (
                <CustomYAxisLabel
                  value={yAxisLabelRight}
                  angle={90}
                  position="insideBottom"
                />
              ) : undefined
            }
          />

          <Tooltip content={<CustomTooltip />} />

          {showLegend && <Legend content={<CustomLegend />} />}

          {barData.map((d, index) => (
            <Bar yAxisId="left" dataKey={d.name} fill={getColorByIndex(index)}>
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

          {lineData.map((l, index) => (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey={l.name}
              stroke={getColorByIndex(index + 2)}
              strokeWidth={3}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </GraphCard>
  );
};

export default BarWithLineGraph;
