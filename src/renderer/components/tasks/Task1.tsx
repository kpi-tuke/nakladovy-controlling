import '../../App.css';
import TableType from "../TableType";
import Result1 from "../results/Result1";
import {useEffect, useState} from "react";
import HeaderBar from '../HeaderBar';
import inputOptions from "../chartOfAccounts"

export default function Task1() {
  //konkretne položky
  let [getResult, setResult] = useState(
    {
      // @ts-ignore
      header: [],
      // @ts-ignore
      costTotal: 0,
      // @ts-ignore
      incomeTotal: 0,
      // @ts-ignore
      profitTotal: 0,
      // @ts-ignore
      costData: [],
      // @ts-ignore
      incomeData: [],
      // @ts-ignore
      profitData: [],
      // @ts-ignore
      incomeProfitabilityData: [],
      // @ts-ignore
      costProfitabilityData: [],
      // @ts-ignore
      costEfficiencyData: [],
      // @ts-ignore
      costIndicatorData: [],
      // @ts-ignore
      costFlow: [],
      // @ts-ignore
      incomeFlow: [],
      // @ts-ignore
      profitFlow: []
    }
  )

  let state = useState({
    header: ["2000", "2001"],
    inputs: ["Výnosy", "Náklady"],
    data: [
      ["2", "4"],
      ["1", "3"]
    ],
    types: [true, false],
  })

  // const header = useState<string[]>(["2000"])

  const makeArray = (numerator: number[], denominator: number[]): number[] => {
    let arr: number[] = []
    for (let i = 0; i < state[0].header.length; i++) {
      if (numerator[i] === 0 || denominator[i] === 0) arr.push(0)
      else arr.push(Math.round(100 * numerator[i] / denominator[i]) / 100)
    }
    return arr
  }

  const task1 = () => {

    let costTotal: number = 0
    let incomeTotal: number = 0
    let costData: number[] = []
    let incomeData: number[] = []
    let profitData: number[] = []
    let header: string[] = []

    for (let i = 0; i < state[0].header.length; i++) {
      incomeData.push(0)
      costData.push(0)
    }

    console.log(state[0].data)
    state[0].data.map((rowData: string[], row: number) => {

      state[0].types[row]
        ? rowData.map((value: string, col: number) => {
          incomeTotal += parseFloat(value)
          incomeData[col] = incomeData[col] + parseFloat(value)
        })
        : rowData.map((value: string, col: number) => {
          costTotal += parseFloat(value)
          costData[col] = costData[col] + parseFloat(value)
        })
    })

    for (let i = 0; i < state[0].header.length; i++) {
      profitData.push(incomeData[i] - costData[i])
      header.push(state[0].header[i])
    }

    let incomeProfitabilityData: number[] = makeArray(profitData, incomeData);
    let costProfitabilityData: number[] = makeArray(profitData, costData);
    let costEfficiencyData: number[] = makeArray(incomeData, costData);
    let costIndicatorData: number[] = makeArray(costData, incomeData);

    let profitFlow: number[] = []
    let costFlow: number[] = []
    let incomeFlow: number[] = []

    for (let i = 0; i < state[0].header.length; i++) {
      profitFlow[i] = 0
      for (let j = 0; j <= i; j++) {
        profitFlow[i] += profitData[j]
      }
    }

    for (let i = 0; i < state[0].header.length; i++) {
      costFlow[i] = 0
      for (let j = 0; j <= i; j++) {
        costFlow[i] += costData[j]
      }
    }

    for (let i = 0; i < state[0].header.length; i++) {
      incomeFlow[i] = 0
      for (let j = 0; j <= i; j++) {
        incomeFlow[i] += incomeData[j]
      }
    }

    let profitTotal: number = incomeTotal - costTotal


    setResult({
      // @ts-ignore
      header,
      // @ts-ignore
      costTotal,
      // @ts-ignore
      incomeTotal,
      // @ts-ignore
      profitTotal,
      // @ts-ignore
      costData,
      // @ts-ignore
      incomeData,
      // @ts-ignore
      profitData,
      // @ts-ignore
      incomeProfitabilityData,
      // @ts-ignore
      costProfitabilityData,
      // @ts-ignore
      costEfficiencyData,
      // @ts-ignore
      costIndicatorData,
      // @ts-ignore
      costFlow,
      // @ts-ignore
      incomeFlow,
      // @ts-ignore
      profitFlow
    })
  }

  useEffect(task1, [])

  return (
    <div className={"scrollbox-lg"} style={{height: "100vh"}}>

      <HeaderBar title={"Ekonomická analýza hospodárenia"}/>

      <TableType corner={"Ekonomická položka"}
                 headerType={"input"}
                 header={state[0].header}
                 inputType={"select"}
                 inputs={state[0].inputs}
                 data={state[0].data}
                 types={state[0].types}
                 rows={2} cols={2}
                 dynRows={true} dynCols={true}
                 proceed={task1}
                 selectRow={inputOptions}
      />

      <Result1 result={getResult}/>

    </div>
  )
}
