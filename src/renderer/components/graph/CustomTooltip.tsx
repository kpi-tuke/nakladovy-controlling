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
`;

const List = styled('ul')`
  display: flex;
  flex-direction: column;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
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
              <li key={`item-${index}`} style={{ color: entry.color }}>
                <span dangerouslySetInnerHTML={{ __html: formattedValue }} />:{' '}
                {entry.value}
              </li>
            );
          })}
        </List>
      </Wrapper>
    );
  }

  return null;
};

export default CustomTooltip;
