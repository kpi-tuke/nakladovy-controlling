import Select from 'react-select';
import {useAppDispatch} from 'renderer/store/hooks';

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

  const handleChangeData = function (event: any, row: number, col: number) {
    dispatch(
      props.actions.setDataOnIndex({ data: event.target.value, row, col })
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
    <div
      className={"table-card row"}

    >
      <div className={"col-4"}>
        <table style={{width: '100%'}}>
          <tbody>
          <tr
            className={"table-head"}
          >
            <td
              className={"table-corner"}
            >
              {props.corner}
            </td>
          </tr>
          {props.inputs.map((value: string, row: number) => {
            return (
              <tr key={row}>
                <td
                  className={"table-cell"}
                  key={value + row.toString()}
                >
                  {props.inputType === 'select' ? (
                    <Select
                      styles={customStyles}
                      value={{label: value}}
                      options={props.selectRow}
                      onChange={(e) => handleChangeInput(e, row)}
                    />
                  ) : props.inputType === 'input' ? (
                    <input
                      className={"table-input"}
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
              <td className={"add-cell"} style={{textAlign: 'center'}} onClick={addRow}>
                +
              </td>
            </tr>
          ) : (
            <tr>
              <td/>
            </tr>
          )}
          </tbody>
        </table>
      </div>

      <div className={"col-8"} style={{width:"100%"}}>
        <div style={{overflow:"auto"}}>
        <table>
          <thead>
          <tr className={"table-head"}>
            {props.header.map((value: string, idx: number) => (
              <th
                key={idx}
                className={"table-cell"}
              >
                {props.headerType === 'select' ? (
                  // <Select
                  //   value={{label: value}}
                  //   options={props.selectCol}
                  //   onChange={(e) => handleChangeHeader(e, idx)}
                  // />
                    <select
                      className={"table-select-head"}
                      value={value}
                      onChange={(e) => handleChangeHeader(e.target, idx)}
                    >
                      {props.selectCol.map((option: any) => (
                        <option key={option.value} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                ) : props.headerType === 'input' ? (
                  <input
                    className={"table-input-head"}
                    type="text"
                    value={value}
                    onChange={(e) => handleChangeHeader(e.target, idx)}
                  />
                ) :
                  value
                }
              </th>
            ))}
            {props.dynCols && (
              <th className={"add-cell"} onClick={addColumn}>
                +
              </th>
            )}
          </tr>
          </thead>
          <tbody>
          {props.data.map((rowData: string[], row: number) => (
            <tr key={row}>
              {rowData.map((value: string, col: number) => (
                <td
                  className={"table-cell"}
                  key={row + ':' + col}
                >
                  <input
                    type="text"
                    className={"table-input"}
                    value={value}
                    onChange={(e) => handleChangeData(e, row, col)}
                  />
                </td>
              ))}
              {props.dynRows && (
                <td className={"delete-cell"} onClick={() => deleteRow(row)}>
                  🗑
                </td>
              )}
            </tr>
          ))}
          <tr>
            {props.dynCols &&
              //@ts-ignore
              props.data[0].map((value: any, col: number) => {
                return (
                  <td
                    className={"delete-cell"}
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
