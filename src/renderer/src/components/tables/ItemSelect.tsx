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

const AddCell = styled(TableCell)`
  position: relative;
  height: 28px;
`;

type Option = {
  label: string;
  value: number;
  type: string;
};

const ItemSelect = React.memo(
  ({ selectors, actions }: { selectors: RootSelectors; actions: any }) => {
    const corner = useAppSelector(selectors.corner);
    const items = useAppSelector(selectors.items);
    const values = useAppSelector(selectors.values);
    const itemSelectOptions = useAppSelector(selectors.itemSelectOptions);

    const dispatch = useAppDispatch();

    const handleAutocompleteChange = (value: Option, idx: number) => {
      const savedValue =
        value.label === ADD_CUSTOM_ITEM_LABEL ? '' : value.label;

      dispatch(actions.setItemsOnIndex({ data: savedValue, index: idx }));
      dispatch(
        actions.setValuesOnIndex({ data: value.value.toString(), index: idx }),
      );

      if (!items.includes(value.label) && idx === items.length - 1) {
        dispatch(actions.addRow());
      }
    };

    const handleInputChange = (value: string, idx: number) => {
      dispatch(actions.setItemsOnIndex({ data: value, index: idx }));

      // TODOTODO netreba to ani riesit lebo stale tam bude -1 len...
      // TODO: docasne nastavenie -1 pretoze tato polozka nema svoju value
      // dispatch(actions.setValuesOnIndex({ data: -1, index: idx }));
    };

    const addRow = () => {
      dispatch(actions.addRow());
    };

    const disableAddRow = items.some((item) => !item);

    console.log('- ITEM RERENDER');

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
          {items.map((value: string, row: number) => {
            console.log('rerender: ', row);

            return (
              <TableRow key={row}>
                <TableCell>
                  {values[row] != '-1' ? (
                    <Autocomplete
                      value={itemSelectOptions.find(
                        (option) => option.label === value,
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
                      // @ts-ignore
                      onChange={(e, value) =>
                        handleAutocompleteChange(value, row)
                      }
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
                      defaultValue={value}
                      onBlur={(e) => handleInputChange(e.target.value, row)}
                    />
                  )}
                </TableCell>
              </TableRow>
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
  },
);

export default ItemSelect;
