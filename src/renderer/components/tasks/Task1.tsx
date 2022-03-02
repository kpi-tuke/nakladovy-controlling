import '../../App.css';
import TableDynamic from "../TableDynamic";
import Result1 from "../results/Result1";
import {useEffect, useState} from "react";
import HeaderBar from '../HeaderBar';

export default function Task1() {

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
    ]
  })
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

    state[0].data[0].map((value: string) => {
      incomeTotal += parseFloat(value)
      incomeData.push(parseFloat(value))
    })
    state[0].data[1].map((value: string) => {
      costTotal += parseFloat(value)
      costData.push(parseFloat(value))
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
  //moznost pridat viac poloziek z učtovej osnovy
  return (
    <div className={"scrollbox-lg"} style={{height: "100vh"}}>

      <HeaderBar title={"Ekonomická analýza hospodárenia"}/>

      <TableDynamic corner={"Ekonomická položka"}
                    headerType={"input"}
                    header={state[0].header}
                    inputType={"text"}
                    inputs={state[0].inputs}
                    data={state[0].data}
                    rows={2} cols={2}
                    dynRows={false} dynCols={true}
                    proceed={task1}
      />

      <Result1 result={getResult}/>

    </div>
  )
}
