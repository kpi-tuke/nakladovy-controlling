import '../../App.css';
import Result3 from "../results/Result3";
import {useEffect, useState} from "react";
import HeaderBar from '../HeaderBar';
import groupedOptions from "../chartOfAccounts";
import TableDynamic from "../TableDynamic";

export default function Task3() {
  let [getResult, setResult] = useState({
    headers: [],
    costSumsForYears: [],
    incomeSumsForYears: [],
    costSumBase: 0,
    incomeSumBase: 0,
    chainIndexes: [],
    baseIndexes: [],
    costDiff: [],
    incomeDiff: [],
    reaction: [],
    items: [],
    betweenYears: []
  })

  // @ts-ignore
  const [headers, setHeaders] = useState<string[]>(["2000", "2001"])
  // @ts-ignore
  const [items, setItems] = useState<string[]>(['501 – Spotreba materiálu', "666 – Výnosy z krátkodobého finančného majetku"])
  // @ts-ignore
  const [data, setData] = useState<string[][]>([["1", "2"], ["3", "4"]])
  // @ts-ignore
  const [values, setValues] = useState<number[]>([501, 666])

  // @ts-ignore
  const [baseData, setBaseData] = useState<string[]>([["2"], ["3"]])
  // @ts-ignore
  const [baseItems, setBaseItems] = useState<string[]>(['501 – Spotreba materiálu', "666 – Výnosy z krátkodobého finančného majetku"])
  // @ts-ignore
  const [baseValues, setBaseValues] = useState<number[]>([501, 666])

  const task3 = () => {
    let costSumsForYears: number[] = []
    let incomeSumsForYears: number[] = []
    let costSumBase: number = 0
    let incomeSumBase: number = 0
    let chainIndexes: number[] = []
    let baseIndexes: number[] = []
    let incomeDiff: number[] = []
    let costDiff: number[] = []
    let reaction: number[] = []
    let betweenYears: string[] = []

    for (let i = 0; i < headers.length; i++) {
      costSumsForYears.push(0)
      incomeSumsForYears.push(0)
    }

    data.map((rowData, row) => {
      values[row] >= 600
        ? rowData.map(((value, col) => {
            incomeSumsForYears[col] = incomeSumsForYears[col] + parseFloat(value === "" ? "0" : value)
          }
        ))
        : rowData.map(((value, col) => {
            costSumsForYears[col] = costSumsForYears[col] + parseFloat(value === "" ? "0" : value)
          }
        ))
    })

    baseData.map((rowData, row) => {
      baseValues[row] >= 600
        ? incomeSumBase = incomeSumBase + parseFloat(rowData[0] === "" ? "0" : rowData[0])
        : costSumBase = costSumBase + parseFloat(rowData[0] === "" ? "0" : rowData[0])
    })

    for (let i = 0; i < headers.length - 1; i++) {
      chainIndexes[i] = Math.round((costSumsForYears[i + 1] / costSumsForYears[i]) * 100) / 100
      incomeDiff[i] = incomeSumsForYears[i + 1] * 100 / incomeSumsForYears[i] - 100
      costDiff[i] = costSumsForYears[i + 1] * 100 / costSumsForYears[i] - 100
      reaction[i] = Math.round(costDiff[i] / incomeDiff[i] * 100) / 100
      incomeDiff[i] = Math.round(incomeDiff[i] * 100) / 100
      costDiff[i] = Math.round(costDiff[i] * 100) / 100
      betweenYears[i] = headers[i] + "/" + headers[i + 1]
    }


    for (let i = 0; i < headers.length; i++) {
      baseIndexes[i] = Math.round((costSumsForYears[i] / costSumBase) * 100) / 100
    }

    // @ts-ignore
    setResult({
      // @ts-ignore
      headers,
      // @ts-ignore
      costSumsForYears,
      // @ts-ignore
      incomeSumsForYears,
      costSumBase,
      incomeSumBase,
      // @ts-ignore
      chainIndexes,
      // @ts-ignore
      baseIndexes,
      // @ts-ignore
      costDiff,
      // @ts-ignore
      incomeDiff,
      // @ts-ignore
      reaction,
      // @ts-ignore
      items,
      // @ts-ignore
      betweenYears
    })
  }

  useEffect(task3, [])

  return (
    <div className={'scrollbox-lg'} style={{height: '100vh'}}>

      <HeaderBar title={'Analýza reťazových a bázických indexov'}/>

      <div className={"row p-1"}>

        <div className={"col-8"}>
          <TableDynamic
            corner={'Ekonomická položka'}
            headerType={'input'}
            header={headers}
            inputType={'select'}
            inputs={items}
            data={data}
            values={values}
            dynRows={true}
            dynCols={true}
            selectRow={groupedOptions}
            proceed={task3}
          />
        </div>

        <div className={"col-4"}>
          <TableDynamic
            corner={'Ekonomická položka'}
            headerType={'text'}
            header={["Bázický rok"]}
            inputType={'select'}
            inputs={baseItems}
            data={baseData}
            values={baseValues}
            dynRows={true}
            selectRow={groupedOptions}
            proceed={task3}
          />
        </div>
      </div>
      <div>
        <Result3 result={getResult}/>
      </div>
    </div>
  );
}
