import {HashRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import TaskSelection from "./pages/TaskSelection";
import StructureAnalysis from "./pages/structure/StructureAnalysis";
import IndexAnalysis from './pages/index/IndexAnalysis';
import CVPAnalysis from "./pages/cvp/CVPAnalysis";
import SortimentAnalysis from "./pages/sortiment/SortimentAnalysis";
import ParetoAnalysis from "./pages/pareto/ParetoAnalysis";
import {Provider} from "react-redux";
import {store} from "./store/store";
import EconomicAnalysis from './pages/economic/EconomicAnalysis';
import Evaluation from './pages/evaluation/Evaluation';
import "./ScreenStyle.css"
import WelcomePage from "./pages/WelcomePage";

export default function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/index.html" element={<WelcomePage/>}/>
          <Route path="" element={<WelcomePage/>}/>
          <Route path="/" element={<WelcomePage/>}/>
          <Route path="/taskselect" element={<TaskSelection/>}/>
          <Route path="/task6" element={<ParetoAnalysis/>}/>
          <Route path="/task5" element={<SortimentAnalysis/>}/>
          <Route path="/task4" element={<CVPAnalysis/>}/>
          <Route path="/task3" element={<IndexAnalysis/>}/>
          <Route path="/task2" element={<StructureAnalysis/>}/>
          <Route path="/task1" element={<EconomicAnalysis/>}/>
          <Route path="/evaluation" element={<Evaluation/>}/>
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}
