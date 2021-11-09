import '../../App.css';
import TableDynamic from "../TableDynamic";
import ResultEficience from "../results/ResultEficience";
import {useEffect, useState} from "react";

export default function Task1() {

  let [getResult, setResult] = useState({cost: 0, income: 0})

  let state = useState({
    header: ["2000", "2001"], inputs: ["Vynos", "Naklad"], data: [
      ["3", "3"],
      ["2", "1"]
    ]
  })


  const task1 = function () {
    let cost: number = 0
    let income: number = 0

    state[0].data[0].map((value: string) => {
      income += parseInt(value)
    })
    state[0].data[1].map((value: string) => {
      cost += parseInt(value)
    })
    setResult({cost: cost, income: income})
  }

  useEffect(task1, [])

  return (
    <div>
      <TableDynamic taskName={"Hospodarenie"}
                    header={state[0].header}
                    inputs={state[0].inputs}
                    data={state[0].data}
                    rows={2} cols={0}
                    dynRows={false} dynCols={true}
                    proceed={task1}
      />

      <button onClick={task1}>Sync</button>

      <ResultEficience result={getResult}/>
    </div>
  )
}
