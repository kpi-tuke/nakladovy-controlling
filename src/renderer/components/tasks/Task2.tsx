import '../../App.css';
import TableDynamic from "../TableDynamic";
import {useEffect, useState} from "react";
import ResultStructure from "../results/ResultStructure";

export default function Task2() {

  let state = useState({
    header: ["mzdy"], inputs: ["naklad"], data: [
      ["1"]
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
    <div>
      <TableDynamic taskName={"Štruktúra"}
                    header={state[0].header}
                    inputs={state[0].inputs}
                    data={state[0].data}
                    rows={2} cols={0}
                    dynRows={true} dynCols={true}
                    proceed={task2}
      />

      <button onClick={task2}>Sync</button>

      <ResultStructure result={getResult}/>
    </div>
  )
}
