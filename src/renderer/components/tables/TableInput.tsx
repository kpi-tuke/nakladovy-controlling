import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

type Props = TextFieldProps & {
  bold?: boolean;
};

const TableInput: React.FC<Props> = ({ bold, ...props }) => {
  return (
    <TextField
      {...props}
      sx={{
        position: 'absolute',
        inset: 0,

        '& .MuiOutlinedInput-root': {
          borderRadius: '0',
          '& fieldset': {
            border: 'none',
          },
        },

        input: {
          height: '48px',
          padding: 0,
          fontWeight: bold ? 'bold' : 'normal',
          textAlign: 'center',
        },
      }}
    />
  );
};

export default TableInput;
