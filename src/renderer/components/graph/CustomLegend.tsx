import { styled } from '@mui/material';
import React from 'react';
import { LegendProps } from 'recharts';

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
`;

const CustomLegend: React.FC<LegendProps> = (props) => {
  const { payload } = props;

  return (
    <List>
      {payload.map((entry, index) => {
        const formattedValue = entry.value.replace(/_(\d+)/g, '<sub>$1</sub>');
        return (
          <Item key={`item-${index}`} style={{ color: entry.color }}>
            <span dangerouslySetInnerHTML={{ __html: formattedValue }} />
          </Item>
        );
      })}
    </List>
  );
};

export default CustomLegend;
