import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

type Props = TextFieldProps & {
  bold?: boolean;
  inputTextAlign?: 'center' | 'left' | 'right';
};

const TableInput: React.FC<Props> = ({
  bold,
  inputTextAlign = 'center',
  ...props
}) => {
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
          padding: '0 9px',
          fontWeight: bold ? 'bold' : 'normal',
          textAlign: inputTextAlign,
        },
      }}
    />
  );
};

export default TableInput;
