import { ChangeEvent } from 'react';
import Select from 'react-select';
import { useAppDispatch } from 'renderer/store/hooks';
import { splitTable } from '../calculations';

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
    if (
      event.target.value.startsWith('0') &&
      !event.target.value.startsWith('0.')
    )
      event.target.value = event.target.value.slice(1);
    dispatch(
      props.actions.setDataOnIndex({
        data: Math.abs(Math.round(parseFloat(event.target.value) * 100) / 100),
        row,
        col,
      })
    );
  };

  const handleChangeHeader = function (e: any, idx: number) {
    dispatch(props.actions.setHeadersOnIndex({ data: e.value, index: idx }));
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

  const colsPerTable = 5;
  const { separatedHeaders, separatedData } = splitTable(
    colsPerTable,
    props.header,
    props.data
  );

  let maxCols = props.selectCol ? props.selectCol.length : 1000;

  let availableInputOptions = props.selectRow !== undefined && props.selectRow.map(
    (selection: { label: any; options: any[] }) => ({
      label: selection.label,
      options: selection.options.filter(
        (opt: any) => !props.inputs.includes(opt.label)
      ),
    })
  );

  let availableHeadersOptions = props.selectCol !== undefined && props.selectCol
    .filter(
      (option: { value: number; label: string }) =>
        !props.header.includes(option.label)
    )
    .map((option: any) => option.label);

  return (
    <>
      <div className={'table-card row hideInPrint'}>
        <div className={'col-4'}>
          <table className={'table'} style={{ width: '100%' }}>
            <tbody>
              <tr className={'table-head'}>
                <td className={'table-corner'}>{props.corner}</td>
              </tr>
              {props.inputs.map((value: string, row: number) => {
                return (
                  <tr key={row}>
                    <td
                      className={'table-cell'}
                      style={{
                        borderBottomColor:
                          row === props.inputs.length - 1 && props.dynRows
                            ? '#65c565'
                            : 'lightgray',
                      }}
                      key={value + row.toString()}
                    >
                      {props.inputType === 'select' ? (
                        <Select
                          styles={customStyles}
                          value={{ label: value }}
                          options={availableInputOptions}
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
          <div className={'table-data'}>
            <table className={'table'}>
              <thead>
                <tr className={'table-head'}>
                  {props.header.map((value: string, idx: number) => (
                    <th
                      key={idx}
                      className={
                        props.headerType === 'textCVP' ||
                        props.headerType === 'select'
                          ? 'table-cell-cvp'
                          : 'table-cell'
                      }
                      style={{
                        borderRightColor:
                          idx === props.header.length - 1 && props.dynCols
                            ? '#65c565'
                            : 'lightgray',
                      }}
                    >
                      {props.headerType === 'select' ? (
                        <select
                          className={'table-select-head'}
                          value={value}
                          onChange={(e) => handleChangeHeader(e.target, idx)}
                        >
                          {availableHeadersOptions.map(
                            (option: string, idx: number) => (
                              <option key={idx} value={option}>
                                {option}
                              </option>
                            )
                          )}
                          <option key={8} value={value} hidden={true}>
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
                  {props.dynCols && props.header.length < maxCols && (
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
                      <td
                        className={'table-cell'}
                        style={{
                          borderBottomColor:
                            row === props.data.length - 1 && props.dynCols
                              ? '#ff4e4e'
                              : 'lightgray',
                          borderRightColor:
                            col === rowData.length - 1 && props.dynRows
                              ? '#ff4e4e'
                              : 'lightgray',
                        }}
                        key={row + ':' + col}
                      >
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
                        -
                      </td>
                    )}
                  </tr>
                ))}
                {props.dynCols && (
                  <tr>
                    {props.data[0].map((_value: number, col: number) => {
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

      <div className={'table-card row hideInScreen'}>
        <div className={'col-4'}>
          {separatedHeaders.map((_table, idx) => (
            <table
              key={idx + 'input'}
              className={'table'}
              style={{ width: '100%' }}
            >
              <tbody>
                <tr className={'table-head'}>
                  <td
                    className={'table-corner'}
                    style={props.headerType === 'textCVP' ? { height: 63 } : {}}
                  >
                    {props.corner}
                  </td>
                </tr>
                {props.inputs.map((value: string, row: number) => {
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
          {separatedData.map((table, idx) => (
            <table key={idx + 'data'} className={'col-12 table'}>
              <thead>
                <tr className={'table-head'}>
                  {separatedHeaders[idx].map((value: string, col: number) => (
                    <th key={col} className={'table-cell'} style={{textAlign: "center"}}>
                      {value}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.map((rowData: number[], row: number) => (
                  <tr key={row}>
                    {rowData.map((value: number, col: number) => (
                      <td className={'table-cell'} style={{textAlign:"center"}} key={row + ':' + col}>
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
    </>
  );
}
