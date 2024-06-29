import { splitTable } from '../../helper';
import { RootState } from '../../store/store';
import { defaultState } from '../../store/rootReducer';
import { useAppSelector } from '../../store/hooks';
import { Grid, Paper, styled } from '@mui/material';
import { Table, TableBody, TableCell, TableCorner, TableRow } from './Table';
import HeaderValue from './HeaderValue';

const TableCellStyled = styled(TableCell)`
  padding: 0 9px;
  text-align: left;
`;

const TableStyled = styled(Table)`
  width: unset;
`;

export default function PDFTable({
  selector,
}: {
  selector: (state: RootState) => defaultState;
}) {
  const { corner, headers, items, data } = useAppSelector(selector);
  const colsPerTable = 5;
  const { separatedHeaders, separatedData } = splitTable(
    colsPerTable,
    headers,
    data
  );

  return (
    // <Grid container className="hideInScreen">
    // TODO: odkomentovat komentar
    <Paper
      sx={{
        marginTop: '20px',
      }}
    >
      <Grid container>
        <Grid item xs={4}>
          {separatedHeaders.map((_table: string[], idx: number) => (
            <Table key={idx + 'input'}>
              <TableBody>
                <TableRow>
                  <TableCorner>{corner}</TableCorner>
                </TableRow>

                {items.map((value: string, row: number) => {
                  return (
                    <TableRow key={row}>
                      <TableCellStyled key={value + row.toString()}>
                        {value}
                      </TableCellStyled>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ))}
        </Grid>

        <Grid item xs={8}>
          {separatedData.map((table: number[][], idx: number) => (
            <TableStyled key={idx + 'data'}>
              <HeaderValue header={separatedHeaders[idx]} />
              <TableBody>
                {table.map((rowData: number[], row: number) => (
                  <TableRow key={row}>
                    {rowData.map((value: number, col: number) => (
                      <TableCell key={row + ':' + col}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </TableStyled>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
}
