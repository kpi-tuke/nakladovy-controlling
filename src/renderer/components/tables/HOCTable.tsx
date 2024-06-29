import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import PDFTable from './PDFTable';
import Title from '../Title';
import { SortDirection } from 'renderer/types/sortDirection';
import { Box, Button, Grid, Paper, styled, TextField } from '@mui/material';
import { Table, TableBody, TableCell, TableRow } from './Table';
import { Remove } from '@mui/icons-material';

const TableStyled = styled(Table)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  width: unset;
`;

const DeleteCell = styled(TableCell)`
  position: relative;
`;

const DeleteCellRight = styled(DeleteCell)`
  width: 20px;
  min-width: 20px;
  max-width: 20px;
  border-right: 1px solid ${({ theme }) => theme.palette.divider};
`;

const DeleteCellBottom = styled(DeleteCell)`
  height: 28px;
`;

const DeleteCellBottomRight = styled(DeleteCellRight)`
  height: 28px;
`;

const DeleteButton = styled(Button)`
  background-color: #fff;
  padding: 0;
  position: absolute;
  inset: 0;
  min-width: unset;
  width: 100%;
  border-radius: 0;
  color: ${({ theme }) => theme.palette.error.main};

  &:hover {
    background-color: ${({ theme }) => theme.palette.error.main};
    color: #fff;
  }
`;

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
                <TableStyled>
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
                          <DeleteCellRight>
                            <DeleteButton onClick={() => deleteRow(row)}>
                              <Remove sx={{ fontSize: 18 }} />
                            </DeleteButton>
                          </DeleteCellRight>
                        )}
                      </TableRow>
                    ))}
                    {dynCols && (
                      <TableRow>
                        {data[0].map((_value: number, col: number) => {
                          return (
                            <DeleteCellBottom key={col}>
                              <DeleteButton onClick={() => deleteColumn(col)}>
                                <Remove sx={{ fontSize: 18 }} />
                              </DeleteButton>
                            </DeleteCellBottom>
                          );
                        })}
                        <DeleteCellBottomRight></DeleteCellBottomRight>
                      </TableRow>
                    )}
                  </TableBody>
                </TableStyled>
              </TableWrapper>
            </Grid>
          </Grid>
        </Paper>

        <PDFTable selector={selector} />
      </>
    );
  };
}
