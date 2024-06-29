import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { defaultState } from '../../store/rootReducer';
import groupedOptions from '../../chartOfAccounts';
import { RootState } from '../../store/store';
import { Table, TableBody, TableCell, TableHead, TableRow } from './Table';
import {
  Autocomplete,
  Button,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import React from 'react';

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

const Title = styled(Typography)`
  font-weight: bold;
  text-align: center;
`;

const TableStyled = styled(Table)`
  width: 100%;
  border-right: ${({ theme }) => `1px solid ${theme.palette.divider}`};
`;

type Option = {
  label: string;
  value: number;
  type: string;
};

export default function ItemSelect({
  selector,
  // @ts-ignore
  analytic,
  actions,
}: {
  corner: string[];
  inputs: string[];
  selector: (state: RootState) => defaultState;
  analytic: boolean;
  actions: any;
}) {
  const { corner, items, accounts } = useAppSelector(selector);
  const dispatch = useAppDispatch();

  const handleChange = function (value: Option, idx: number) {
    dispatch(
      actions.setItemsOnIndex({ data: value.label || value.value, index: idx })
    );
    dispatch(actions.setValuesOnIndex({ data: value.value, index: idx }));
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

    return allOptions;
  }, []);

  return (
    <TableStyled>
      <TableHead>
        <TableRow>
          <TableCell>
            <Title>{corner}</Title>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((value: string, row: number) => {
          return (
            <TableRow key={row}>
              <TableCell>
                <Autocomplete
                  value={allOption.find((option) => option.label === value)}
                  options={allOption}
                  groupBy={(option) => option.type}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => <TextField {...params} />}
                  clearIcon={null}
                  // @ts-ignore
                  onChange={(e, value) => handleChange(value, row)}
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
    </TableStyled>
  );
}
