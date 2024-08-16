import { useTheme } from '@mui/material';
import React from 'react';
import { Text } from 'recharts';

interface YAxisLabelProps {
  value: string;
  angle?: number;
  position?:
    | 'insideLeft'
    | 'insideRight'
    | 'insideTop'
    | 'insideBottom'
    | 'outsideLeft'
    | 'outsideRight'
    | 'outsideTop'
    | 'outsideBottom';
}

const CustomYAxisLabel: React.FC<YAxisLabelProps> = ({
  value,
  angle = -90,
  position = 'insideLeft',
  ...props
}) => {
  const theme = useTheme();

  return (
    <Text
      x={0}
      y={0}
      dx={-180}
      dy={10}
      textAnchor="middle"
      transform={`rotate(${angle})`}
      fontSize={12}
      fontWeight={'bold'}
      fill={theme.palette.text.primary}
    >
      {value}
    </Text>
  );
};

export default CustomYAxisLabel;
