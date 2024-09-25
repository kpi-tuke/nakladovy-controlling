import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootSelectors } from '../../store/store';
import {
  ActionCellBottom,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from './Table';
import TableActionButton from './TableActionButton';
import TableInput from './TableInput';

type ItemInputProps = {
  selectors: RootSelectors;
  actions: any;
};

const ItemInput: React.FC<ItemInputProps> = ({ selectors, actions }) => {
  const dispatch = useAppDispatch();

  const corner = useAppSelector(selectors.corner);
  const values = useAppSelector(selectors.values);
  const dynRows = useAppSelector(selectors.dynRows);

  const addRow = () => {
    dispatch(actions.addRow());
  };

  const disableAddRow = values.some((value) => !value.value);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{corner}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {values.map((value, index) => {
          return (
            <Input
              key={value.id}
              selectors={selectors}
              actions={actions}
              index={index}
            />
          );
        })}

        {dynRows && (
          <TableRow>
            <ActionCellBottom>
              <TableActionButton
                buttonType="add"
                onClick={addRow}
                disabled={disableAddRow}
              />
            </ActionCellBottom>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ItemInput;

type InputProps = {
  selectors: RootSelectors;
  actions: any;
  index: number;
};

const Input: React.FC<InputProps> = React.memo(
  ({ selectors, actions, index }) => {
    const dispatch = useAppDispatch();

    const value = useAppSelector(selectors.selectValueByIndex(index));

    const handleChangeInput = function (e: any) {
      dispatch(actions.setItemsOnIndex({ data: e.label || e.value, index }));
      dispatch(
        actions.setValuesOnIndex({
          index,
          data: {
            id: value.id,
            value: e.value,
          },
        }),
      );
    };

    return (
      <TableRow>
        <TableCell>
          <TableInput
            defaultValue={value.value}
            onChange={(e) => handleChangeInput(e.target)}
            inputTextAlign="left"
          />
        </TableCell>
      </TableRow>
    );
  },
);
