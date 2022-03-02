import '../../App.css';
import TableType from "../TableType";
import Result3 from "../results/Result3";
import {useEffect, useState} from "react";
import HeaderBar from '../HeaderBar';

export default function Task3() {

  let [getResult, setResult] = useState({header: [], costSums: [], incomeSums: [], chainIdx: 0, costDiff: 0, incomeDiff: 0, reaction: 0, inputs: [], inputsDataOld: [], inputsDataNew: []})
  // bazicky index pre kazdy rok vzhladom na ini starši rok
  let state = useState({
    header: ["2000", "2001"],
    inputs: ["Mzdy", "Naklady"],
    data: [
      ["2", "4"],
      ["1", "3"]
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
    for (let i = 0; i < state[0].header.length; i++) {
      costSums.push(0)
      incomeSums.push(0)
      header.push(state[0].header[i])
    }

    for (let i = 0; i < state[0].inputs.length; i++) {
      inputs.push(state[0].inputs[i])
      inputsDataOld.push( parseInt(state[0].data[i][0]) )
      inputsDataNew.push( parseInt(state[0].data[i][1]) )
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
    const chainIdx: number = Math.round((costSums[1] / costSums[0]) * 100 / 100)
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
      costDiff,
      incomeDiff,
      reaction,
      // @ts-ignore
      inputs,
      // @ts-ignore
      inputsDataOld,
      // @ts-ignore
      inputsDataNew
    })
  }

  useEffect(task3, [])

  return (
    <div className={'scrollbox-lg'} style={{ height: '100vh' }}>

      <HeaderBar title={'Analýza reťazových a bázických indexov'} />

      <div>
        <TableType
          corner={'Ekonomická položka'}
          headerType={'text'}
          header={state[0].header}
          inputType={'input'}
          inputs={state[0].inputs}
          data={state[0].data}
          types={state[0].types}
          rows={2}
          cols={2}
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
