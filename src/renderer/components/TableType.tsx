import '../App.css';
import {useState} from "react";
import Select from 'react-select'

export default function TableDynamic(props: any) {

  const [getState, setState] = useState({rows: props.rows, cols: props.cols})

  const handleChangeData = function (event: any, row: number, col: number) {
    props.data[row][col] = event.target.value === '' ? "" : event.target.value
    props.proceed()
  }

  const handleChangeHeader = function (event: any, idx: number,) {
    props.header[idx] = event.target.value
    props.proceed()

  }

  const handleChangeInput = function (event: any, idx: number,) {
    props.inputs[idx] = event.target.value
    props.proceed()

  }

  const addColumn = () => {
    props.header.push((parseInt(props.header[props.header.length - 1]) + 1).toString())
    props.data.map((value: any) => {
      value.push("0")
    })
    props.proceed()
  }


  const addRow = () => {
    let arr: number[] = []
    props.inputs.push("naklad")
    props.types.push(false)
    for (let i = 0; i < props.data[0].length; i++) {
      arr.push(0)
    }
    props.data.push(arr)
    setState({cols: getState.cols, rows: getState.rows + 1})

  }
  const deleteRow = (row: number) => {
    props.inputs.splice(row, 1)
    props.data.splice(row, 1)
    props.types.splice(row, 1)
    props.proceed()
  }

  const deleteColumn = (col: number) => {
    if (props.header.length === 1) return
    props.data.map((value: any) => {
      value.splice(col, 1)
    })
    props.header.splice(col, 1)
    props.proceed()
  }

  return (
    <div>

      <table className="table table-bordered table-responsive" style={{paddingBottom: 10}}>
        <thead className="thead-light">
        <tr>
          <th>
            {props.corner}
          </th>
          <th>
            Typ
          </th>
          {props.header.map((value: string, idx: number) => {
            return (
              <th key={idx.toString()} style={{background: "deepskyblue", textAlign: "center"}}>
                {props.headerType === "select"
                  ? <Select options={props.selectCol}/>
                  : props.headerType === "input"
                    ? <input type="text"
                             className="input-group-text"
                             style={{border: 0, margin: 0, padding: 0, background: "deepskyblue"}}
                             defaultValue={value}
                             onBlur={() => (handleChangeHeader(event, idx))}/>
                    : value
                }
              </th>
            )
          })}
          {props.dynCols &&
            <th style={{backgroundColor: "mediumspringgreen", textAlign: "center", color: "white"}} onClick={addColumn}>
              +
            </th>}
        </tr>

        </thead>
        <tbody>
        {props.inputs.map((value: string, row: number) => {
          return (
            <tr key={row}>
              <td key={value + row.toString()} style={{background: "yellow"}}>
                {props.inputType === "select"
                  ? <Select options={props.selectRow}/>
                  : props.inputType === "input"
                    ? <input type="text" style={{border: 0, background: "yellow"}} defaultValue={value}
                             onBlur={() => (handleChangeInput(event, row))}/>
                    : value}
              </td>
              <td onClick={() => {
                props.types[row] = !props.types[row];
                props.proceed()
              }}>
                {props.types[row] ? "+" : "-"}
              </td>

              {props.data[row].map((value: string, col: number) => {
                return (
                  <td key={row + ":" + col} style={{textAlign: "center"}}>
                    <input type="text"
                           style={{
                             border: 0,
                             margin: 0,
                             padding: 0,
                             width: 60,
                             textAlign: "center"
                           }}
                           value={value}
                           onChange={() => (handleChangeData(event, row, col))}/>
                  </td>
                )
              })}
              {props.dynRows &&
                <td style={{backgroundColor: "red", textAlign: "center", color: "white"}}
                    onClick={() => deleteRow(row)}>-</td>
              }

            </tr>)
        })
        }
        {
          <tr>
            {props.dynRows
              ? <td colSpan={2} style={{backgroundColor: "mediumspringgreen", textAlign: "center", color: "white"}}
                    onClick={addRow}>+</td>
              : <td style={{borderWidth: 0}}/>
            }
            {
              props.dynCols &&
              //@ts-ignore
              props.data[0].map((value: any, col: number) => {
                return (
                  <td key={col} style={{backgroundColor: "red", textAlign: "center", color: "white"}}
                      onClick={() => deleteColumn(col)}>-</td>
                )
              })
            }
          </tr>
        }
        </tbody>
      </table>

    </div>
  );
};
