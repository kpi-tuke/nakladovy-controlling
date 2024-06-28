import { splitTable } from '../../helper';
import { RootState } from '../../store/store';
import { defaultState } from '../../store/rootReducer';
import { useAppSelector } from '../../store/hooks';

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
    <div className={'table-card row hideInScreen'}>
      <div className={'col-4'}>
        {separatedHeaders.map((_table: string[], idx: number) => (
          <table
            key={idx + 'input'}
            className={'table'}
            style={{ width: '100%' }}
          >
            <tbody>
              <tr className={'table-head'}>
                <td className={'table-corner'}>{corner}</td>
              </tr>
              {items.map((value: string, row: number) => {
                return (
                  <tr key={row}>
                    <td className={'table-cell'} key={value + row.toString()}>
                      {value}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ))}
      </div>

      <div className={'table-data col-8 row'}>
        {separatedData.map((table: number[][], idx: number) => (
          <table key={idx + 'data'} className={'col-12 table'}>
            <thead>
              <tr className={'table-head'}>
                {separatedHeaders[idx].map((value: string, col: number) => (
                  <th
                    key={col}
                    className={'table-cell'}
                    style={{ textAlign: 'center' }}
                  >
                    {value}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.map((rowData: number[], row: number) => (
                <tr key={row}>
                  {rowData.map((value: number, col: number) => (
                    <td
                      className={'table-cell'}
                      style={{ textAlign: 'center' }}
                      key={row + ':' + col}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
}
