import '../../App.css';
import TableDynamic from "../TableDynamic";
import {useEffect, useState} from "react";
import Result2 from "../results/Result2";

export default function Task2() {

  let state = useState({
    header: [""],
    inputs: [""],
    data: [["1"]],
    selectRow: [
      "Materiálové náklady",
      "Služby",
      "Mzdové a osobné náklady",
      "Zákonne sociálne poistenie",
      "Odpisy",
      "Daň z nehnuteľnosti"
    ],
    selectCol: [
      "Priamy materiál",
      "Priame mzdy",
      "Výrobná réžia",
      "Správna réžia"
    ]
  })

  let [getResult, setResult] = useState({inputs: [], header: [], rowSums: [], colSums: [], totalCost: 0})

  const task2 = () => {
    let rowSums: number[] = []
    let colSums: number[] = []
    let inputs: string[] = []
    let header: string[] = []
    for (let i = 0; i < state[0].inputs.length; i++) {
      rowSums.push(0)
      inputs.push(state[0].inputs[i])
    }
    for (let i = 0; i < state[0].header.length; i++) {
      colSums.push(0)
      header.push(state[0].header[i])
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

    const totalCost: number = rowSums.reduce((a: number, b: number) => a + b, 0)

    setResult({
      // @ts-ignore
      inputs: inputs,
      // @ts-ignore
      header: header,
      // @ts-ignore
      rowSums: rowSums,
      // @ts-ignore
      colSums: colSums,
      // @ts-ignore
      totalCost: totalCost
    })
  }

  useEffect(task2, [])

  return (
    <div className={"scrollbox-lg"} style={{height: "100vh"}}>

      <TableDynamic corner={"↓Druhové | Kalkulačné→"}
                    headerType={"select"}
                    header={state[0].header}
                    inputType={"select"}
                    inputs={state[0].inputs}
                    data={state[0].data}
                    rows={1} cols={1}
                    dynRows={true} dynCols={true}
                    proceed={task2}
                    selectRow={state[0].selectRow}
                    selectCol={state[0].selectCol}
      />

      <Result2 result={getResult}/>

    </div>
  )
}
