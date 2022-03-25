import TableDynamic from '../TableDynamic';
import Result6 from '../results/Result6';
import { useEffect, useState } from 'react';
import HeaderBar from '../HeaderBar';
import { useAppSelector } from 'renderer/store/hooks';
import {paretoActions, selectPareto} from 'renderer/store/slice';
import TextField from "../TextField";

export default function Task6() {
  //kolmica na os x v bode kde ma krivka hodnotu 80%
  let [getResult, setResult] = useState({
    causes: [],
    percentages: [],
    values: [],
    kumul: [],
    valuesKumul: []
  });

  const { headers, values, items, data, text } = useAppSelector(selectPareto);

  const task6 = () => {
    let valuesWithCauses: Map<string,number> = new Map<string, number>()
    let values: number[] = [];
    let valuesKumul: number[] = []
    let percentages: number[] = [];
    let percentagesKumul: number[] = [];
    let sum: number = 0;
    let causes: string[] = []

    for (let i = 0; i < items.length; i++) {
      percentages.push(0);
      percentagesKumul.push(0);
    }
    for (let i = 0; i < items.length; i++) {
      valuesWithCauses.set(items[i], parseFloat(data[i][0]))
      sum = sum + parseInt(data[i][0]);
    }
    let map: Map<string,number> = new Map([...valuesWithCauses.entries()].sort((a, b) => b[1] - a[1]))
    let temp = 0;
    var idx = 0
    var val = 0
    for (const [key, value] of map.entries()) {
      temp = temp + (value * 100) / sum;
      val = val + value
      valuesKumul[idx] = val
      percentages[idx] = Math.round((value * 10000) / sum) / 100;
      percentagesKumul[idx] = Math.round(temp * 100) / 100;
      causes.push(key)
      values.push(value)
      idx++
    }

    setResult({
      // @ts-ignore
      causes: causes,
      // @ts-ignore
      percentages: percentages,
      // @ts-ignore
      values: values,
      // @ts-ignore
      kumul: percentagesKumul,
      // @ts-ignore
      valuesKumul: valuesKumul,
      sum: sum,
    });
  };

  useEffect(task6, [items, headers, data, values, text]);

  return (
    <div className={'task-container'}>
      <HeaderBar title={'Pareto analýza nákladov'} />

      <h1 className={'result-h1'}>Vstupy</h1>

      <TableDynamic
        corner={'Príčina'}
        headerType={'text'}
        header={headers}
        inputType={'input'}
        inputs={items}
        data={data}
        values={values}
        rows={7}
        cols={2}
        dynRows={true}
        dynCols={false}
        actions={paretoActions}
      />
      <Result6 result={getResult} />

      <TextField text={text} action={paretoActions.changeText}/>
    </div>
  );
}
