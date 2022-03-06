import '../App.css';
import {useState} from "react";

export default function TableDynamic(props: any) {

  const [state, setState] = useState(props.data)

  const handleChangeData = function (event: any, row: number, col: number) {
    let arr: any[] = state
    arr[row][col] = event.target.value === ''
      ? ""
      : event.target.value
    setState(arr)
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
    let arr: any[] = state
    arr.map((value: any) => {
      value.push("0")
    })
    setState(arr)
    props.proceed()
  }

  const addRow = () => {
    let arr: any[] = []
    let arr2: any[] = state
    props.inputs.push("--please input value--")
    for (let i = 0; i < state[0].length; i++) {
      arr.push("0")
    }
    arr2.push(arr)
    setState(arr2)
    props.proceed()
  }

  const deleteRow = (row: number) => {
    if (props.inputs.length === 1) return
    let arr: any[] = state
    props.inputs.splice(row, 1)
    arr.splice(row, 1)
    setState(arr)
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
    <div className="mb-3">

      <table className="table table-bordered table-responsive" style={{borderWidth: 0}}>
        <thead className="thead-light">
        <tr>
          <th style={{background: "lightgray"}}>
            {props.corner}
          </th>
          {props.header.map((value: string, idx: number) => {
            return (
              <th key={idx.toString()} style={{background: "deepskyblue", textAlign: "center"}}>
                {props.headerType === "select"
                  ? <select style={{border: 0, background: "deepskyblue"}} value={value}
                            onChange={() => (handleChangeHeader(event, idx))}>
                    <option key={"choose"} value="chose">--Please choose an option--</option>
                    {props.selectCol.map((option: string) => <option key={option} value={option}>{option}</option>)}
                  </select>
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
                  ? <select style={{border: 0, background: "yellow"}} value={value}
                            onChange={() => (handleChangeInput(event, row))}>
                    <option key={"choose"} value="chose">--Please choose an option--</option>
                    {props.selectRow.map((option: string) => <option key={option} value={option}>{option}</option>)}
                  </select>
                  : props.inputType === "input"
                    ? <input type="text" style={{border: 0, background: "yellow"}} defaultValue={value}
                             onBlur={() => (handleChangeInput(event, row))}/>
                    : value}
              </td>

              {state[row].map((value: string, col: number) => {
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
                           onChange={() => (handleChangeData(event, row, col))}
                    />
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
              ? <td style={{backgroundColor: "mediumspringgreen", textAlign: "center", color: "white"}}
                    onClick={addRow}>+</td>
              : <td style={{borderWidth: 0}}/>
            }
            {
              props.dynCols &&
              //@ts-ignore
              state[0].map((value: any, col: number) => {
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
