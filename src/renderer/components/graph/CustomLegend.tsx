import { styled, Typography } from '@mui/material';
import React from 'react';
import { Legend, LegendProps } from 'recharts';

const List = styled('ul')`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 8px;
`;

const Item = styled('li')`
  text-align: center;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Dot = styled('div')`
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

const Text = styled(Typography)`
  font-size: 12px;
  margin: 0;
`;

const CustomLegend: React.FC<LegendProps> = (props) => {
  const { payload } = props;

  return (
    <List>
      {payload.map((entry, index) => {
        const formattedValue = entry.value.replace(/_(\d+)/g, '<sub>$1</sub>');
        return (
          <Item key={`item-${index}`}>
            <Dot style={{ backgroundColor: entry.color }} />
            <Text dangerouslySetInnerHTML={{ __html: formattedValue }} />
          </Item>
        );
      })}
    </List>
  );
};

export default CustomLegend;
