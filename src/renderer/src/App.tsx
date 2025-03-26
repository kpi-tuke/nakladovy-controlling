import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import TaskSelection from './pages/TaskSelection';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Report from './pages/report/Report';
import './App.css';
import WelcomePage from './pages/WelcomePage';
import withAnalysis from './pages/withAnalysis';
import IndexResult from './pages/index/IndexResult';
import {
  indexActions,
  selectors as indexSelectors,
} from './pages/index/indexSlice';
import {
  economicActions,
  selectors as economicSelectors,
} from './pages/economic/economicSlice';
import EconomicResult from './pages/economic/EconomicResult';
import ItemSelect from './components/tables/ItemSelect';
import HeaderInput from './components/tables/HeaderInput';
import {
  selectors as structureSelectors,
  structureActions,
} from './pages/structure/structureSlice';
import StructureResult from './pages/structure/StructureResult';
import {
  selectors as sortimentSelectors,
  sortimentActions,
} from './pages/sortiment/sortimentSlice';
import SortimentResult from './pages/sortiment/SortimentResult';
import { CVPActions, selectors as cvpSelectors } from './pages/cvp/cvpSlice';
import CVPResult from './pages/cvp/CVPResult';
import {
  paretoActions,
  selectors as paretoSelectors,
} from './pages/pareto/paretoSlice';
import ParetoResult from './pages/pareto/ParetoResult';
import HeaderSelect from './components/tables/HeaderSelect';
import HeaderValue from './components/tables/HeaderValue';
import ItemInput from './components/tables/ItemInput';
import ItemValue from './components/tables/ItemValue';
import { RouteName } from './routes';
import SaveDataProvider from './components/providers/AnalysisSaveProvider';
import SnackbarProvider from './components/providers/SnackbarProvider';
import ErrorProvider from './components/providers/ErrorProvider';
import HeaderBar from './components/HeaderBar';
import ThemeProvider from './components/providers/ThemeProvider';
import { MathJaxContext } from 'better-react-mathjax';
import {
  trendActions,
  selectors as trendSelectors,
} from './pages/trend/trendSlice';
import TrendResult from './pages/trend/TrendResult';
import {
  variationActions,
  selectors as variationSelectors,
} from './pages/variation/variationSlice';
import VariationResults from './pages/variation/VariationResult';
import { taxActions, selectors as taxSelectors } from './pages/tax/taxSlice';
import TaxResult from './pages/tax/TaxResult';
import ProjectProvider from './components/providers/ProjectProvider';
import UpdateSnackbarProvider from './components/providers/UpdateSnackbarProvider';

export default function App() {
  const EconomicAnalysis: () => JSX.Element = withAnalysis(
    economicSelectors,
    economicActions,
    ItemSelect,
    HeaderInput,
    EconomicResult,
    RouteName.ECONOMIC_ANALYSIS,
  );
  const StructureAnalysis: () => JSX.Element = withAnalysis(
    structureSelectors,
    structureActions,
    ItemSelect,
    HeaderSelect,
    StructureResult,
    RouteName.STRUCTURE_ANALYSIS,
  );
  const IndexAnalysis: () => JSX.Element = withAnalysis(
    indexSelectors,
    indexActions,
    ItemSelect,
    HeaderInput,
    IndexResult,
    RouteName.INDEX_ANALYSIS,
  );
  const CVPAnalysis: () => JSX.Element = withAnalysis(
    cvpSelectors,
    CVPActions,
    ItemValue,
    HeaderInput,
    CVPResult,
    RouteName.CVP_ANALYSIS,
  );
  const SortimentAnalysis: () => JSX.Element = withAnalysis(
    sortimentSelectors,
    sortimentActions,
    ItemValue,
    HeaderInput,
    SortimentResult,
    RouteName.SORTIMENT_ANALYSIS,
  );
  const ParetoAnalysis: () => JSX.Element = withAnalysis(
    paretoSelectors,
    paretoActions,
    ItemInput,
    HeaderValue,
    ParetoResult,
    RouteName.PERETO_ANALYSIS,
  );
  const TrendAnalysis: () => JSX.Element = withAnalysis(
    trendSelectors,
    trendActions,
    ItemSelect,
    HeaderInput,
    TrendResult,
    RouteName.TREND_ANALYSIS,
  );
  const VariationAnalysis: () => JSX.Element = withAnalysis(
    variationSelectors,
    variationActions,
    ItemSelect,
    HeaderValue,
    VariationResults,
    RouteName.VARIATION_ANALYSIS,
  );
  const TaxAnalysis: () => JSX.Element = withAnalysis(
    taxSelectors,
    taxActions,
    ItemSelect,
    HeaderValue,
    TaxResult,
    RouteName.TAX_ANALYSIS,
  );

  return (
    <MathJaxContext version={3} src="/mathjax.js">
      <Provider store={store}>
        <ThemeProvider>
          <ErrorProvider>
            <UpdateSnackbarProvider>
              <SnackbarProvider>
                <SaveDataProvider>
                  <Router>
                    <ProjectProvider>
                      <HeaderBar />
                      <Routes>
                        <Route
                          path={RouteName.HOME}
                          element={<WelcomePage />}
                        />
                        <Route
                          path={RouteName.SELECT}
                          element={<TaskSelection />}
                        />
                        <Route
                          path={RouteName.ECONOMIC_ANALYSIS}
                          element={<EconomicAnalysis />}
                        />
                        <Route
                          path={RouteName.STRUCTURE_ANALYSIS}
                          element={<StructureAnalysis />}
                        />
                        <Route
                          path={RouteName.CVP_ANALYSIS}
                          element={<CVPAnalysis />}
                        />
                        <Route
                          path={RouteName.SORTIMENT_ANALYSIS}
                          element={<SortimentAnalysis />}
                        />
                        <Route
                          path={RouteName.INDEX_ANALYSIS}
                          element={<IndexAnalysis />}
                        />
                        <Route
                          path={RouteName.PERETO_ANALYSIS}
                          element={<ParetoAnalysis />}
                        />
                        <Route
                          path={RouteName.TREND_ANALYSIS}
                          element={<TrendAnalysis />}
                        />
                        <Route
                          path={RouteName.VARIATION_ANALYSIS}
                          element={<VariationAnalysis />}
                        />
                        <Route
                          path={RouteName.TAX_ANALYSIS}
                          element={<TaxAnalysis />}
                        />

                        <Route
                          path={RouteName.EVALUATION}
                          element={
                            <Report
                              EconomicAnalysisPage={EconomicAnalysis}
                              StructureAnalysisPage={StructureAnalysis}
                              IndexAnalysisPage={IndexAnalysis}
                              CVPAnalysisPage={CVPAnalysis}
                              SortimentAnalysisPage={SortimentAnalysis}
                              ParetoAnalysisPage={ParetoAnalysis}
                              TrendAnalysisPage={TrendAnalysis}
                              VariationAnalysisPage={VariationAnalysis}
                              TaxAnalysisPage={TaxAnalysis}
                            />
                          }
                        />
                      </Routes>
                    </ProjectProvider>
                  </Router>
                </SaveDataProvider>
              </SnackbarProvider>
            </UpdateSnackbarProvider>
          </ErrorProvider>
        </ThemeProvider>
      </Provider>
    </MathJaxContext>
  );
}
