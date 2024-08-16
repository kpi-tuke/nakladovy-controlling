import { MenuItem, Select, SelectProps } from '@mui/material';
import React from 'react';

type Props = SelectProps & {
  options: string[];
};

const TableSelect: React.FC<Props> = ({ options, ...props }) => {
  return (
    <Select
      {...props}
      sx={{
        position: 'absolute',
        inset: 0,
        borderRadius: 0,
        border: 'none',

        '.MuiOutlinedInput-root': {
          borderRadius: '0',
        },

        fieldset: {
          border: 'none',
        },

        input: {
          height: '48px',
          padding: 0,
          fontWeight: 'bold',
          textAlign: 'center',
          border: 'none',
        },
      }}
    >
      {options.map((option: string, idx: number) => (
        <MenuItem key={idx} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};

export default TableSelect;
