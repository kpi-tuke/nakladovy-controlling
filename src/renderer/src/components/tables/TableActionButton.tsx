import { Add, Remove } from '@mui/icons-material';
import { Button, styled } from '@mui/material';
import React from 'react';

const ButtonStyled = styled(Button)<{ $type: 'add' | 'delete' }>`
  background-color: ${({ theme, $type }) =>
    theme.palette.mode === 'light'
      ? '#fff'
      : $type === 'add'
        ? theme.palette.success.main
        : theme.palette.error.main};
  padding: 0;
  position: absolute;
  inset: 0;
  min-width: unset;
  width: 100%;
  border-radius: 0;
  color: ${({ theme, $type }) =>
    theme.palette.mode === 'dark'
      ? '#fff'
      : $type === 'add'
        ? theme.palette.success.main
        : theme.palette.error.main};

  &:hover {
    background-color: ${({ theme, $type }) =>
      $type === 'add' ? theme.palette.success.main : theme.palette.error.main};
    color: #fff;
  }
`;

interface Props {
  buttonType: 'add' | 'delete';
  onClick: VoidFunction;
  disabled?: boolean;
}

const TableActionButton: React.FC<Props> = ({ buttonType, ...props }) => {
  return (
    <ButtonStyled {...props} $type={buttonType}>
      {buttonType === 'add' ? <Add /> : <Remove />}
    </ButtonStyled>
  );
};

export default TableActionButton;
