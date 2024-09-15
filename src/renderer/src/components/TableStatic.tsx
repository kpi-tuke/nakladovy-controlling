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
import { MathJax } from 'better-react-mathjax';

const TableStyled = styled(Table)`
  width: unset;
`;

type Props = {
  data: any[];
  header: string[];
  corner: string;
  inputs: string[][];
  newPageAfter?: boolean;
};

const TableStatic: React.FC<Props> = ({
  data,
  header,
  corner,
  inputs,
  newPageAfter = true,
}) => {
  let separatedData: number[][][] = [];
  let separatedHeaders: string[][] = [];
  const colsInTable = 6;
  let numOfTables = Math.ceil(data[0].length / colsInTable);

  for (let i = 0; i < numOfTables; i++) {
    separatedData.push([]);
    separatedHeaders.push([]);
    for (let j = 0; j < data.length; j++) {
      separatedData[i].push([]);
    }
  }

  let table: number = 0;

  for (let y = 0; y < data[0].length; y++) {
    if (y % colsInTable === 0 && y !== 0) table++;
    for (let x = 0; x < data.length; x++) {
      separatedData[table][x].push(data[x][y]);
    }
    separatedHeaders[table].push(header[y]);
  }

  return (
    <>
      <TableData className={'hideInPrint'}>
        <TableStyled>
          <TableHead>
            <TableRow>
              <TableCorner>{corner}</TableCorner>
              {header.map((value: string, idx: number) => {
                return <TableCell key={idx}>{value}</TableCell>;
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {inputs.map((value: string[], row: number) => {
              return (
                <TableRow key={row}>
                  <CustomTooltip title={value[1]}>
                    <TableCell
                      key={value[0]}
                      dangerouslySetInnerHTML={{ __html: value[0] }}
                      sx={{ textAlign: 'left', padding: '0 9px' }}
                    />
                  </CustomTooltip>

                  {data[row].map((value: number, col: number) => {
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
        <div
          key={index}
          className={`hideInScreen ${newPageAfter ? 'new-page-after' : ''}`}
        >
          <TableStyled>
            <TableHead>
              <TableRow>
                <TableCorner>{corner}</TableCorner>
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
                        __html: inputs[row][0],
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
};

export default TableStatic;

type CustomTooltipProps = {
  title?: string;
  children: React.ReactElement;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ title, children }) => {
  return (
    <Tooltip placement="right" title={!!title && <MathJax>{title}</MathJax>}>
      {children}
    </Tooltip>
  );
};
