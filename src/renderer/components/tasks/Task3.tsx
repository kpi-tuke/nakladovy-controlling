import '../../App.css';
import TableType from "../TableType";
import Result3 from "../results/Result3";
import {useEffect, useState} from "react";

export default function Task3() {

  let [getResult, setResult] = useState({header: [], costSums: [], incomeSums: []})

  let state = useState({
    header: ["2000", "2001"],
    inputs: ["Mzdy", "Naklady"],
    data: [
      ["2", "4"],
      ["1", "3"]
    ],
    types: [true, false]
  })

  const task3 = () => {
    let costSums: number[] = []
    let incomeSums: number[] = []
    for (let i = 0; i < state[0].header.length; i++) {
      costSums.push(0)
      incomeSums.push(0)
    }
    state[0].data.map((rowData: string[], row: number) => {
      state[0].types[row]
        ? rowData.map((value: string, idx: number) => {
          incomeSums[idx] = incomeSums[idx] + parseInt(value)
        })
        : rowData.map((value: string, idx: number) => {
          costSums[idx] = costSums[idx] + parseInt(value)
        })
    })
    console.log(incomeSums)
    // @ts-ignore
    setResult({header: state[0].header, costSums: costSums, incomeSums: incomeSums})
  }

  useEffect(task3, [])

  return (
    <div className={"scrollbox-lg"} style={{height: "100vh"}}>

      <div>
        <TableType taskName={"Koeficient reakcie"}
                   header={state[0].header}
                   inputs={state[0].inputs}
                   data={state[0].data}
                   types={state[0].types}
                   rows={2} cols={2}
                   dynRows={true} dynCols={false}
                   proceed={task3}
        />
      </div>
      <div>
        <Result3 result={getResult}/>
      </div>

    </div>
  )
}
