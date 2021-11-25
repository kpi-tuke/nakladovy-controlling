import '../App.css';
import {useState} from "react";

export default function TableDynamic(props: any) {

  const [getState, setState] = useState({rows: props.rows, cols: props.cols})
  const [count, setCount] = useState(0)
  const handleChangeData = function (event: any, row: number, col: number) {
    props.data[row][col] = event.target.value === ''
      ? "0"
      : event.target.value
    props.proceed()
  }

  const handleChangeHeader = function (event: any, idx: number,) {
    props.header[idx] = event.target.value

    setCount(count + 1)
    setState({cols: getState.cols + 1, rows: getState.rows})
    props.proceed()
  }

  const handleChangeInput = function (event: any, idx: number,) {
    props.inputs[idx] = event.target.value
    props.proceed()
    setCount(count + 1)
    setState({cols: getState.cols + 1, rows: getState.rows})
  }

  const addColumn = () => {
    props.header.push((parseInt(props.header[props.header.length - 1]) + 1).toString())
    props.data.map((value: any) => {
      value.push(0)
    })
    setState({cols: getState.cols + 1, rows: getState.rows})

  }

  const addRow = () => {
    let arr: number[] = []
    props.inputs.push("--please input value--")
    for (let i = 0; i < props.data[0].length; i++) {
      arr.push(0)
    }
    props.data.push(arr)
    setState({cols: getState.cols, rows: getState.rows + 1})

  }

  return (
    <div className="mb-3">

      <table className="table table-bordered table-responsive">
        <thead className="thead-light">
        <tr>
          <th style={{background: "mediumspringgreen"}}>
            {props.corner}
          </th>
          {props.header.map((value: string, idx: number) => {
            return (
              <th key={idx.toString()} style={{background: "deepskyblue"}}>
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
                           defaultValue={value}
                           onBlur={() => (handleChangeData(event, row, col))}/>
                  </td>
                )
              })}
              {row === 0 && props.dynCols
                ? <td rowSpan={props.data.length} onClick={addColumn}>+</td>
                : console.log('else')}
            </tr>)
        })
        }
        {props.dynRows
          ? <tr>
              <td colSpan={props.header.length + 1} onClick={addRow}>+</td>
            </tr>
          : console.log("dynamic rows disabled")
        }
        </tbody>
      </table>

    </div>
  );
};
