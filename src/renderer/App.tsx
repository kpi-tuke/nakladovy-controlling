import {MemoryRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import TableDynamic from "./components/TableDynamic";
import TaskSelector from "./components/TaskSelector";
import ResultEficience from "./components/ResultEficience";
import ResultStructure from "./components/ResultStructure";

let profit: any
let selection: object

const eficiency = (data: any, callback:any) => {
  let cost:number = 0
  let income:number = 0
  data.data[0].map((value: string) => {income+=parseInt(value)})
  data.data[1].map((value: string) => {cost+=parseInt(value)})
  let result={cost:cost, income:income}
  console.log(result)
  callback(result)
}

const structure = (data: any, callback: any) => {
  let arr:any = [0,0,0,0,0,0];
  data.data.map((value:any, row:number) => {
    value.map((x:string) => {
      arr[row]=arr[row]+parseInt(x)
    })
  })
  console.log(arr)
  callback({inputs:data.inputs, data:arr})
}

const handler = (result:any) => {
  profit=result
  console.log(profit)
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
          ? <TableDynamic title={"Table first"}
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
          ? <TableDynamic title={"Table second"}
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
    <>
      {
        // @ts-ignore
        selection.first
          ? <ResultEficience result={profit}/>
          : console.log("first")
      }
      {
        // @ts-ignore
        selection.second
          ? <ResultStructure result={profit}/>
          : console.log("second")
      }
    </>
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
