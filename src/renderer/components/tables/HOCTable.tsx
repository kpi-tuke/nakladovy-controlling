import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import PDFTable from './PDFTable';
import Title from '../Title';
import { SortDirection } from 'renderer/types/sortDirection';
import {
  Autocomplete,
  Box,
  Grid,
  Paper,
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
import { defaultState, HeaderType } from 'renderer/store/rootReducer';

const TableWrapper = styled(Box)`
  overflow-x: auto;
`;

export default function withTable(
  TableInput: (props: any) => JSX.Element,
  TableDataHeader: (props: any) => JSX.Element,
  selector: any,
  actions: any
) {
  return () => {
    const dispatch = useAppDispatch();
    const { openError } = useError();

    const { headers, data, dynRows, dynCols } = useAppSelector(
      selector
    ) as defaultState;

    const deleteRow = (row: number) => {
      dispatch(actions.deleteRow(row));
    };

    const deleteColumn = (col: number) => {
      dispatch(actions.deleteColumn(col));
    };

    const handleChangeData = function (
      event: ChangeEvent<HTMLInputElement>,
      row: number,
      col: number,
      cellType?: HeaderType,
      value?: string
    ) {
      if (cellType === HeaderType.SELECT) {
        dispatch(
          actions.setDataOnIndex({
            data: value,
            row,
            col,
            type: HeaderType.SELECT,
          })
        );
      } else {
        if (
          event.target.value.startsWith('0') &&
          !event.target.value.startsWith('0.')
        )
          event.target.value = event.target.value.slice(1);

        dispatch(
          actions.setDataOnIndex({
            data: Math.abs(
              Math.round(parseFloat(event.target.value) * 100) / 100
            ),
            row,
            col,
          })
        );
      }
    };

    const sortByYear = (sortDirection: SortDirection) => {
      try {
        dispatch(actions.sortTableByYear(sortDirection));
      } catch (error) {
        openError(error);
      }
    };

    const sortByItemNumber = (sortDirection: SortDirection) => {
      dispatch(actions.sortTableByItemNumber(sortDirection));
    };

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
              <TableInput selector={selector} actions={actions} />
            </Grid>
            <Grid xs={8} item>
              <TableWrapper>
                <DataTable>
                  <TableDataHeader
                    header={headers.map((h) => h.label)}
                    dynCols={dynCols}
                    actions={actions}
                  />
                  <TableBody>
                    {data.map((rowData: number[], row: number) => (
                      <TableRow key={row}>
                        {rowData.map((value: number, col: number) => (
                          <TableCell key={row + ':' + col}>
                            {headers[col].type === 'STRING' ? (
                              <TextField
                                defaultValue={value}
                                onBlur={(e) =>
                                  handleChangeData(
                                    e as React.FocusEvent<HTMLInputElement>,
                                    row,
                                    col
                                  )
                                }
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
                            ) : (
                              <Autocomplete
                                value={headers[col].options.find(
                                  (option) => option.value === value.toString()
                                )}
                                options={headers[col].options}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                                clearIcon={false}
                                onChange={(e, value) => {
                                  handleChangeData(
                                    e as React.ChangeEvent<HTMLInputElement>,
                                    row,
                                    col,
                                    headers[col].type,
                                    value.value
                                  );
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
                            )}
                          </TableCell>
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
                    ))}
                    <TableRow>
                      {data[0].map((_value: number, col: number) => {
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

        <PDFTable selector={selector} />
      </>
    );
  };
}
