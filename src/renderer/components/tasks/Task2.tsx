import TableDynamic from '../TableDynamic';
import {useEffect, useState} from 'react';
import Result2 from '../results/Result2';
import HeaderBar from '../HeaderBar';
import {selectStructure, structureActions} from 'renderer/store/slice';
import {useSelector} from 'react-redux';
import {costs} from '../chartOfAccounts';

export default function Task2() {
  const {headers, items, data, values} = useSelector(selectStructure);

  // @ts-ignore
  const selectCol = [
    {value: 7, label: 'Priamy materiál'},
    {value: 8, label: 'Priame mzdy'},
    {value: 9, label: 'Ostatné priame náklady'},
    {value: 10, label: 'Výrobná réžia'},
    {value: 11, label: 'Správna réžia'},
    {value: 12, label: 'Odbytová réžia'},
    {value: 13, label: 'Zásobovacia réžia'},
  ];

  let [getResult, setResult] = useState({
    items: [],
    headers: [],
    rowSums: [],
    colSums: [],
    totalCost: 0,
    dataset: [],
  });

  const task2 = () => {
    let rowSums: number[] = [];
    let colSums: number[] = [];

    for (let i = 0; i < items.length; i++) {
      rowSums.push(0);
    }
    for (let i = 0; i < headers.length; i++) {
      colSums.push(0);
    }

    data.map((rowData: string[], row: number) => {
      rowData.map((value: string) => {
        rowSums[row] = rowSums[row] + parseFloat(value === '' ? '0' : value);
      });
    });

    data.map((rowData: string[]) => {
      rowData.map((value: string, idx: number) => {
        colSums[idx] = colSums[idx] + parseFloat(value === '' ? '0' : value);
      });
    });

    const totalCost: number = rowSums.reduce(
      (a: number, b: number) => a + b,
      0
    );

    //@ts-ignore
    setResult({items, headers, rowSums, colSums, totalCost});
  };

  useEffect(task2, [headers, items, data, values]);

  return (
    <div style={{height: '100vh', overflow: 'auto'}}>
      <HeaderBar title={'Analýza štruktúry nákladov'}/>
      <div style={{marginTop: 60}}>
        <TableDynamic
          corner={'↓Druhové | Kalkulačné→'}
          headerType={'select'}
          header={headers}
          inputType={'select'}
          inputs={items}
          data={data}
          values={values}
          dynRows={true}
          dynCols={true}
          proceed={task2}
          selectRow={costs}
          selectCol={selectCol}
          actions={structureActions}
        />

        <Result2 result={getResult}/>
      </div>
    </div>
  );
}
