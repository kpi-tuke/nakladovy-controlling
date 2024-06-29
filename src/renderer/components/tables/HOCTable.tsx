import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import PDFTable from './PDFTable';
import Title from '../Title';
import { SortDirection } from 'renderer/types/sortDirection';
import { Box, Grid, Paper, styled, TextField } from '@mui/material';
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

    // @ts-ignore
    const { headers, data, dynRows, dynCols } = useAppSelector(selector);

    console.log('headers: ', headers);

    const deleteRow = (row: number) => {
      dispatch(actions.deleteRow(row));
    };

    const deleteColumn = (col: number) => {
      dispatch(actions.deleteColumn(col));
    };

    const handleChangeData = function (
      event: ChangeEvent<HTMLInputElement>,
      row: number,
      col: number
    ) {
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
    };

    const sortByYear = (sortDirection: SortDirection) => {
      dispatch(actions.sortTableByYear(sortDirection));
    };

    const sortByItemNumber = (sortDirection: SortDirection) => {
      dispatch(actions.sortTableByItemNumber(sortDirection));
    };

    return (
      <>
        <Title onSortYear={sortByYear} onSortItems={sortByItemNumber} />
        <Paper>
          <Grid container className="hideInPrint">
            <Grid xs={4} item>
              <TableInput selector={selector} actions={actions} />
            </Grid>
            <Grid xs={8} item>
              <TableWrapper>
                <DataTable>
                  <TableDataHeader
                    header={headers}
                    dynCols={dynCols}
                    actions={actions}
                  />
                  <TableBody>
                    {data.map((rowData: number[], row: number) => (
                      <TableRow key={row}>
                        {rowData.map((value: number, col: number) => (
                          <TableCell key={row + ':' + col}>
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
