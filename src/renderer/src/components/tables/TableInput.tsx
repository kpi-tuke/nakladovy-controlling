import { TextField, TextFieldProps } from '@mui/material';
import React, { forwardRef } from 'react';

type Props = TextFieldProps & {
  bold?: boolean;
  inputTextAlign?: 'center' | 'left' | 'right';
  ref: any;
};

const TableInput: React.FC<Props> = forwardRef(
  ({ bold, inputTextAlign = 'center', ...props }, ref) => {
    return (
      <TextField
        {...props}
        inputProps={{
          ref: ref,
        }}
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
  },
);

export default TableInput;
