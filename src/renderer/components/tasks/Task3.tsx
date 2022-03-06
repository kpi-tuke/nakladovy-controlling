import '../../App.css';
import TableType from "../TableType";
import Result3 from "../results/Result3";
import {useEffect, useState} from "react";
import HeaderBar from '../HeaderBar';

export default function Task3() {
  //odstranit graf s nakladmi
  //vyznacit korý stlpec je báza
  //tiez polozky s učt osnovy ako v task1
  //moznost pridat viacero obdobi, vzdy sa porovnavaju iba dve po sebe iduce, graf s indexami = spojnicovy
  let [getResult, setResult] = useState({
    header: [],
    costSums: [],
    incomeSums: [],
    chainIdx: 0,
    baseIdxOld: 0,
    baseIdxNew: 0,
    costDiff: 0,
    incomeDiff: 0,
    reaction: 0,
    inputs: [],
    inputsDataOld: [],
    inputsDataNew: [],
    inputsDataBase: []
  })
  let state = useState({
    header: ["2000", "2001", "Bázicky rok"],
    inputs: ["Tržby", "Naklady"],
    data: [
      ["2", "4", "3"],
      ["1", "3", "5"]
    ],
    types: [true, false]
  })

  const task3 = () => {
    let costSums: number[] = []
    let incomeSums: number[] = []
    let header: string[] = []
    let inputs: string[] = []
    let inputsDataOld: number[] = []
    let inputsDataNew: number[] = []
    let inputsDataBase: number[] = []
    for (let i = 0; i < state[0].header.length; i++) {
      costSums.push(0)
      incomeSums.push(0)
      header.push(state[0].header[i])
    }

    for (let i = 0; i < state[0].inputs.length; i++) {
      inputs.push(state[0].inputs[i])
      inputsDataOld.push( parseInt(state[0].data[i][0]) )
      inputsDataNew.push(parseInt(state[0].data[i][1]))
      inputsDataBase.push(parseInt(state[0].data[i][2]))
    }

    state[0].data.map((rowData: string[], row: number) => {
      state[0].types[row]
        ? rowData.map((value: string, idx: number) => {
          incomeSums[idx] = incomeSums[idx] + parseInt(value)
        })
        : rowData.map((value: string, idx: number) => {
          costSums[idx] = costSums[idx] + parseInt(value)
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
      header,
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
      inputs,
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
        <TableType
          corner={'Ekonomická položka'}
          headerType={'input'}
          header={state[0].header}
          inputType={'input'}
          inputs={state[0].inputs}
          data={state[0].data}
          types={state[0].types}
          rows={2}
          cols={3}
          dynRows={true}
          dynCols={false}
          proceed={task3}
        />
      </div>
      <div>
        <Result3 result={getResult} />
      </div>
    </div>
  );
}
