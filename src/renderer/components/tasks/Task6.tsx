import '../../App.css';
import TableDynamic from "../TableDynamic";
import Result6 from "../results/Result6";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import HeaderBar from '../HeaderBar';

export default function Task6() {
  //kolmica na os x v bode kde ma krivka hodnotu 80%
  let [getResult, setResult] = useState({ causes: [], percentages: [], values: [], kumul: [] })

  let state = useState({
    header: ["Hodnota"],

    inputs: [
      "Chyby mechanického trieskového opracovania",
      "Chyby tvárnenia materiálu", "Materiálové chyby",
      "Chyby zvárania", "Chyby povrchu a povrchovej úpravy",
      "Chyby kompletizácie, balenia",
      "Chyby dokumentácie"
    ],

    data: [
      ["3998"],
      ["1307"],
      ["361"],
      ["82"],
      ["104"],
      ["1573"],
      ["5"]
    ],
  })

  const task6 = () => {
    let values: number[] = []
    let percentages: number[] = []
    let kumul: number[] = []
    let sum: number = 0

    for (let i = 0; i < state[0].inputs.length; i++) {
      percentages.push(0)
      kumul.push(0)
    }
    for (let i = 0; i < state[0].inputs.length; i++) {
      values.push(parseInt(state[0].data[i][0]))
      sum = sum + parseInt(state[0].data[i][0])
    }
    values.sort((a, b) => (b - a))

    let temp = 0
    for (let i = 0; i < state[0].inputs.length; i++) {
      temp = temp + (values[i] * 100 / sum)
      percentages[i] = Math.round(values[i] * 10000 / sum) / 100
      kumul[i] = Math.round(temp * 100) / 100
    }
    // @ts-ignore
    setResult({causes: state[0].inputs, percentages: percentages, values: values, kumul: kumul, sum: sum})
  }

  useEffect(task6, [])
  //pridat graf pre lorenzovy krivku
  return (
    <div className={'scrollbox-lg'} style={{ height: '100vh' }}>
      <HeaderBar title={'Pareto analýza nákladov'} />
      <TableDynamic
        corner={'Príčina'}
        headerType={'text'}
        header={state[0].header}
        inputType={'input'}
        inputs={state[0].inputs}
        data={state[0].data}
        rows={7}
        cols={2}
        dynRows={true}
        dynCols={false}
        proceed={task6}
      />

      <Result6 result={getResult} />

      <button>
        <Link to={'/taskselect'}>Back</Link>
      </button>
    </div>
  );
}
