import {MemoryRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import TaskSelector from "./components/TaskSelector";
import Task1 from "./components/tasks/Task1";
import Task2 from "./components/tasks/Task2";

export default function App() {

  return (
    <Router>
      <Switch>
        <Route path="/taskselect" component={TaskSelector}/>
        <Route path="/task2" component={Task2}/>
        <Route path="/task1" component={Task1}/>
      </Switch>
      <Redirect from="/" to="/taskselect"/>
    </Router>
  );
}
