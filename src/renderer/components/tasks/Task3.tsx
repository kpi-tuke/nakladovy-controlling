import Result3 from '../results/Result3';
import { useEffect, useState } from 'react';
import HeaderBar from '../HeaderBar';
import groupedOptions from '../chartOfAccounts';
import TableDynamic from '../TableDynamic';
import {chainActions, selectChain} from 'renderer/store/slice';
import { useSelector } from 'react-redux';
import TextField from "../TextField";

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
    betweenYears: [],
  });

  const { headers, items, data, values, text } = useSelector(selectChain);

  const task3 = () => {
    let costSumsForYears: number[] = [];
    let incomeSumsForYears: number[] = [];
    let costSumBase: number = 0;
    let incomeSumBase: number = 0;
    let chainIndexes: number[] = [];
    let baseIndexes: number[] = [];
    let incomeDiff: number[] = [];
    let costDiff: number[] = [];
    let reaction: number[] = [];
    let betweenYears: string[] = [];

    for (let i = 0; i < headers.length-1; i++) {
      costSumsForYears.push(0);
      incomeSumsForYears.push(0);
    }

    data.map((rowData, row) => {
      parseInt(values[row]) >= 600
          ? rowData.map((value, col) => {
            col === 0
              ? (incomeSumBase =
                incomeSumBase + parseFloat(value === '' ? '0' : value))
              :
              incomeSumsForYears[col-1] =
                incomeSumsForYears[col-1] + parseFloat(value === '' ? '0' : value);
            })
          : rowData.map((value, col) => {
            col === 0
              ? (costSumBase =
                costSumBase + parseFloat(value === '' ? '0' : value))
              :
              costSumsForYears[col-1] =
                costSumsForYears[col-1] + parseFloat(value === '' ? '0' : value);
            });
    });

    for (let i = 0; i < headers.length - 2; i++) {
      if (costSumsForYears[i] === 0) chainIndexes[i] = 0;
      else
        chainIndexes[i] =
          Math.round((costSumsForYears[i + 1] / costSumsForYears[i]) * 100) /
          100;

      if (incomeSumsForYears[i] === 0) incomeDiff[i] = 0;
      else
        incomeDiff[i] =
          (incomeSumsForYears[i + 1] * 100) / incomeSumsForYears[i] - 100;

      if (costSumsForYears[i] === 0) costDiff[i] = 0;
      else
        costDiff[i] =
          (costSumsForYears[i + 1] * 100) / costSumsForYears[i] - 100;

      if (incomeDiff[i] === 0) reaction[i] = 0;
      else reaction[i] = Math.round((costDiff[i] / incomeDiff[i]) * 100) / 100;

      incomeDiff[i] = Math.round(incomeDiff[i] * 100) / 100;
      costDiff[i] = Math.round(costDiff[i] * 100) / 100;
      betweenYears[i] = headers[i+1] + '/' + headers[i + 2];
    }

    for (let i = 0; i < headers.length-1; i++) {
      if (costSumBase === 0) baseIndexes[i] = 0;
      else
      baseIndexes[i] =
        Math.round((costSumsForYears[i] / costSumBase) * 100) / 100;
    }
    let newHeaders: string[] = []
    for (let i = 1; i<headers.length; i++){
      newHeaders.push(headers[i])
    }

    // @ts-ignore
    setResult({
      // @ts-ignore
      headers: newHeaders,
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
      betweenYears,
    });

  };

  useEffect(task3, [headers, items, data, values, text]);

  return (
    <div className={'task-container'}>

      <h1 className={"result-h1"}>Vstupy</h1>

      <HeaderBar
        title={'Analýza reťazových a bázických indexov druhových nákladov '}
      />

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
        base={true}
      />

      <Result3 result={getResult} />

      <TextField text={text} action={chainActions.changeText}/>
    </div>
  );
}
