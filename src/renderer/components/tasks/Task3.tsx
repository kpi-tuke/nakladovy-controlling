import '../../App.css';
import Result3 from "../results/Result3";
import {useEffect, useState} from "react";
import HeaderBar from '../HeaderBar';
import groupedOptions from "../chartOfAccounts";
import TableDynamic from "../TableDynamic";

export default function Task3() {
  //odstranit graf s nakladmi
  //vyznacit korý stlpec je báza
  //tiez polozky s učt osnovy ako v task1
  //moznost pridat viacero obdobi, vzdy sa porovnavaju iba dve po sebe iduce, graf s indexami = spojnicovy
  let [getResult, setResult] = useState({
    headers: [],
    costSums: [],
    incomeSums: [],
    chainIdx: 0,
    baseIdxOld: 0,
    baseIdxNew: 0,
    costDiff: 0,
    incomeDiff: 0,
    reaction: 0,
    items: [],
    inputsDataOld: [],
    inputsDataNew: [],
    inputsDataBase: []
  })

  // @ts-ignore
  const [headers, setHeaders] = useState<string[]>(["2000", "2001", "Bázicky rok"])
  // @ts-ignore
  const [items, setItems] = useState<string[]>(['501 – Spotreba materiálu', "666 – Výnosy z krátkodobého finančného majetku"])
  // @ts-ignore
  const [data, setData] = useState<string[][]>([["1", "2", "3"], ["3", "4", "5"]])
  // @ts-ignore
  const [values, setValues] = useState<number[]>([501, 666])


  const task3 = () => {
    let costSums: number[] = []
    let incomeSums: number[] = []
    let inputsDataOld: number[] = []
    let inputsDataNew: number[] = []
    let inputsDataBase: number[] = []

    for (let i = 0; i < headers.length; i++) {
      costSums.push(0)
      incomeSums.push(0)
    }

    for (let i = 0; i < items.length; i++) {
      inputsDataOld.push(parseFloat(data[i][0] === "" ? "0" : data[i][0]))
      inputsDataNew.push(parseFloat(data[i][1] === "" ? "0" : data[i][1]))
      inputsDataBase.push(parseFloat(data[i][2] === "" ? "0" : data[i][2]))
    }

    data.map((rowData: string[], row: number) => {
      values[row] >= 600
        ? rowData.map((value: string, idx: number) => {
          incomeSums[idx] = incomeSums[idx] + parseFloat(value === "" ? "0" : value)
        })
        : rowData.map((value: string, idx: number) => {
          costSums[idx] = costSums[idx] + parseFloat(value === "" ? "0" : value)
        })
    })
    const profitDiff: number = incomeSums[1] * 100 / incomeSums[0] - 100
    const chainIdx: number = Math.round((costSums[1] / costSums[0]) * 100) / 100
    const baseIdxOld: number = Math.round((costSums[0] / costSums[2]) * 100) / 100
    const baseIdxNew: number = Math.round((costSums[1] / costSums[2]) * 100) / 100
    const costDiff: number = Math.round(chainIdx * 100 - 100) / 100
    const incomeDiff: number = Math.round(profitDiff * 100) / 100
    const reaction: number = Math.round((chainIdx * 100 - 100) * 100 / profitDiff) / 100

    setResult({
      // @ts-ignore
      headers,
      // @ts-ignore
      costSums,
      // @ts-ignore
      incomeSums,
      chainIdx,
      baseIdxOld,
      baseIdxNew,
      costDiff,
      incomeDiff,
      reaction,
      // @ts-ignore
      items,
      // @ts-ignore
      inputsDataOld,
      // @ts-ignore
      inputsDataNew,
      // @ts-ignore
      inputsDataBase
    })
  }

  useEffect(task3, [])

  return (
    <div className={'scrollbox-lg'} style={{ height: '100vh' }}>

      <HeaderBar title={'Analýza reťazových a bázických indexov'} />

      <div>
        <TableDynamic
          corner={'Ekonomická položka'}
          headerType={'input'}
          header={headers}
          inputType={'select'}
          inputs={items}
          data={data}
          values={values}
          dynRows={true}
          dynCols={false}
          selectRow={groupedOptions}
          proceed={task3}
        />
      </div>
      <div>
        <Result3 result={getResult} />
      </div>
    </div>
  );
}
