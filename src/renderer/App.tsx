import {MemoryRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import TaskSelector from "./components/TaskSelector";
import StructureAnalysis from "./pages/StructureAnalysis";
import IndexAnalysis from './pages/IndexAnalysis';
import CVPAnalysis from "./pages/CVPAnalysis";
import SortimentAnalysis from "./pages/SortimentAnalysis";
import ParetoAnalysis from "./pages/ParetoAnalysis";
import {Provider} from "react-redux";
import {store} from "./store/store";
import EconomicAnalysis from './pages/EconomicAnalysis';
import Evaluation from './components/Evaluation';

export default function App() {

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/taskselect" component={TaskSelector}/>
          <Route path="/task6" component={ParetoAnalysis}/>
          <Route path="/task5" component={SortimentAnalysis}/>
          <Route path="/task4" component={CVPAnalysis}/>
          <Route path="/task3" component={IndexAnalysis}/>
          <Route path="/task2" component={StructureAnalysis}/>
          <Route path="/task1" component={EconomicAnalysis}/>
          <Route path="/evaluation" component={Evaluation}/>
        </Switch>
        <Redirect from="/" to="/taskselect"/>
      </Router>
    </Provider>
  );
}
