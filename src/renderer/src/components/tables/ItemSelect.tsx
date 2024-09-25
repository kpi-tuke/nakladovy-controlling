import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootSelectors } from '../../store/store';
import {
  Table,
  TableBody,
  TableCell,
  TableCorner,
  TableHead,
  TableRow,
} from './Table';
import { Autocomplete, styled, TextField } from '@mui/material';
import TableInput from './TableInput';
import TableActionButton from './TableActionButton';
import { ADD_CUSTOM_ITEM_LABEL } from '@renderer/chartOfAccounts';
import React from 'react';
import { ItemSelectOption } from '@renderer/store/rootReducer';

const AddCell = styled(TableCell)`
  position: relative;
  height: 28px;
`;

type ItemSelectProps = {
  selectors: RootSelectors;
  actions: any;
};

const ItemSelect: React.FC<ItemSelectProps> = ({ selectors, actions }) => {
  const corner = useAppSelector(selectors.corner);
  const items = useAppSelector(selectors.items);
  const values = useAppSelector(selectors.values);

  const dispatch = useAppDispatch();

  const addRow = () => {
    dispatch(actions.addRow());
  };

  const disableAddRow = items.some((item) => !item);

  return (
    <Table
      sx={{
        width: '100%',
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <TableHead>
        <TableRow>
          <TableCorner>{corner}</TableCorner>
        </TableRow>
      </TableHead>
      <TableBody>
        {values.map((value, index) => {
          return (
            <Row
              key={value.id}
              selectors={selectors}
              actions={actions}
              index={index}
            />
          );
        })}

        <TableRow>
          <AddCell colSpan={2}>
            <TableActionButton
              buttonType="add"
              onClick={addRow}
              disabled={disableAddRow}
            />
          </AddCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ItemSelect;

type RowProps = {
  selectors: RootSelectors;
  actions: any;
  index: number;
};

const Row: React.FC<RowProps> = React.memo(({ selectors, actions, index }) => {
  const dispatch = useAppDispatch();

  const itemSelectOptions = useAppSelector(selectors.itemSelectOptions);
  const items = useAppSelector(selectors.items);
  const value = useAppSelector(selectors.selectValueByIndex(index));

  const handleAutocompleteChange = (newValue: ItemSelectOption | null) => {
    if (!newValue) return;

    const savedValue =
      newValue.label === ADD_CUSTOM_ITEM_LABEL ? '' : newValue.label;

    dispatch(actions.setItemsOnIndex({ data: savedValue, index }));

    dispatch(
      actions.setValuesOnIndex({
        index,
        data: {
          value: newValue.value.toString(),
          id: value.id,
        },
      }),
    );

    if (!items.includes(newValue.label) && index === items.length - 1) {
      dispatch(actions.addRow());
    }
  };

  const handleInputChange = (value: string) => {
    dispatch(actions.setItemsOnIndex({ data: value, index }));
  };

  return (
    <TableRow>
      <TableCell>
        {value.value != '-1' ? (
          <Autocomplete
            value={itemSelectOptions.find(
              (option) => option.value.toString() == value.value,
            )}
            options={itemSelectOptions}
            groupBy={(option) => option.type}
            getOptionLabel={(option) => option.label}
            getOptionDisabled={(option) =>
              items.includes(option.label) &&
              option.label !== ADD_CUSTOM_ITEM_LABEL
            }
            renderInput={(params) => <TextField {...params} />}
            clearIcon={null}
            onChange={(_, value) => {
              handleAutocompleteChange(value);
            }}
            sx={{
              position: 'absolute',
              inset: 0,

              '.MuiOutlinedInput-root': {
                borderRadius: '0',
                height: '48px',
                paddingRight: '36px !important',

                fieldset: {
                  border: 'none',
                  height: '48px',
                },
              },

              input: {
                height: `${48 - 18}px !important`,
                padding: '0px !important',
              },
            }}
          />
        ) : (
          <TableInput
            placeholder="Zadajte názov položky..."
            inputTextAlign="left"
            defaultValue={items[index]}
            onBlur={(e) => handleInputChange(e.target.value)}
          />
        )}
      </TableCell>
    </TableRow>
  );
});
