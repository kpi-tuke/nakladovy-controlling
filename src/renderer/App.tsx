import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import TaskSelection from './pages/TaskSelection';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Report from './pages/report/Report';
import './App.css';
import WelcomePage from './pages/WelcomePage';
import withAnalysis from './pages/withAnalysis';
import IndexResult from './pages/index/IndexResult';
import { indexActions, selectIndex } from './pages/index/indexSlice';
import {
  economicActions,
  selectEconomic,
} from './pages/economic/economicSlice';
import EconomicResult from './pages/economic/EconomicResult';
import ItemSelect from './components/tables/ItemSelect';
import HeaderInput from './components/tables/HeaderInput';
import {
  selectStructure,
  structureActions,
} from './pages/structure/structureSlice';
import StructureResult from './pages/structure/StructureResult';
import {
  selectSortiment,
  sortimentActions,
} from './pages/sortiment/sortimentSlice';
import SortimentResult from './pages/sortiment/SortimentResult';
import { CVPActions, selectCVP } from './pages/cvp/cvpSlice';
import CVPResult from './pages/cvp/CVPResult';
import { paretoActions, selectPareto } from './pages/pareto/paretoSlice';
import ParetoResult from './pages/pareto/ParetoResult';
import HeaderSelect from './components/tables/HeaderSelect';
import HeaderValue from './components/tables/HeaderValue';
import ItemInput from './components/tables/ItemInput';
import ItemValue from './components/tables/ItemValue';

export default function App() {
  const EconomicAnalysis: () => JSX.Element = withAnalysis(
    selectEconomic,
    economicActions,
    ItemSelect,
    HeaderInput,
    EconomicResult
  );
  const StructureAnalysis: () => JSX.Element = withAnalysis(
    selectStructure,
    structureActions,
    ItemSelect,
    HeaderSelect,
    StructureResult
  );
  const IndexAnalysis: () => JSX.Element = withAnalysis(
    selectIndex,
    indexActions,
    ItemSelect,
    HeaderInput,
    IndexResult
  );
  const CVPAnalysis: () => JSX.Element = withAnalysis(
    selectCVP,
    CVPActions,
    ItemInput,
    HeaderValue,
    CVPResult
  );
  const SortimentAnalysis: () => JSX.Element = withAnalysis(
    selectSortiment,
    sortimentActions,
    ItemValue,
    HeaderInput,
    SortimentResult
  );
  const ParetoAnalysis: () => JSX.Element = withAnalysis(
    selectPareto,
    paretoActions,
    ItemInput,
    HeaderValue,
    ParetoResult
  );
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/taskselect" element={<TaskSelection />} />
          <Route path="/task6" element={<ParetoAnalysis />} />
          <Route path="/task5" element={<SortimentAnalysis />} />
          <Route path="/task4" element={<CVPAnalysis />} />
          <Route path="/task3" element={<IndexAnalysis />} />
          <Route path="/task2" element={<StructureAnalysis />} />
          <Route path="/task1" element={<EconomicAnalysis />} />
          <Route
            path="/evaluation"
            element={
              <Report
                id1={EconomicAnalysis}
                id2={StructureAnalysis}
                id3={IndexAnalysis}
                id4={CVPAnalysis}
                id5={SortimentAnalysis}
                id6={ParetoAnalysis}
              />
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}
