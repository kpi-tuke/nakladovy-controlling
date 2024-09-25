import { useAppDispatch, useAppSelector } from '../../store/hooks';
import PDFTable from './PDFTable';
import Title from '../Title';
import {
  Autocomplete,
  Box,
  Grid,
  Paper,
  SortDirection,
  styled,
  TextField,
} from '@mui/material';
import {
  ActionCellBottom,
  ActionCellBottomRight,
  ActionCellRight,
  DataTable,
  TableBody,
  TableCell,
  TableRow,
} from './Table';
import TableActionButton from './TableActionButton';
import { useError } from '../providers/ErrorProvider';
import { CellValue, CellType } from '@renderer/store/rootReducer';
import { RootSelectors } from '@renderer/store/store';
import React, { useEffect, useRef } from 'react';

const TableWrapper = styled(Box)`
  overflow-x: auto;
`;

export default function withTable(
  TableInput: React.FC<any>,
  TableDataHeader: React.FC<any>,
  selectors: RootSelectors,
  actions: any,
) {
  return () => {
    const dispatch = useAppDispatch();
    const { openError } = useError();

    const data = useAppSelector(selectors.data);
    const dynCols = useAppSelector(selectors.dynCols);
    const values = useAppSelector(selectors.values);

    const tableContentRef = useRef<HTMLDivElement>(null);
    const prevDataLength = useRef<number>(data[0]?.length || 0);

    const deleteColumn = (col: number) => {
      dispatch(actions.deleteColumn(col));
    };

    const sortByYear = (sortDirection: SortDirection) => {
      try {
        dispatch(actions.sortTableByYear(sortDirection));
      } catch (error: any) {
        openError(error);
      }
    };

    const sortByItemNumber = (sortDirection: SortDirection) => {
      dispatch(actions.sortTableByItemNumber(sortDirection));
    };

    useEffect(() => {
      const currentDataLength = data[0]?.length || 0;

      if (currentDataLength > prevDataLength.current) {
        if (tableContentRef.current) {
          tableContentRef.current.scrollLeft =
            tableContentRef.current.scrollWidth;
        }
      }

      prevDataLength.current = currentDataLength;
    }, [data]);

    return (
      <>
        <Title
          onSortYear={actions.sortTableByYear ? sortByYear : undefined}
          onSortItems={
            actions.sortTableByItemNumber ? sortByItemNumber : undefined
          }
        />
        <Paper className="hideInPrint">
          <Grid container>
            <Grid xs={4} item>
              <TableInput selectors={selectors} actions={actions} />
            </Grid>
            <Grid xs={8} item>
              <TableWrapper ref={tableContentRef}>
                <DataTable>
                  <TableDataHeader selectors={selectors} actions={actions} />
                  <TableBody>
                    {data.map((rowData, row) => {
                      return (
                        <Row
                          key={values[row].id}
                          row={row}
                          data={rowData}
                          selectors={selectors}
                          actions={actions}
                        />
                      );
                    })}
                    <TableRow>
                      {data[0].map((_value, col) => {
                        return (
                          <ActionCellBottom key={col}>
                            {dynCols && (
                              <TableActionButton
                                buttonType="delete"
                                onClick={() => deleteColumn(col)}
                              />
                            )}
                          </ActionCellBottom>
                        );
                      })}
                      <ActionCellBottomRight></ActionCellBottomRight>
                    </TableRow>
                  </TableBody>
                </DataTable>
              </TableWrapper>
            </Grid>
          </Grid>
        </Paper>

        <PDFTable selectors={selectors} />
      </>
    );
  };
}

type RowProps = {
  data: CellValue[];
  row: number;
  selectors: RootSelectors;
  actions: any;
};

const Row: React.FC<RowProps> = React.memo(
  ({ data, row, selectors, actions }) => {
    const dispatch = useAppDispatch();

    const dynRows = useAppSelector(selectors.dynRows);
    const headers = useAppSelector(selectors.headers);

    const deleteRow = (row: number) => {
      dispatch(actions.deleteRow(row));
    };

    return (
      <TableRow>
        {data.map((_, col) => (
          <Cell
            key={headers[col].id}
            actions={actions}
            selectors={selectors}
            col={col}
            row={row}
          />
        ))}
        {dynRows && (
          <ActionCellRight>
            <TableActionButton
              buttonType="delete"
              onClick={() => deleteRow(row)}
            />
          </ActionCellRight>
        )}
      </TableRow>
    );
  },
);

type CellProps = {
  row: number;
  col: number;
  selectors: RootSelectors;
  actions: any;
};

const Cell: React.FC<CellProps> = React.memo(
  ({ row, col, selectors, actions }) => {
    const dispatch = useAppDispatch();

    const header = useAppSelector(selectors.selectHeaderByIndex(col));
    const value = useAppSelector(selectors.selectDataByPosition(row, col));
    const rowType = useAppSelector(selectors.getRowType(row));

    const handleChangeData = function (value: string) {
      // zmena , na . pri cislach, lebo inak sa hodnota zmeni na 0
      if (rowType === CellType.NUMBER) {
        value = value.replace(',', '.');

        // zakazanie zadat viac . alebo , v cisle
        if (value.split('.').length > 2) {
          return;
        }

        // zakazanie zadat pismeno v cisle
        if (/[a-zA-Z]/.test(value)) {
          return;
        }

        if (!/0+$/.test(value)) {
          // remove unnecessary 0 from beginning of the number
          if (/^\d+\.\d+$/.test(value)) {
            value = parseFloat(value).toString();
          }

          // zabranenie zadat viacero 0 na zaciatok cisla
          if (/^0+/.test(value) && !/^0+\./.test(value)) {
            value = parseFloat(value).toString();
          }
        }
      }

      dispatch(
        actions.setDataOnIndex({
          data: value,
          row,
          col,
          type: rowType,
        }),
      );
    };

    return (
      <TableCell>
        <TextField
          placeholder={rowType === CellType.NUMBER ? '0' : ''}
          value={value}
          onChange={(e) => handleChangeData(e.target.value ?? '')}
          onWheel={(event) => event.currentTarget.blur()}
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
              textAlign: 'center',
            },
          }}
        />
        {/* Toto sa odstranovalo ale nechavam to tu, keby sa to chcelo v buducnosti pridat */}
        {/* {rowType === CellType.NUMBER || rowType === CellType.STRING ? (
          
        ) : (
          <Autocomplete
            value={header.options?.find(
              (option) => option.value === value.toString(),
            )}
            options={header.options ?? []}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} />}
            clearIcon={false}
            onChange={(_, value) => {
              handleChangeData(value?.value ?? '');
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
        )} */}
      </TableCell>
    );
  },
);
