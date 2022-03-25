import TableDynamic from '../TableDynamic';
import Result5 from '../results/Result5';
import {useEffect, useState} from 'react';
import HeaderBar from '../HeaderBar';
import {selectSortiment, sortimentActions} from 'renderer/store/slice';
import {useAppSelector} from 'renderer/store/hooks';
import TextField from "../TextField";

export default function Task5() {
  let [getResult, setResult] = useState({
    rentCost: [],
    rentIncome: [],
    marginProfit: [],
    marginGross: [],
    allowance: [],
    profit: [],
    headers: [],
  });

  const {headers, values, data, items, text} = useAppSelector(selectSortiment);

  const task5 = () => {
    let rentCost: number[] = [];
    let rentIncome: number[] = [];
    let marginProfit: number[] = [];
    let marginGross: number[] = [];
    let allowance: number[] = [];
    let profit: number[] = [];

    let price: string[] = []
    let directCost: string[] = []
    let totalCost: string[] = []
    let volume: string[] = []

    for (let i = 0; i < headers.length; i++) {
      rentCost.push(0);
      rentIncome.push(0);
      marginGross.push(0);
      marginProfit.push(0);
      allowance.push(0);
      profit.push(0);
      price.push(data[2][i])
      directCost.push(data[0][i])
      totalCost.push(data[1][i])
      volume.push(data[3][i])
    }

    for (let col = 0; col < headers.length; col++) {
      marginProfit[col] = Math.round((parseFloat(price[col]) - parseFloat(totalCost[col])) * 100) / 100;

      if (parseInt(totalCost[col]) === 0) {
        console.log('delenie nulou');
        rentCost[col] = 0;
      } else
        rentCost[col] =
          Math.round((marginProfit[col] / parseFloat(totalCost[col])) * 100) / 100;

      if (parseInt(price[col]) === 0) {
        console.log('delenie nulou');
        rentIncome[col] = 0;
      } else
        rentIncome[col] =
          Math.round((marginProfit[col] / parseFloat(price[col])) * 100) / 100;

      marginGross[col] = Math.round((parseFloat(price[col]) - parseFloat(directCost[col]))*100) / 100;

      if (parseInt(price[col]) === 0) {
        console.log('delenie nulou');
        allowance[col] = 0;
      } else
        allowance[col] =
          Math.round(
            (1 - parseFloat(directCost[col]) / parseFloat(price[col])) * 100
          ) / 100;

      profit[col] =
        Math.round(
          (parseFloat(volume[col]) * parseFloat(price[col]) -
            parseFloat(volume[col]) * parseFloat(totalCost[col])) *
          100
        ) / 100;
    }

    // @ts-ignore
    setResult({
      // @ts-ignore
      rentCost: rentCost,
      // @ts-ignore
      rentIncome: rentIncome,
      // @ts-ignore
      marginProfit: marginProfit,
      // @ts-ignore
      marginGross: marginGross,
      // @ts-ignore
      allowance: allowance,
      // @ts-ignore
      profit: profit,
      // @ts-ignore
      headers,
    });
  };
  useEffect(task5, [headers, items, data, values, text]);

  return (
    <div className={"task-container"}>
      <HeaderBar title={'Sortimentná analýza'}/>

      <h1 className={"result-h1"}>Vstupy</h1>

        <TableDynamic
          corner={'Ekonomická položka'}
          headerType={'input'}
          header={headers}
          inputType={'text'}
          inputs={items}
          data={data}
          values={values}
          dynRows={false}
          dynCols={true}
          actions={sortimentActions}
        />

        <Result5 result={getResult} />

      <TextField text={text} action={sortimentActions.changeText}/>
    </div>
  );
}
