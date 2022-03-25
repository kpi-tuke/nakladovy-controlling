import Result1 from '../results/Result1';
import {useEffect, useState} from 'react';
// import groupedOptions from '../chartOfAccounts';
// import TableDynamic from '../TableDynamic';
import {useSelector} from 'react-redux';
import {bilanceActions, selectBilance} from 'renderer/store/slice';
import HeaderBar from '../HeaderBar';
import groupedOptions from "../chartOfAccounts";
import TableDynamic from "../TableDynamic";
import TextField from "../TextField";

export default function Task1() {
  let [getResult, setResult] = useState({
    headers: [],
    items: [],
    data: [[]],
    values: [],
    costTotal: 0,
    incomeTotal: 0,
    profitTotal: 0,
    costData: [],
    incomeData: [],
    profitData: [],
    incomeProfitabilityData: [],
    costProfitabilityData: [],
    costEfficiencyData: [],
    costIndicatorData: [],
  });

  const {headers, items, data, values, text} = useSelector(selectBilance);

  const divideArrays = (
    numerator: number[],
    denominator: number[]
  ): number[] => {
    let arr: number[] = [];
    for (let i = 0; i < headers.length; i++) {
      if (numerator[i] === 0 || denominator[i] === 0) arr.push(0);
      else arr.push(Math.round((100 * numerator[i]) / denominator[i]) / 100);
    }
    return arr;
  };

  const task1 = () => {
    let costTotal: number = 0;
    let incomeTotal: number = 0;
    let costData: number[] = [];
    let incomeData: number[] = [];
    let profitData: number[] = [];

    for (let i = 0; i < headers.length; i++) {
      incomeData.push(0);
      costData.push(0);
    }

    data.map((rowData: string[], row: number) => {
      parseInt(values[row]) >= 600
        ? rowData.map((value: string, col: number) => {
            incomeTotal += parseFloat(value === '' ? '0' : value);
            incomeData[col] =
              incomeData[col] + parseFloat(value === '' ? '0' : value);
          })
        : rowData.map((value: string, col: number) => {
            costTotal += parseFloat(value === '' ? '0' : value);
            costData[col] =
              costData[col] + parseFloat(value === '' ? '0' : value);
          });
    });

    for (let i = 0; i < headers.length; i++) {
      profitData.push(incomeData[i] - costData[i]);
    }

    let incomeProfitabilityData: number[] = divideArrays(
      profitData,
      incomeData
    );
    let costProfitabilityData: number[] = divideArrays(profitData, costData);
    let costEfficiencyData: number[] = divideArrays(incomeData, costData);
    let costIndicatorData: number[] = divideArrays(costData, incomeData);

    let profitTotal: number = incomeTotal - costTotal;

    setResult({
      // @ts-ignore
      headers,
      // @ts-ignore
      items,
      // @ts-ignore
      data,
      // @ts-ignore
      values,
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
      costIndicatorData,
    });
  };

  useEffect(task1, [headers, items, data, values, text]);

  return (
    <div className={'task-container'}>
      <HeaderBar title={'Ekonomická analýza hospodárenia'}/>

      <h1 className={"result-h1"}>Vstupy</h1>

      <TableDynamic
        corner={'Ekonomická položka Náklady/Výnosy'}
        headerType={'input'}
        header={headers}
        inputType={'select'}
        inputs={items}
        data={data}
        values={values}
        dynRows={true}
        dynCols={true}
        proceed={task1}
        selectRow={groupedOptions}
        actions={bilanceActions}
        selector={selectBilance}
      />

      <Result1 result={getResult}/>

      <TextField text={text} action={bilanceActions.changeText}/>
    </div>
  );
}
