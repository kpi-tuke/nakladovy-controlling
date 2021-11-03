import {MemoryRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import TableDynamic from "./components/TableDynamic";
import TaskSelector from "./components/TaskSelector";

let profit: number = 0;
let selection: object;

const proceed = (data: any) => {
  console.log(data)
  data.map((row: string[], idxrow: any) => {
    row.map((value) => {
      idxrow === 0
        ? profit = profit + parseInt(value)
        : profit = profit - parseInt(value)
    })
  })
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
                          data={[
                            [],
                            []
                          ]}
                          header={[]}
                          rows={0} cols={0}
                          proceed={proceed}/>
          : console.log("first")
      }
      {
        // @ts-ignore
        selection.second
          ? <TableDynamic title={"Table second"}
                          data={[
                            [],
                            []
                          ]}
                          header={[]}
                          rows={0} cols={0}
                          proceed={proceed}/>
          : console.log("second")
      }

    </>

  );
};

const Results = () => {
  return (
    <p>results: {profit} </p>
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
