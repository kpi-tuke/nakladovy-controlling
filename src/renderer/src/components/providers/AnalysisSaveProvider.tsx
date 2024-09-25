import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useSnackbar } from './SnackbarProvider';
import { useAppSelector } from '@renderer/store/hooks';
import { selectEconomic } from '@renderer/pages/economic/economicSlice';
import { selectStructure } from '@renderer/pages/structure/structureSlice';
import { selectCVP } from '@renderer/pages/cvp/cvpSlice';
import { selectSortiment } from '@renderer/pages/sortiment/sortimentSlice';
import { selectIndex } from '@renderer/pages/index/indexSlice';
import { selectPareto } from '@renderer/pages/pareto/paretoSlice';
import { selectEvaluation } from '@renderer/pages/report/evaluationSlice';

const SaveContext = createContext<{
  save: VoidFunction;
  saveButtonDisabled: boolean;
}>({
  save: () => {},
  saveButtonDisabled: false,
});

type Props = {
  children: ReactNode;
};

const SaveDataProvider: React.FC<Props> = ({ children }) => {
  const economic = useAppSelector(selectEconomic);
  const structure = useAppSelector(selectStructure);
  const cvp = useAppSelector(selectCVP);
  const sortiment = useAppSelector(selectSortiment);
  const chain = useAppSelector(selectIndex);
  const pareto = useAppSelector(selectPareto);
  const { tasks } = useAppSelector(selectEvaluation);

  const [path, setPath] = useState<string | undefined>(undefined);
  const [oldData, setOldData] = useState<any>(null);
  const { open } = useSnackbar();

  const onceSaved = !!path;

  const dataChanged = useMemo(() => {
    const oldString = JSON.stringify(oldData);
    const newString = JSON.stringify({
      economic,
      sortiment,
      structure,
      chain,
      cvp,
      pareto,
      tasks,
    });

    return oldString !== newString && onceSaved;
  }, [
    oldData,
    economic,
    sortiment,
    structure,
    chain,
    cvp,
    pareto,
    tasks,
    onceSaved,
  ]);

  const save = async () => {
    let tempPath;

    if (!onceSaved) {
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

    const isSaved = await window.electron.saveProject(json);
    if (isSaved) {
      setOldData(newData);
      open('Súbor bol uložený.');
    } else {
      open('Súbor sa nepodarilo uložiť.');
    }
  };

  return (
    <SaveContext.Provider
      value={{
        save,
        saveButtonDisabled: !onceSaved ? false : !dataChanged,
      }}
    >
      {children}
    </SaveContext.Provider>
  );
};

export default SaveDataProvider;

export const useDataSave = () => useContext(SaveContext);
