import Select from 'react-select';
import {useAppDispatch} from 'renderer/store/hooks';

export default function TableDynamic(props: any) {
  const dispatch = useAppDispatch();
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: '0px solid green',
    }),
    menu: (provided: any) => ({
      ...provided,
      border: '0px solid red',
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
      style={{
        backgroundColor: 'white',
        padding: 0,
        margin: 30,
        marginTop: 80,
        boxShadow: '0px 0px 10px lightgray',
      }}
    >
      <div style={{margin: 0, padding: 0}}>
        <table style={{width: '100%'}}>
          <tbody>
          <tr
            style={{
              height: 50,
              backgroundColor: '#e6f7ff',
            }}
          >
            <td
              style={{
                border: '1px solid lightgray',
                borderTopWidth: 0,
                borderLeft: 0,
                textAlign: 'center',
              }}
            >
              {props.corner}
            </td>
          </tr>
          {props.inputs.map((value: string, row: number) => {
            return (
              <tr key={row} style={{height: 50}}>
                <td
                  style={{border: '1px solid lightgray', borderLeft: 0}}
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
                      style={{border: 0, width: '100%'}}
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
              <td style={{textAlign: 'center'}} onClick={addRow}>
                <button type="button">delete</button>
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

      <div style={{overflow: 'auto', margin: 0, padding: 0}}>
        <table style={{margin: 0}}>
          <thead>
          <tr style={{height: 50, backgroundColor: '#e6f7ff'}}>
            {props.header.map((value: string, idx: number) => (
              <th
                key={idx}
                style={{
                  border: '1px solid lightgray',
                  borderTopWidth: 0,
                }}
              >
                {props.headerType === 'select' ? (
                  // <Select
                  //   value={{label: value}}
                  //   options={props.selectCol}
                  //   onChange={(e) => handleChangeHeader(e, idx)}
                  // />
                  <select
                    style={{
                      textAlign: 'center',
                      border: 0,
                      backgroundColor: '#e6f7ff',
                    }}
                    value={value}
                    onChange={(e) => handleChangeHeader(e.target, idx)}
                  >
                    {/*<option key={"choose"} value="chose">--Please choose an option--</option>*/}
                    {props.selectCol.map((option: any) => (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : props.headerType === 'input' ? (
                  <input
                    style={{
                      border: 0,
                      textAlign: 'center',
                      backgroundColor: '#e6f7ff',
                    }}
                    type="text"
                    defaultValue={value}
                    onBlur={(e) => handleChangeHeader(e.target, idx)}
                  />
                ) : (
                  <div style={{textAlign: 'center'}}>{value}</div>
                )}
              </th>
            ))}
            {props.dynCols && (
              <th style={{backgroundColor: 'white'}} onClick={addColumn}>
                <button type="button">delete</button>
              </th>
            )}
          </tr>
          </thead>
          <tbody>
          {props.data.map((rowData: string[], row: number) => (
            <tr style={{height: 50}}>
              {rowData.map((value: string, col: number) => (
                <td
                  style={{border: '1px solid lightgray'}}
                  key={row + ':' + col}
                >
                  <input
                    type="text"
                    style={{border: 0, textAlign: 'center'}}
                    defaultValue={value}
                    onBlur={() => handleChangeData(event, row, col)}
                  />
                </td>
              ))}
              {props.dynRows && (
                <td onClick={() => deleteRow(row)}>
                  <button type="button">delete</button>
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
                    style={{textAlign: 'center'}}
                    key={col}
                    onClick={() => deleteColumn(col)}
                  >
                    <button type="button">delete</button>
                  </td>
                );
              })}
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
