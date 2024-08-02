import { splitTable } from '../../helper';
import { RootState } from '../../store/store';
import { defaultState } from '../../store/rootReducer';
import { useAppSelector } from '../../store/hooks';
import { Paper, Typography } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableCorner,
  TableRow,
  TableHead,
} from './Table';
import React from 'react';

export default function PDFTable({
  selector,
}: {
  selector: (state: RootState) => defaultState;
}) {
  const { corner, headers, items, data } = useAppSelector(selector);
  const colsPerTable = 5;
  const { separatedHeaders, separatedData } = splitTable(
    colsPerTable,
    headers.map((h) => h.label),
    data
  );

  const mergedData = React.useMemo(() => {
    const tables = [];

    for (
      let headersIndex = 0;
      headersIndex < separatedHeaders.length;
      headersIndex++
    ) {
      const headers = separatedHeaders[headersIndex];
      const data = separatedData[headersIndex];

      tables.push({ headers, data });
    }

    return tables;
  }, []);

  return (
    <>
      {mergedData.map((table, index) => (
        <div className={`hideInScreen  ${index > 0 ? 'new-page' : ''}`}>
          <Paper>
            <Table
              key={index}
              sx={{
                width: 'unset',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCorner
                    sx={{
                      minWidth: '30vw',
                      maxWidth: '30vw',
                    }}
                  >
                    {corner}
                  </TableCorner>

                  {table.headers.map((header, headerIndex) => (
                    <TableCell
                      key={headerIndex}
                      sx={{
                        minWidth: '13.3vw',
                        maxWidth: '13.3vw',
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {table.data.map((rowData, rowIndex) =>
                  !!items[rowIndex] ? (
                    <TableRow key={rowIndex}>
                      <TableCell
                        sx={{
                          textAlign: 'left',
                          padding: '0 9px',
                        }}
                      >
                        {items[rowIndex]}
                      </TableCell>
                      {rowData.map((value, colIndex) => (
                        <TableCell
                          key={colIndex}
                          sx={{
                            minWidth: '13.3vw',
                            maxWidth: '13.3vw',
                          }}
                        >
                          {value}
                        </TableCell>
                      ))}
                    </TableRow>
                  ) : (
                    <></>
                  )
                )}
              </TableBody>
            </Table>
          </Paper>

          {(mergedData.length > 1 || items.length > 16) && (
            <Typography
              textAlign={'right'}
              variant="caption"
              sx={{
                textAlign: 'right',
                marginBottom: '4rem',
                display: 'block',
              }}
            >
              {index + 1} / {mergedData.length}
            </Typography>
          )}
        </div>
      ))}
    </>
  );
}
