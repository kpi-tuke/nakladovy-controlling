import '../../App.css';
import TableDynamic from "../TableDynamic";
import Result4 from "../results/Result4";
import {useEffect, useState} from "react";
import SingleInput from "../SingleInput";

export default function Task4() {

  let [getResult, setResult] = useState({
    volumes: [],
    prices: [],
    costs: [],
    fixCost: [],
    inputs: [],
    fixTotal: [],
    minProfit: []
  })

  let state = useState({
    header: ["Výroba", "Cena/tona", "Variabilné náklady/tona", "Fixné náklady"],
    inputs: ["Výrobok A",],
    data: [
      ["100", "8", "6", "50"]
    ],
    fixTotal: [0],
    minProfit: [0]
  })
  const task4 = () => {
    let volumes: number[] = []
    let prices: number[] = []
    let costs: number[] = []
    let fixCost: number[] = []
    let fixTotal: number[] = []
    let minProfit: number[] = []

    for (let i = 0; i < state[0].inputs.length; i++) {
      volumes.push(0)
      prices.push(0)
      costs.push(0)
      fixCost.push(0)
    }
    fixTotal.push(0)
    minProfit.push(0)

    state[0].data.map((rowData: string[], idx: number) => {
      volumes[idx] = parseInt(rowData[0])
      prices[idx] = parseInt(rowData[1])
      costs[idx] = parseInt(rowData[2])
      fixCost[idx] = parseInt(rowData[3])
    })

    fixTotal[0] = state[0].fixTotal[0]
    minProfit[0] = state[0].minProfit[0]

    setResult({
      // @ts-ignore
      volumes: volumes,
      // @ts-ignore
      prices: prices,
      // @ts-ignore
      costs: costs,
      // @ts-ignore
      fixCost: fixCost,
      // @ts-ignore
      inputs: state[0].inputs,
      // @ts-ignore
      fixTotal: fixTotal,
      // @ts-ignore
      minProfit: minProfit
    })
  }


  useEffect(task4, [])

  return (
    <div className={"scrollbox-lg"} style={{height: "100vh"}}>
      <div className={"row"} style={{paddingLeft: 10, paddingRight: 10, marginTop: 10}}>
        <div className={"col-5"}>
          <TableDynamic header={state[0].header}
                        inputs={state[0].inputs}
                        data={state[0].data}
                        rows={1} cols={4}
                        dynRows={true} dynCols={false}
                        proceed={task4}
          />
        </div>

        <div className={"col"}>

          <div className={"row"}>
            <SingleInput input={state[0].fixTotal} title={"CELKOVÉ FIXNÉ NÁKLADY"} proceed={task4}/>
            <SingleInput input={state[0].minProfit} title={"MINIMÁLNY ZISK"} proceed={task4}/>
          </div>

        </div>

      </div>

      <div>
        <Result4 result={getResult}/>
      </div>
    </div>
  )

}
