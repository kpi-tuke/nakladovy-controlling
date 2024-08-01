import MathJax from 'react-mathjax';
import {
  Table,
  TableBody,
  TableCell,
  TableCorner,
  TableHead,
  TableRow,
} from './tables/Table';
import { styled, Tooltip, Typography } from '@mui/material';
import { TableData } from './tables/TableData';

const TableStyled = styled(Table)`
  width: unset;
`;

// TODO: add props
export default function TableStatic(props: any) {
  let separatedData: number[][][] = [];
  let separatedHeaders: string[][] = [];
  const colsInTable = 6;
  let numOfTables = Math.ceil(props.data[0].length / colsInTable);

  for (let i = 0; i < numOfTables; i++) {
    separatedData.push([]);
    separatedHeaders.push([]);
    for (let j = 0; j < props.data.length; j++) {
      separatedData[i].push([]);
    }
  }

  let table: number = 0;

  for (let y = 0; y < props.data[0].length; y++) {
    if (y % colsInTable === 0 && y !== 0) table++;
    for (let x = 0; x < props.data.length; x++) {
      separatedData[table][x].push(props.data[x][y]);
    }
    separatedHeaders[table].push(props.header[y]);
  }

  return (
    <>
      <TableData className={'hideInPrint'}>
        <TableStyled>
          <TableHead>
            <TableRow>
              <TableCorner>{props.corner}</TableCorner>
              {props.header.map((value: string, idx: number) => {
                return <TableCell key={idx}>{value}</TableCell>;
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {props.inputs.map((value: string[], row: number) => {
              return (
                <TableRow key={row}>
                  <Tooltip
                    placement="right"
                    title={
                      value[1] !== '' && (
                        <MathJax.Provider>
                          <MathJax.Node formula={value[1]} />
                        </MathJax.Provider>
                      )
                    }
                  >
                    <TableCell
                      key={value[0]}
                      dangerouslySetInnerHTML={{ __html: value[0] }}
                      sx={{ textAlign: 'left', padding: '0 9px' }}
                    />
                  </Tooltip>

                  {props.data[row].map((value: number, col: number) => {
                    return (
                      <TableCell
                        sx={{
                          textAlign: 'center',
                          color: value < 0 ? 'red' : 'inherit',
                        }}
                        key={row + ':' + col}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </TableStyled>
      </TableData>

      {separatedData.map((table, index) => (
        <div className="new-page-after hideInScreen">
          <TableStyled key={index}>
            <TableHead>
              <TableRow>
                <TableCorner>{props.corner}</TableCorner>
                {separatedHeaders[index].map((value: string, idx: number) => {
                  return <TableCell key={idx}>{value}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {table.map((tableRow: number[], row: number) => {
                return (
                  <TableRow key={row}>
                    <TableCell
                      key={row}
                      dangerouslySetInnerHTML={{
                        __html: props.inputs[row][0],
                      }}
                      sx={{
                        minWidth: '24vw',
                        maxWidth: '24vw',
                      }}
                    ></TableCell>

                    {tableRow.map((value: number, col: number) => {
                      return (
                        <TableCell key={row + ':' + col}>{value}</TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </TableStyled>
          {separatedData.length > 1 && (
            <Typography textAlign={'right'} variant="caption">
              {index + 1} / {separatedData.length}
            </Typography>
          )}
        </div>
      ))}
    </>
  );
}
