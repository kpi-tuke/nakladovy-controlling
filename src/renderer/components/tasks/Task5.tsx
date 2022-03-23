import TableDynamic from '../TableDynamic';
import Result5 from '../results/Result5';
import {useEffect, useState} from 'react';
import HeaderBar from '../HeaderBar';
import {selectSortiment, sortimentActions} from 'renderer/store/slice';
import {useAppSelector} from 'renderer/store/hooks';

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

  const {headers, values, data, items} = useAppSelector(selectSortiment);

  const task5 = () => {
    let rentCost: number[] = [];
    let rentIncome: number[] = [];
    let marginProfit: number[] = [];
    let marginGross: number[] = [];
    let allowance: number[] = [];
    let profit: number[] = [];

    for (let i = 0; i < headers.length; i++) {
      rentCost.push(0);
      rentIncome.push(0);
      marginGross.push(0);
      marginProfit.push(0);
      allowance.push(0);
      profit.push(0);
    }

    for (let col = 0; col < headers.length; col++) {
      marginProfit[col] = parseInt(data[0][col]) - parseInt(data[1][col]);

      if (parseInt(data[1][col]) === 0) {
        console.log('delenie nulou');
        rentCost[col] = 0;
      } else
        rentCost[col] =
          Math.round((marginProfit[col] / parseInt(data[1][col])) * 100) / 100;

      if (parseInt(data[0][col]) === 0) {
        console.log('delenie nulou');
        rentIncome[col] = 0;
      } else
        rentIncome[col] =
          Math.round((marginProfit[col] / parseInt(data[0][col])) * 100) / 100;

      marginGross[col] = parseInt(data[0][col]) - parseInt(data[2][col]);

      if (parseInt(data[0][col]) === 0) {
        console.log('delenie nulou');
        allowance[col] = 0;
      } else
        allowance[col] =
          Math.round(
            (1 - parseInt(data[2][col]) / parseInt(data[0][col])) * 100
          ) / 100;

      profit[col] =
        Math.round(
          (parseInt(data[3][col]) * parseInt(data[0][col]) -
            parseInt(data[3][col]) * parseInt(data[1][col])) *
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
  useEffect(task5, [headers, items, data, values]);

  return (
    <div style={{height: '100vh', overflow: 'auto'}}>
      <HeaderBar title={'Sortimentová analýza'}/>
      <div style={{marginTop: 60}}>
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
      </div>
    </div>
  );
}
