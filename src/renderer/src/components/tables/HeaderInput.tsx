import { RootSelectors } from '@renderer/store/store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ActionCellRight, TableCell, TableHead, TableRow } from './Table';
import TableActionButton from './TableActionButton';
import TableInput from './TableInput';
import React from 'react';

type Props = {
  selectors: RootSelectors;
  actions: any;
};

const HeaderInput: React.FC<Props> = ({ selectors, actions }) => {
  const dispatch = useAppDispatch();

  const headers = useAppSelector(selectors.headers);

  const addColumn = () => {
    dispatch(actions.addColumn());
  };

  const disableAddButton = headers.some((header) => !header.label);

  return (
    <TableHead>
      <TableRow>
        {headers.map((header, index) => (
          <Input
            key={header.id}
            actions={actions}
            index={index}
            selectors={selectors}
          />
        ))}

        <ActionCellRight $topBorder={false}>
          <TableActionButton
            buttonType="add"
            onClick={addColumn}
            disabled={disableAddButton}
          />
        </ActionCellRight>
      </TableRow>
    </TableHead>
  );
};

export default HeaderInput;

type InputProps = {
  selectors: RootSelectors;
  actions: any;
  index: number;
};

const Input: React.FC<InputProps> = React.memo(
  ({ actions, index, selectors }) => {
    const dispatch = useAppDispatch();

    const header = useAppSelector(selectors.selectHeaderByIndex(index));

    const handleChangeHeader = (value: string, index: number) => {
      dispatch(
        actions.setHeaderOnIndex({
          index,
          data: {
            id: header.id,
            value,
          },
        }),
      );
    };

    return (
      <TableCell>
        <TableInput
          defaultValue={header.label}
          onChange={(e) => handleChangeHeader(e.target.value, index)}
        />
      </TableCell>
    );
  },
);
