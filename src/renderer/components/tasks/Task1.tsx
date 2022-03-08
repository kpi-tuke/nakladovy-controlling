import '../../App.css';
import Result1 from "../results/Result1";
import {useEffect, useState} from "react";
import HeaderBar from '../HeaderBar';
import groupedOptions from "../chartOfAccounts"
import TableDynamic from "../TableDynamic";

export default function Task1() {

  let [getResult, setResult] = useState(
    {
      headers: [],
      costTotal: 0,
      incomeTotal: 0,
      profitTotal: 0,
      costData: [],
      incomeData: [],
      profitData: [],
      incomeProfitabilityData: [],
      costProfitabilityData: [],
      costEfficiencyData: [],
      costIndicatorData: []
    }
  )

  // @ts-ignore
  const [headers, setHeaders] = useState<string[]>(["2000", "2001"])
  // @ts-ignore
  const [items, setItems] = useState<string[]>(['501 – Spotreba materiálu', "666 – Výnosy z krátkodobého finančného majetku"])
  // @ts-ignore
  const [data, setData] = useState<string[][]>([["1", "2"], ["3", "4"]])
  // @ts-ignore
  const [values, setValues] = useState<number[]>([501, 666])

  const divideArrays = (numerator: number[], denominator: number[]): number[] => {
    let arr: number[] = []
    for (let i = 0; i < headers.length; i++) {
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

    for (let i = 0; i < headers.length; i++) {
      incomeData.push(0)
      costData.push(0)
    }

    data.map((rowData: string[], row: number) => {
      values[row] >= 600
        ? rowData.map((value: string, col: number) => {
          incomeTotal += parseFloat(value === "" ? "0" : value)
          incomeData[col] = incomeData[col] + parseFloat(value === "" ? "0" : value)
        })
        : rowData.map((value: string, col: number) => {
          costTotal += parseFloat(value === "" ? "0" : value)
          costData[col] = costData[col] + parseFloat(value === "" ? "0" : value)
        })
    })

    for (let i = 0; i < headers.length; i++) {
      profitData.push(incomeData[i] - costData[i])
    }

    let incomeProfitabilityData: number[] = divideArrays(profitData, incomeData);
    let costProfitabilityData: number[] = divideArrays(profitData, costData);
    let costEfficiencyData: number[] = divideArrays(incomeData, costData);
    let costIndicatorData: number[] = divideArrays(costData, incomeData);

    let profitTotal: number = incomeTotal - costTotal


    setResult({
      // @ts-ignore
      headers,
      costTotal,
      incomeTotal,
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
      costIndicatorData
    })
  }

  useEffect(task1, [])

  return (
    <div className={"scrollbox-lg"} style={{height: "100vh"}}>

      <HeaderBar title={"Ekonomická analýza hospodárenia"}/>

      <TableDynamic corner={"Ekonomická položka"}
                    headerType={"input"}
                    header={headers}
                    inputType={"select"}
                    inputs={items}
                    data={data}
                    values={values}
                    dynRows={true}
                    dynCols={true}
                    proceed={task1}
                    selectRow={groupedOptions}
      />

      <Result1 result={getResult}/>

    </div>
  )
}
