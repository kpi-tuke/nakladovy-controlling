import { Box, styled } from '@mui/material';
import React from 'react';
import { TooltipProps } from 'recharts';

const Wrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  padding: 16px;
`;

const Title = styled('p')`
  margin: 0;
  margin-bottom: 8px;
  font-weight: bold;
`;

const List = styled('ul')`
  display: flex;
  flex-direction: column;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
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

const Text = styled('p')`
  font-size: 14px;
  margin: 0;
`;

const Value = styled(Text)`
  font-weight: bold;
`;

const CustomTooltip: React.FC<TooltipProps<any, any>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <Wrapper>
        <Title>{`${label}`}</Title>
        <List>
          {payload.map((entry, index) => {
            const formattedValue = entry.name.replace(
              /_(\d+)/g,
              '<sub>$1</sub>'
            );
            return (
              <Item key={`item-${index}`}>
                <Dot style={{ backgroundColor: entry.color }} />
                <Text
                  dangerouslySetInnerHTML={{ __html: formattedValue }}
                />: <Value>{entry.value}</Value>
              </Item>
            );
          })}
        </List>
      </Wrapper>
    );
  }

  return null;
};

export default CustomTooltip;
