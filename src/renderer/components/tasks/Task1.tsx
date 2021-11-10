import '../../App.css';
import TableDynamic from "../TableDynamic";
import Result1 from "../results/Result1";
import {useEffect, useState} from "react";

export default function Task1() {

  let [getResult, setResult] = useState({cost: 0, income: 0, costData: [], incomeData: [], header: []})

  let state = useState({
    header: ["2000", "2001"],
    inputs: ["Vynos", "Naklad"],
    data: [
      ["2", "4"],
      ["1", "3"]
    ]
  })


  const task1 = function () {

    let totalCost: number = 0
    let totalIncome: number = 0
    let costData: number[] = []
    let incomeData: number[] = []

    state[0].data[0].map((value: string) => {
      totalIncome += parseInt(value)
      incomeData.push(parseInt(value))
    })
    state[0].data[1].map((value: string) => {
      totalCost += parseInt(value)
      costData.push(parseInt(value))
    })

    // @ts-ignore
    setResult({
      cost: totalCost,
      income: totalIncome,
      costData: costData,
      incomeData: incomeData,
      header: state[0].header
    })
  }

  useEffect(task1, [])

  return (
    <div className={"scrollbox-lg"} style={{height: "100vh"}}>
      <TableDynamic taskName={"Hospodarenie"}
                    header={state[0].header}
                    inputs={state[0].inputs}
                    data={state[0].data}
                    rows={2} cols={0}
                    dynRows={false} dynCols={true}
                    proceed={task1}
      />
      <Result1 result={getResult}/>

    </div>
  )
}
