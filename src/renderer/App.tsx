import {MemoryRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import TableDynamic from "./components/TableDynamic";
import TaskSelector from "./components/TaskSelector";
import ResultEficience from "./components/ResultEficience";
import ResultStructure from "./components/ResultStructure";

let solution: any = {first: {}, second: {}}
let selection: object

const eficiency = (data: any, callback:any) => {
  let cost:number = 0
  let income:number = 0
  data.data[0].map((value: string) => {income+=parseInt(value)})
  data.data[1].map((value: string) => {cost+=parseInt(value)})
  let result={cost:cost, income:income}
  console.log(result)
  callback(result, "Hospodarenie")
}

const structure = (data: any, callback: any) => {
  let rowSums: any = []
  let colSums: any = []
  console.log(data)
  for (let i = 0; i < data.inputs.length; i++) {
    rowSums.push(0)
  }
  for (let i = 0; i < data.header.length; i++) {
    colSums.push(0)
  }

  data.data.map((value: any, row: number) => {
    value.map((x: string) => {
      rowSums[row] = rowSums[row] + parseInt(x)
    })
  })
  data.data.map((row: any) => {
    row.map((value: any, colIdx: number) => {
      colSums[colIdx] = colSums[colIdx] + parseInt(value)
    })
  })
  callback({inputs: data.inputs, header: data.header, rowSums: rowSums, colSums: colSums}, "Štruktura")
}

const handler = (result: any, taskName: string) => {
  switch (taskName) {
    case "Hospodarenie":
      solution.first = result
      break;
    case "Štruktura":
      solution.second = result
      break;
    default:
      solution.first = "not provided"
      solution.second = "not provided"
      break;
  }
  console.log(solution)
}

const select = (selected: object) => {
  selection = selected
  console.log(selection)
}


const TaskSelect = () => {
  return (
    <TaskSelector action={select}/>
  )
}

const Inputs = () => {
  console.log(selection)

  return (
    <>
      {
        // @ts-ignore
        selection.first
          ? <TableDynamic taskName={"Hospodarenie"}
                          header={["2000"]}
                          inputs={["Vynos", "Naklad"]}
                          data={[
                            ["4"],
                            ["3"]
                          ]}

                          rows={2} cols={1}
                          dynRows={false} dynCols={true}
                          proceed={eficiency}
                          handler={handler}/>

          : console.log("first")
      }
      {
        // @ts-ignore
        selection.second
          ? <TableDynamic taskName={"Štruktura"}
                          header={["priame materialy", "priame mzdy", "vyrobna rezia", "spravna rezia"]}
                          inputs={["materiálové náklady", "služby", "mzdové a ostatné osobné náklady", "zákonne sociálne poistenie", "odpisy", "daň z nehnuteľnosti"]}
                          data={[
                            ["584", "0", "52", "6"],
                            ["0", "0", "60", "10"],
                            ["0", "45", "42", "29"],
                            ["0", "17", "16", "11"],
                            ["0", "0", "40", "10"],
                            ["0", "0", "10", "68"]
                          ]}
                          rows={0} cols={0}
                          dynRows={true} dynCols={true}
                          proceed={structure}
                          handler={handler}/>
          : console.log("second")
      }

    </>

  );
};

const Results = () => {

  return (
    <div>

      {
        // @ts-ignore
        selection.first
          ? <div><ResultEficience result={solution.first}/></div>
          : console.log("first")
      }

      {
        // @ts-ignore
        selection.second
          ? <div><ResultStructure result={solution.second}/></div>
          : console.log("second")
      }

    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/taskselect" component={TaskSelect}/>
        <Route path="/results" component={Results}/>
        <Route path="/inputs" component={Inputs}/>
      </Switch>
      <Redirect from="/" to="/taskselect"/>
    </Router>
  );
}
