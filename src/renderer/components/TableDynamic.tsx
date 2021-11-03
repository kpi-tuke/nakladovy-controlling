import '../App.css';
import {useState} from "react";
import {Link} from "react-router-dom";

export default function TableDynamic(props: any) {

  const [getState, setState] = useState({rows: props.rows, cols: props.cols})

  const handleChangeData = function (event: any, row: number, col: number) {
    props.data[row][col] = event.target.value
  }

  const handleChangeHeader = function (event: any, idx: number,) {
    props.header[idx] = event.target.value
  }

  const addColumn = () => {
    props.header.push((parseInt(props.header[props.header.length-1])+1).toString())
    props.data.map((value: any) => {
      value.push('0')
    })
    setState({cols: getState.cols + 1, rows: getState.rows})

  }

  const addRow = () => {
    let arr = []
    for (let i = 0; i < props.data[0].length; i++) {
      arr.push('0')
    }
    props.data.push(arr)
    setState({cols: getState.cols, rows: getState.rows + 1})

  }

  return (
    <div className="card mb-3">
      <div className="card-header">
        <h3 className="caption">{props.title}</h3>
        <button onClick={
          () => {
            props.proceed({inputs:props.inputs, header:props.header, data:props.data}, props.handler)
          }
        }><Link to={"/results"}>Results</Link></button>
      </div>
      <table className="table table-bordered table-responsive">
        <thead className="thead-light">
        <tr>
          <th className="sorting">
            Ukazovatel
          </th>
          {props.header.map((x: string, idx: number) => {
            // @ts-ignore
            return <th><input type="text" className="input-group-text" style={{border: 0}} defaultValue={x}
                              onChange={() => (handleChangeHeader(event, idx))}/></th>
          })}
        </tr>

        </thead>
        <tbody>
        {props.data.map((value: any, row: number) => {
          console.log(value)
          return (
            <tr>
              <td>{props.inputs[row]}</td>

              {props.data[row].map((value: string, col: number) => {
                return (
                  <td><input type="text" style={{border: 0, textAlign: "center"}} defaultValue={value}
                             onChange={() => (handleChangeData(event, row, col))}/></td>
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
