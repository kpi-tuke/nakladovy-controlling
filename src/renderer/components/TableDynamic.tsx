import '../App.css';
import Select from "react-select";

export default function TableDynamic(props: any) {

  const handleChangeData = function (event: any, row: number, col: number) {
    props.data[row][col] = event.target.value === ''
      ? ""
      : event.target.value
    props.proceed()
  }

  const handleChangeHeader = function (e: any, idx: number,) {
    let arr: string[] = []
    for (let i = 0; i < props.header.length; i++) {
      arr[i] = props.header[i]
      if (i === idx) {
        arr[i] = e.label || e.value
      }
    }
    props.setHeader(arr)
    props.proceed()
  }

  const handleChangeInput = function (e: any, idx: number,) {

    let arr: string[] = []
    for (let i = 0; i < props.inputs.length; i++) {
      arr[i] = props.inputs[i]
      if (i === idx) {
        arr[i] = e.label || e.value
      }
    }
    props.setInputs(arr)
    props.values[idx] = e.value
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
    let arr: any[] = []
    props.inputs.push("--please input value--")
    for (let i = 0; i < props.header.length; i++) {
      arr.push("0")
    }
    props.data.push(arr)
    props.proceed()
  }

  const deleteRow = (row: number) => {
    if (props.inputs.length === 1) return
    props.inputs.splice(row, 1)
    props.data.splice(row, 1)
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

      <table className={"table table-bordered table-responsive"} style={{borderWidth: 0}}>
        <thead className={"thead-light thead-"}>
        <tr>
          <th style={{background: "lightgray", textAlign: "center", minWidth: 250}}>
            {props.corner}
          </th>
          {props.header.map((value: string, idx: number) => {
            return (
              <th key={idx.toString()} style={{background: "deepskyblue", textAlign: "center"}}>
                {props.headerType === "select"
                  ? <Select value={{label: value}} options={props.selectCol}
                            onChange={(e) => (handleChangeHeader(e, idx))}/>
                  : props.headerType === "input"
                    ? <input type="text"
                             className="input-group-text"
                             style={{border: 0, margin: 0, padding: 0, background: "deepskyblue"}}
                             defaultValue={value}
                             onBlur={(e) => (handleChangeHeader(e.target, idx))}/>
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
                  ? <Select value={{label: value}} options={props.selectRow}
                            onChange={(e) => (handleChangeInput(e, row))}/>
                  : props.inputType === "input"
                    ? <input type="text" style={{border: 0, padding: 0, margin: 0, background: "yellow"}}
                             defaultValue={value}
                             onBlur={(e) => (handleChangeInput(e.target, row))}/>
                    : value}
              </td>

              {props.data[row].map((value: string, col: number) => {
                return (
                  <td key={row + ":" + col} style={{textAlign: "center", padding: 0}}>
                    <input type="text"
                           style={{
                             border: 0,
                             height: 50,
                             textAlign: "center",
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
