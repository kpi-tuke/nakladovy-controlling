import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { defaultState } from '../../store/rootReducer';
import groupedOptions from '../../chartOfAccounts';
import { RootState } from '../../store/store';
import {
  Table,
  TableBody,
  TableCell,
  TableCorner,
  TableHead,
  TableRow,
} from './Table';
import { Autocomplete, Button, styled, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import React from 'react';
import TableInput from './TableInput';

const AddCell = styled(TableCell)`
  position: relative;
  height: 28px;
`;

const AddButton = styled(Button)`
  background-color: #fff;
  padding: 0;
  position: absolute;
  inset: 0;
  min-width: unset;
  width: 100%;
  border-radius: 0;
  color: ${({ theme }) => theme.palette.success.main};

  &:hover {
    background-color: ${({ theme }) => theme.palette.success.main};
    color: #fff;
  }
`;

type Option = {
  label: string;
  value: number;
  type: string;
};

const ADD_CUSTOM = 'Iná položka...';

export default function ItemSelect({
  selector,
  actions,
}: {
  selector: (state: RootState) => defaultState;
  actions: any;
}) {
  const { corner, items, values } = useAppSelector(selector);
  const dispatch = useAppDispatch();

  const handleAutocompleteChange = (value: Option, idx: number) => {
    const savedValue = value.label === ADD_CUSTOM ? '' : value.label;

    dispatch(actions.setItemsOnIndex({ data: savedValue, index: idx }));
    dispatch(
      actions.setValuesOnIndex({ data: value.value.toString(), index: idx })
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

  const allOption = React.useMemo(() => {
    const allOptions: Option[] = [];

    groupedOptions.forEach((group) => {
      group.options.forEach((option) => {
        allOptions.push({ ...option, type: group.label });
      });
    });

    allOptions.push({ label: ADD_CUSTOM, value: -1, type: 'Iné' });

    return allOptions;
  }, []);

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
          return (
            <TableRow key={row}>
              <TableCell>
                {values[row] != '-1' ? (
                  <Autocomplete
                    value={allOption.find((option) => option.label === value)}
                    options={allOption}
                    groupBy={(option) => option.type}
                    getOptionLabel={(option) => option.label}
                    getOptionDisabled={(option) =>
                      items.includes(option.label) &&
                      option.label !== ADD_CUSTOM
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
          <AddCell colSpan={2} onClick={addRow}>
            <AddButton>
              <Add sx={{ fontSize: 18 }} />
            </AddButton>
          </AddCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
