import '../../App.css';
import TableDynamic from "../TableDynamic";
import Result6 from "../results/Result6";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Task6() {

  let [getResult, setResult] = useState({causes: [], percentages: [], values: [], kumul: []})
  let state = useState({
    header: ["Kód", "Hodnota"],
    inputs: ["Chyby mechanického trieskového opracovania", "Chyby tvárnenia materiálu", "Materiálové chyby", "Chyby zvárania", "Chyby povrchu a povrchovej úpravy", "Chyby kompletizácie, balenia", "Chyby dokumentácie"],
    data: [
      ["1", "3998"],
      ["2", "1307"],
      ["3", "361"],
      ["4", "82"],
      ["5", "104"],
      ["6", "1573"],
      ["7", "5"]
    ],
  })

  const task6 = () => {
    let values: number[] = []
    let percentages: number[] = []
    let causes: string[] = []
    let kumul: number[] = []
    let arr: any[] = []
    let sum: number = 0

    for (let i = 0; i < state[0].inputs.length; i++) {
      values.push(0)
      percentages.push(0)
      causes.push("")
      kumul.push(0)
    }
    for (let i = 0; i < state[0].inputs.length; i++) {
      arr.push({cause: state[0].data[i][0], value: parseInt(state[0].data[i][1])})
      sum = sum + parseInt(state[0].data[i][1])
    }
    arr.sort((a, b) => (b.value - a.value))

    let temp = 0
    for (let i = 0; i < state[0].inputs.length; i++) {
      temp = temp + (arr[i].value * 100 / sum)
      values[i] = arr[i].value
      percentages[i] = Math.round(arr[i].value * 10000 / sum) / 100
      causes[i] = arr[i].cause
      kumul[i] = Math.round(temp * 100) / 100
    }
    console.log(arr)
    // @ts-ignore
    setResult({causes: causes, percentages: percentages, values: values, kumul: kumul, sum: sum})
  }

  useEffect(task6, [])

  return (
    <div className={"scrollbox-lg"} style={{height: "100vh"}}>
      <TableDynamic corner={"Príčina"}
                    headerType={"text"}
                    header={state[0].header}
                    inputType={"input"}
                    inputs={state[0].inputs}
                    data={state[0].data}
                    rows={7} cols={2}
                    dynRows={true} dynCols={false}
                    proceed={task6}
      />

      <Result6 result={getResult}/>

      <button><Link to={"/taskselect"}>Back</Link></button>
    </div>
  )
}
