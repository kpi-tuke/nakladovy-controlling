import TableDynamic from '../TableDynamic';
import Result6 from '../results/Result6';
import {useEffect, useState} from 'react';
import HeaderBar from '../HeaderBar';
import {useAppSelector} from 'renderer/store/hooks';
import {paretoActions, selectPareto} from 'renderer/store/slice';

export default function Task6() {
  //kolmica na os x v bode kde ma krivka hodnotu 80%
  let [getResult, setResult] = useState({
    causes: [],
    percentages: [],
    values: [],
    kumul: [],
  });

  const {headers, values, items, data} = useAppSelector(selectPareto);

  const task6 = () => {
    let values: number[] = [];
    let percentages: number[] = [];
    let kumul: number[] = [];
    let sum: number = 0;

    for (let i = 0; i < items.length; i++) {
      percentages.push(0);
      kumul.push(0);
    }
    for (let i = 0; i < items.length; i++) {
      values.push(parseInt(data[i][0]));
      sum = sum + parseInt(data[i][0]);
    }
    values.sort((a, b) => b - a);

    let temp = 0;
    for (let i = 0; i < items.length; i++) {
      temp = temp + (values[i] * 100) / sum;
      percentages[i] = Math.round((values[i] * 10000) / sum) / 100;
      kumul[i] = Math.round(temp * 100) / 100;
    }
    setResult({
      // @ts-ignore
      causes: items, percentages: percentages, values: values, kumul: kumul,
      sum: sum,
    });
  };

  useEffect(task6, [items, headers, data, values]);

  return (
    <div style={{height: '100vh', overflow: 'auto'}}>
      <HeaderBar title={'Pareto analýza nákladov'}/>
      <div style={{marginTop: 60}}>
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
      </div>
      <Result6 result={getResult}/>
    </div>
  );
}
