import { CVPActions } from '@renderer/pages/cvp/cvpSlice';
import { economicActions } from '@renderer/pages/economic/economicSlice';
import { indexActions } from '@renderer/pages/index/indexSlice';
import { paretoActions } from '@renderer/pages/pareto/paretoSlice';
import { evaluationActions } from '@renderer/pages/report/evaluationSlice';
import { sortimentActions } from '@renderer/pages/sortiment/sortimentSlice';
import { structureActions } from '@renderer/pages/structure/structureSlice';
import { taxActions } from '@renderer/pages/tax/taxSlice';
import { trendActions } from '@renderer/pages/trend/trendSlice';
import { variationActions } from '@renderer/pages/variation/variationSlice';
import { useAppDispatch } from '@renderer/store/hooks';
import { projectActions } from '@renderer/store/projectSlice';
import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDataSave } from './AnalysisSaveProvider';
import { RouteName, routes } from '@renderer/routes';
import { useSnackbar } from './SnackbarProvider';

type ProjectContextProps = {
  newProject: () => void;
  openProject: () => void;
  printAnalysis: () => void;
};

const ProjectContext = createContext<ProjectContextProps | null>(null);

type Props = PropsWithChildren;

const ProjectProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { save, saveButtonDisabled, resetPath } = useDataSave();
  const { pathname } = useLocation();
  const { open } = useSnackbar();

  const newProject = () => {
    dispatch(economicActions.reset());
    dispatch(structureActions.reset());
    dispatch(CVPActions.reset());
    dispatch(indexActions.reset());
    dispatch(sortimentActions.reset());
    dispatch(paretoActions.reset());
    dispatch(evaluationActions.reset());
    dispatch(variationActions.reset());
    dispatch(taxActions.reset());
    dispatch(trendActions.reset());
    dispatch(projectActions.setCreated());
    resetPath();
    navigate('/taskselect');
  };

  const openProject = () => {
    window.electron.openProject();
    window.electron.onOpen('open', (arg) => {
      const json = JSON.parse(arg);

      dispatch(economicActions.openProject(json.economic));
      dispatch(structureActions.openProject(json.structure));
      dispatch(CVPActions.openProject(json.cvp));
      dispatch(indexActions.openProject(json.chain));
      dispatch(sortimentActions.openProject(json.sortiment));
      dispatch(paretoActions.openProject(json.pareto));
      dispatch(evaluationActions.openProject(json.tasks));
      dispatch(variationActions.openProject(json.variation));
      dispatch(taxActions.openProject(json.tax));
      dispatch(trendActions.openProject(json.trend));
      dispatch(projectActions.setCreated());
      navigate('/taskselect');
    });
  };

  const saveProject = () => {
    if (!saveButtonDisabled) {
      save();
    }
  };

  const printAnalysis = async () => {
    const routeDetails = routes[pathname as RouteName];

    if (routeDetails.printToPDF) {
      const isGenerated = await window.electron.printToPdf(routeDetails.title);

      if (isGenerated) {
        open('PDF sa úspešne vygenerovalo');
      } else {
        open('PDF sa nepodarilo vygenerovať');
      }
    }
  };

  const openReport = () => {
    console.log('-- OPENING REPORT');
    navigate(RouteName.EVALUATION);
  };

  useEffect(() => {
    window.electron.ipcRenderer.removeAllListeners('menu-new-project');
    window.electron.ipcRenderer.on('menu-new-project', newProject);

    return () => {
      window.electron.ipcRenderer.removeAllListeners('menu-new-project');
    };
  }, [newProject]);

  useEffect(() => {
    window.electron.ipcRenderer.removeAllListeners('menu-open-project');
    window.electron.ipcRenderer.on('menu-open-project', openProject);

    return () => {
      window.electron.ipcRenderer.removeAllListeners('menu-open-project');
    };
  }, [openProject]);

  useEffect(() => {
    window.electron.ipcRenderer.removeAllListeners('menu-save-project');
    window.electron.ipcRenderer.on('menu-save-project', saveProject);

    return () => {
      window.electron.ipcRenderer.removeAllListeners('menu-save-project');
    };
  }, [saveProject]);

  useEffect(() => {
    window.electron.ipcRenderer.removeAllListeners('menu-print-project');
    window.electron.ipcRenderer.on('menu-print-project', printAnalysis);

    return () => {
      window.electron.ipcRenderer.removeAllListeners('menu-print-project');
    };
  }, [printAnalysis]);

  useEffect(() => {
    window.electron.ipcRenderer.removeAllListeners('menu-open-report');
    window.electron.ipcRenderer.on('menu-open-report', openReport);

    return () => {
      window.electron.ipcRenderer.removeAllListeners('menu-open-report');
    };
  }, [navigate]);

  return (
    <ProjectContext.Provider
      value={{
        newProject,
        openProject,
        printAnalysis,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
