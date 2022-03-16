import '../../App.css';
import Result3 from "../results/Result3";
import {useEffect, useState} from "react";
import HeaderBar from '../HeaderBar';
import groupedOptions from "../chartOfAccounts";
import TableDynamic from "../TableDynamic";
import {baseIndexActions, chainActions, selectBase, selectChain} from 'renderer/store/slice';
import {useSelector} from 'react-redux';

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

  const { headers, items, data, values } = useSelector(selectChain);
  const baseState = useSelector(selectBase);

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
      parseInt(values[row]) >= 600
        ? rowData.map((value, col) => {
            incomeSumsForYears[col] =
              incomeSumsForYears[col] + parseFloat(value === '' ? '0' : value);
          })
        : rowData.map((value, col) => {
            costSumsForYears[col] =
              costSumsForYears[col] + parseFloat(value === '' ? '0' : value);
          });
    })

    baseState.data.map((rowData, row) => {
      parseInt(baseState.values[row]) >= 600
        ? incomeSumBase = incomeSumBase + parseFloat(rowData[0] === "" ? "0" : rowData[0])
        : costSumBase = costSumBase + parseFloat(rowData[0] === "" ? "0" : rowData[0])
    })

    for (let i = 0; i < headers.length - 1; i++) {
      if (costSumsForYears[i] === 0)
        chainIndexes[i] = 0
      else
        chainIndexes[i] = Math.round((costSumsForYears[i + 1] / costSumsForYears[i]) * 100) / 100

      if (incomeSumsForYears[i] === 0)
        incomeDiff[i] = 0
      else
        incomeDiff[i] = incomeSumsForYears[i + 1] * 100 / incomeSumsForYears[i] - 100

      if (costSumsForYears[i] === 0)
        costDiff[i] = 0
      else
        costDiff[i] = costSumsForYears[i + 1] * 100 / costSumsForYears[i] - 100

      if (incomeDiff[i] === 0)
        reaction[i] = 0
      else
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

  useEffect(task3, [headers, items, data, values, baseState])

  return (
    <div style={{height: '100vh', overflow: "auto"}}>

      <HeaderBar title={'Analýza reťazových a bázických indexov'}/>

      <div className={"row"}>

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
            actions={chainActions}
          />
        </div>

        <div className={"col-4"}>
          {
            <TableDynamic
              corner={'Ekonomická položka'}
              headerType={'text'}
              header={baseState.headers}
              inputType={'select'}
              inputs={baseState.items}
              data={baseState.data}
              values={baseState.values}
              dynCols={false}
              dynRows={true}
              selectRow={groupedOptions}
              actions={baseIndexActions}
            />
          }
        </div>
      </div>
      <div>
        <Result3 result={getResult}/>
      </div>
    </div>
  );
}
