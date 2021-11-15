import {MemoryRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import TaskSelector from "./components/TaskSelector";
import Task1 from "./components/tasks/Task1";
import Task2 from "./components/tasks/Task2";
import Task3 from './components/tasks/Task3';
import Task4 from "./components/tasks/Task4";
import Task5 from "./components/tasks/Task5";

export default function App() {

  return (
    <Router>
      <Switch>
        <Route path="/taskselect" component={TaskSelector}/>
        <Route path="/task5" component={Task5}/>
        <Route path="/task4" component={Task4}/>
        <Route path="/task3" component={Task3}/>
        <Route path="/task2" component={Task2}/>
        <Route path="/task1" component={Task1}/>
      </Switch>
      <Redirect from="/" to="/taskselect"/>
    </Router>
  );
}
