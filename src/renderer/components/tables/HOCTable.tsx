import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import PDFTable from './PDFTable';
import Title from '../Title';
import { SortDirection } from 'renderer/types/sortDirection';

export default function withTable(
  TableInput: (props: any) => JSX.Element,
  TableDataHeader: (props: any) => JSX.Element,
  selector: any,
  actions: any
) {
  return () => {
    const [analytic, setAnalytic] = useState<boolean>(false);
    const dispatch = useAppDispatch();

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

    const { headers, data, dynRows, dynCols } = useAppSelector(selector);

    const sortByYear = (sortDirection: SortDirection) => {
      dispatch(actions.sortTableByYear(sortDirection));
    };

    const sortByItemNumber = (sortDirection: SortDirection) => {
      dispatch(actions.sortTableByItemNumber(sortDirection));
    };

    return (
      <>
        <Title onSortYear={sortByYear} onSortItems={sortByItemNumber} />
        <div className={'table-card row hideInPrint'}>
          <TableInput
            selector={selector}
            analytic={analytic}
            actions={actions}
          />
          <div className={'col-7'} style={{ width: '100%' }}>
            <div className={'table-data'}>
              <table className={'table'}>
                <TableDataHeader
                  header={headers}
                  dynCols={dynCols}
                  actions={actions}
                />
                <tbody>
                  {data.map((rowData: number[], row: number) => (
                    <tr key={row}>
                      {rowData.map((value: number, col: number) => (
                        <td
                          className={'table-cell'}
                          style={{
                            borderBottomColor:
                              row === data.length - 1 && dynCols
                                ? '#ff4e4e'
                                : 'lightgray',
                            borderRightColor:
                              col === rowData.length - 1 && dynRows
                                ? '#ff4e4e'
                                : 'lightgray',
                          }}
                          key={row + ':' + col}
                        >
                          <input
                            type="number"
                            className={'table-input'}
                            defaultValue={value}
                            onBlur={(e) => handleChangeData(e, row, col)}
                            onWheel={(event) => event.currentTarget.blur()}
                          />
                        </td>
                      ))}
                      {dynRows && (
                        <td
                          className={'delete-cell'}
                          onClick={() => deleteRow(row)}
                        >
                          -
                        </td>
                      )}
                    </tr>
                  ))}
                  {dynCols && (
                    <tr>
                      {data[0].map((_value: number, col: number) => {
                        return (
                          <td
                            className={'delete-cell'}
                            key={col}
                            onClick={() => deleteColumn(col)}
                          >
                            -
                          </td>
                        );
                      })}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <PDFTable selector={selector} />
      </>
    );
  };
}
