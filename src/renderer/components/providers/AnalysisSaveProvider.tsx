import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import { selectCVP } from 'renderer/pages/cvp/cvpSlice';
import { selectEconomic } from 'renderer/pages/economic/economicSlice';
import { selectIndex } from 'renderer/pages/index/indexSlice';
import { selectPareto } from 'renderer/pages/pareto/paretoSlice';
import { selectEvaluation } from 'renderer/pages/report/evaluationSlice';
import { selectSortiment } from 'renderer/pages/sortiment/sortimentSlice';
import { selectStructure } from 'renderer/pages/structure/structureSlice';
import { useAppSelector } from 'renderer/store/hooks';
import { useSnackbar } from './SnackbarProvider';

const SaveContext = createContext<{
  save: VoidFunction;
  onceSaved: boolean;
  economicChanged: boolean;
}>({
  save: () => {},
  onceSaved: false,
  economicChanged: false,
});

type Props = {
  children: ReactNode;
};

const AnalysisSaveProvider: React.FC<Props> = ({ children }) => {
  const economic = useAppSelector(selectEconomic);
  const structure = useAppSelector(selectStructure);
  const cvp = useAppSelector(selectCVP);
  const sortiment = useAppSelector(selectSortiment);
  const chain = useAppSelector(selectIndex);
  const pareto = useAppSelector(selectPareto);
  const { tasks } = useAppSelector(selectEvaluation);

  const [path, setPath] = useState<string | undefined>(undefined);
  // TODO: pridat typ
  const [oldData, setOldData] = useState<any>(null);
  const { open } = useSnackbar();

  const onceSaved = !!path;

  const economicChanged = useMemo(() => {
    if (!oldData?.economic) return false;

    const oldString = JSON.stringify(oldData.economic);
    const newString = JSON.stringify(economic);

    return oldString !== newString && onceSaved;
  }, [oldData?.economic, economic]);

  const save = async () => {
    let tempPath;

    if (!onceSaved) {
      // @ts-ignore
      tempPath = await window.electron.chooseFilePath();

      setPath(tempPath);
    } else {
      tempPath = path;
    }

    const newData = {
      economic,
      sortiment,
      structure,
      chain,
      cvp,
      pareto,
      tasks,
    };

    const json = JSON.stringify({
      path: tempPath,
      data: newData,
    });

    // @ts-ignore
    const isSaved = await window.electron.saveProject(json);
    if (isSaved) {
      setOldData(newData);
      open('Súbor bol uložený.');
    } else {
      // TODO: zobrazenie hlasky, ze sa nepodarilo ulozit subor
    }
  };

  return (
    <SaveContext.Provider
      value={{
        save,
        onceSaved,
        economicChanged,
      }}
    >
      {children}
    </SaveContext.Provider>
  );
};

export default AnalysisSaveProvider;

export const useAnalysisSave = () => useContext(SaveContext);
