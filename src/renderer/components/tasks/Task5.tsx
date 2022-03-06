import '../../App.css';
import TableDynamic from "../TableDynamic";
import Result5 from "../results/Result5";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import HeaderBar from '../HeaderBar';

export default function Task5() {

  let [getResult, setResult] = useState({
    rentCost: [],
    rentIncome: [],
    marginProfit: [],
    marginGross: [],
    allowance: [],
    profit: [],
    header: []
  })
  let state = useState({
    header: ["VýrobokA", "VýrobokB"],
    inputs: ["Predajná cena jednotková", "Úplné vlastné náklady jednotková", "Priame náklady jednotková", "Objem výroby"],
    data: [
      ["2700", "2600"],
      ["1745", "1581"],
      ["985", "1215"],
      ["8000", "4000"]
    ],
  })
  const task5 = () => {
    let rentCost: number[] = []
    let rentIncome: number[] = []
    let marginProfit: number[] = []
    let marginGross: number[] = []
    let allowance: number[] = []
    let profit: number[] = []
    let header: string[] = []

    for (let i = 0; i < state[0].header.length; i++) {
      rentCost.push(0)
      rentIncome.push(0)
      marginGross.push(0)
      marginProfit.push(0)
      allowance.push(0)
      profit.push(0)
      header.push(state[0].header[i])
    }

    for (let col = 0; col < state[0].header.length; col++) {
      marginProfit[col] = parseInt(state[0].data[0][col]) - parseInt(state[0].data[1][col])

      if (parseInt(state[0].data[1][col]) === 0) {
        console.log("delenie nulou");
        rentCost[col] = 0
      } else rentCost[col] = Math.round((marginProfit[col] / parseInt(state[0].data[1][col])) * 100) / 100

      if (parseInt(state[0].data[0][col]) === 0) {
        console.log("delenie nulou");
        rentIncome[col] = 0
      } else rentIncome[col] = Math.round((marginProfit[col] / parseInt(state[0].data[0][col])) * 100) / 100

      marginGross[col] = parseInt(state[0].data[0][col]) - parseInt(state[0].data[2][col])

      if (parseInt(state[0].data[0][col]) === 0) {
        console.log("delenie nulou");
        allowance[col] = 0
      } else allowance[col] = Math.round((1 - (parseInt(state[0].data[2][col]) / parseInt(state[0].data[0][col]))) * 100) / 100

      profit[col] = Math.round((parseInt(state[0].data[3][col]) * parseInt(state[0].data[0][col]) - parseInt(state[0].data[3][col]) * parseInt(state[0].data[1][col])) * 100) / 100
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
      header: header
    })
  }
  useEffect(task5, [])

  return (
    <div className={'scrollbox-lg'} style={{ height: '100vh' }}>
      <HeaderBar title={'Sortimentová analýza'} />
      <TableDynamic
        corner={'Ekonomická položka'}
        headerType={'input'}
        header={state[0].header}
        inputType={'text'}
        inputs={state[0].inputs}
        data={state[0].data}
        rows={4}
        cols={2}
        dynRows={false}
        dynCols={true}
        proceed={task5}
      />

      <Result5 result={getResult} />

      <button>
        <Link to={'/taskselect'}>Back</Link>
      </button>
    </div>
  );
}
