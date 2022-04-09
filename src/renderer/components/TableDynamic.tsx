import { ChangeEvent } from 'react';
import Select from 'react-select';
import { useAppDispatch } from 'renderer/store/hooks';

export default function TableDynamic(props: any) {
  const dispatch = useAppDispatch();

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: '0px solid black',
    }),
    menu: (provided: any) => ({
      ...provided,
      border: '0px solid black',
      borderRadius: 0,
    }),
  };

  const handleChangeData = function (
    event: ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) {
    dispatch(
      props.actions.setDataOnIndex({
        data: Math.round(parseFloat(event.target.value) * 100) / 100,
        row,
        col,
      })
    );
  };

  const handleChangeHeader = function (e: any, idx: number) {
    dispatch(
      props.actions.setHeadersOnIndex({ data: e.label || e.value, index: idx })
    );
  };

  const handleChangeInput = function (e: any, idx: number) {
    dispatch(
      props.actions.setItemsOnIndex({ data: e.label || e.value, index: idx })
    );
    dispatch(props.actions.setValuesOnIndex({ data: e.value, index: idx }));
  };

  const addColumn = () => {
    dispatch(props.actions.addColumn());
  };

  const addRow = () => {
    dispatch(props.actions.addRow());
  };

  const deleteRow = (row: number) => {
    dispatch(props.actions.deleteRow(row));
  };

  const deleteColumn = (col: number) => {
    dispatch(props.actions.deleteColumn(col));
  };

  return (
    <div className={'table-card row'}>
      <div className={'col-4'}>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr className={'table-head'}>
              <td className={'table-corner'}>{props.corner}</td>
            </tr>
            {props.inputs.map((value: string, row: number) => {
              return (
                <tr key={row}>
                  <td className={'table-cell'} key={value + row.toString()}>
                    {props.inputType === 'select' ? (
                      <Select
                        styles={customStyles}
                        value={{ label: value }}
                        options={props.selectRow.map(
                          (selection: { label: any; options: any[] }) => ({
                            label: selection.label,
                            options: selection.options.filter(
                              (opt: any) => !props.inputs.includes(opt.label)
                            ),
                          })
                        )}
                        onChange={(e) => handleChangeInput(e, row)}
                      />
                    ) : props.inputType === 'input' ? (
                      <input
                        className={'table-input'}
                        type="text"
                        defaultValue={value}
                        onBlur={(e) => handleChangeInput(e.target, row)}
                      />
                    ) : (
                      value
                    )}
                  </td>
                </tr>
              );
            })}
            {props.dynRows ? (
              <tr>
                <td
                  className={'add-cell'}
                  style={{ textAlign: 'center' }}
                  onClick={addRow}
                >
                  +
                </td>
              </tr>
            ) : (
              <tr>
                <td />
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={'col-8'} style={{ width: '100%' }}>
        <div style={{ overflow: 'auto' }}>
          <table>
            <thead>
              <tr className={'table-head'}>
                {props.header.map((value: string, idx: number) => (
                  <th key={idx} className={'table-cell'}>
                    {props.headerType === 'select' ? (
                      <select
                        className={'table-select-head'}
                        value={value}
                        onChange={(e) => handleChangeHeader(e.target, idx)}
                      >
                        {props.selectCol.map(
                          (option: { value: number; label: string }) =>
                            !props.header.includes(option.label) && (
                              <option key={option.value} value={option.label}>
                                {option.label}
                              </option>
                            )
                        )}
                        <option key={0} value={value} hidden={true}>
                          {value}
                        </option>
                      </select>
                    ) : props.headerType === 'input' ? (
                      <input
                        className={'table-input-head'}
                        type="text"
                        value={value}
                        onChange={(e) => handleChangeHeader(e.target, idx)}
                      />
                    ) : (
                      value
                    )}
                  </th>
                ))}
                {props.dynCols && props.header.length < 8 && (
                  <th className={'add-cell'} onClick={addColumn}>
                    +
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {props.data.map((rowData: number[], row: number) => (
                <tr key={row}>
                  {rowData.map((value: number, col: number) => (
                    <td className={'table-cell'} key={row + ':' + col}>
                      <input
                        type="number"
                        className={'table-input'}
                        value={value}
                        onChange={(e) => handleChangeData(e, row, col)}
                        onWheel={(event) => event.currentTarget.blur()}
                      />
                    </td>
                  ))}
                  {props.dynRows && (
                    <td
                      className={'delete-cell'}
                      onClick={() => deleteRow(row)}
                    >
                      🗑
                    </td>
                  )}
                </tr>
              ))}
              <tr>
                {props.dynCols &&
                  //@ts-ignore
                  props.data[0].map((_value: number, col: number) => {
                    return (
                      <td
                        className={'delete-cell'}
                        key={col}
                        onClick={() => deleteColumn(col)}
                      >
                        🗑
                      </td>
                    );
                  })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
