import { splitTable } from '../../helper';
import { RootState } from '../../store/store';
import { defaultState } from '../../store/rootReducer';
import { useAppSelector } from '../../store/hooks';
import { Grid, Paper, styled } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableCorner,
  TableRow,
  TableHead,
} from './Table';
import HeaderValue from './HeaderValue';

const TableCellStyled = styled(TableCell)`
  padding: 0 9px;
  text-align: left;
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
    <Paper className="hideInScreen">
      <Grid container>
        <Grid item xs={4}>
          {separatedHeaders.map((_table: string[], idx: number) => (
            <Table key={idx + 'input'}>
              <TableHead>
                <TableRow>
                  <TableCorner>{corner}</TableCorner>
                </TableRow>
              </TableHead>

              <TableBody>
                {items.map((value: string, row: number) => {
                  return !!value ? (
                    <TableRow key={row}>
                      <TableCellStyled key={value + row.toString()}>
                        {value}
                      </TableCellStyled>
                    </TableRow>
                  ) : (
                    <></>
                  );
                })}
              </TableBody>
            </Table>
          ))}
        </Grid>

        <Grid item xs={8}>
          {separatedData.map((table: number[][], idx: number) => (
            <Table
              key={idx + 'data'}
              sx={{
                width: 'unset',
              }}
            >
              <HeaderValue header={separatedHeaders[idx]} />
              <TableBody>
                {table.map((rowData: number[], row: number) =>
                  row < items.length - 1 ? (
                    <TableRow key={row}>
                      {rowData.map((value: number, col: number) => (
                        <TableCell key={row + ':' + col}>{value}</TableCell>
                      ))}
                    </TableRow>
                  ) : (
                    <></>
                  )
                )}
              </TableBody>
            </Table>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
}
