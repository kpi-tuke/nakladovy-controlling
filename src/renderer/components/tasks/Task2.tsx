import '../../App.css';
import TableDynamic from "../TableDynamic";
import {useEffect, useState} from "react";
import Result2 from "../results/Result2";

export default function Task2() {

  let state = useState({
    header: ["mzdy", "rezia"],
    inputs: ["naklad", "material"],
    data: [
      ["1", "4"],
      ["5", "10"]
    ]
  })

  let [getResult, setResult] = useState({inputs: state[0].inputs, header: state[0].header, rowSums: [], colSums: []})

  const task2 = () => {
    let rowSums: number[] = []
    let colSums: number[] = []

    for (let i = 0; i < state[0].inputs.length; i++) {
      rowSums.push(0)
    }
    for (let i = 0; i < state[0].header.length; i++) {
      colSums.push(0)
    }

    state[0].data.map((value: string[], row: number) => {
      value.map((x: string) => {
        rowSums[row] = rowSums[row] + parseInt(x)
      })
    })

    state[0].data.map((rowData: string[]) => {
      rowData.map((value: string, idx: number) => {
        colSums[idx] = colSums[idx] + parseInt(value)
      })
    })

    // @ts-ignore
    setResult({inputs: state[0].inputs, header: state[0].header, rowSums: rowSums, colSums: colSums})
  }

  useEffect(task2, [])

  return (
    <div className={"scrollbox-lg"} style={{height: "100vh"}}>

      <TableDynamic taskName={"Štruktúra"}
                    header={state[0].header}
                    inputs={state[0].inputs}
                    data={state[0].data}
                    rows={2} cols={2}
                    dynRows={true} dynCols={true}
                    proceed={task2}
      />

      <Result2 result={getResult}/>

    </div>
  )
}
