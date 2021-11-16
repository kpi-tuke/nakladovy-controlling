import '../../App.css';
import TableDynamic from "../TableDynamic";
import Result5 from "../results/Result5";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

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
    inputs: ["Objem výroby", "Predajná cena", "Úplné vlastné náklady", "Priame náklady"],
    data: [
      ["8000", "4000"],
      ["2700", "2600"],
      ["1745", "1581"],
      ["985", "1215"]
    ],
  })
  const task5 = () => {
    let rentCost: number[] = []
    let rentIncome: number[] = []
    let marginProfit: number[] = []
    let marginGross: number[] = []
    let allowance: number[] = []
    let profit: number[] = []

    for (let i = 0; i < state[0].header.length; i++) {
      rentCost.push(0)
      rentIncome.push(0)
      marginGross.push(0)
      marginProfit.push(0)
      allowance.push(0)
      profit.push(0)
    }

    for (let col = 0; col < state[0].header.length; col++) {
      marginProfit[col] = parseInt(state[0].data[1][col]) - parseInt(state[0].data[2][col])
      rentCost[col] = marginProfit[col] / parseInt(state[0].data[2][col])
      rentIncome[col] = marginProfit[col] / parseInt(state[0].data[1][col])
      marginGross[col] = parseInt(state[0].data[1][col]) - parseInt(state[0].data[3][col])
      allowance[col] = 1 - (parseInt(state[0].data[3][col]) / parseInt(state[0].data[1][col]))
      profit[col] = parseInt(state[0].data[0][col]) * parseInt(state[0].data[1][col]) - parseInt(state[0].data[0][col]) * parseInt(state[0].data[2][col])
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
      header: state[0].header
    })
  }
  useEffect(task5, [])

  return (
    <div className={"scrollbox-lg"} style={{height: "100vh"}}>
      <TableDynamic header={state[0].header}
                    inputs={state[0].inputs}
                    data={state[0].data}
                    rows={4} cols={2}
                    dynRows={false} dynCols={true}
                    proceed={task5}
      />

      <Result5 result={getResult}/>

      <button><Link to={"/taskselect"}>Back</Link></button>
    </div>
  )
}
