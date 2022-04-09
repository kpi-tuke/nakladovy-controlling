import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
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
import "./ScreenStyle.css"

export default function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/taskselect" element={<TaskSelector/>}/>
          <Route path="/task6" element={<ParetoAnalysis/>}/>
          <Route path="/task5" element={<SortimentAnalysis/>}/>
          <Route path="/task4" element={<CVPAnalysis/>}/>
          <Route path="/task3" element={<IndexAnalysis/>}/>
          <Route path="/task2" element={<StructureAnalysis/>}/>
          <Route path="/task1" element={<EconomicAnalysis/>}/>
          <Route path="/evaluation" element={<Evaluation/>}/>
          <Route
            path="*"
            element={<Navigate to="/taskselect" replace />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}
