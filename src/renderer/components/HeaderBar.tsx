import { useNavigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  reportActions,
  selectChain,
  selectCVP,
  selectEconomic, selectPareto,
  selectReport,
  selectSortiment,
  selectStructure
} from '../store/slice';

export default function HeaderBar(props: any) {
  const dispatch = useAppDispatch();

  const navigate = useNavigate()

  function addToReport(id: string) {
    dispatch(reportActions.addTask(id));
  }

  function printToPDF(id: string) {
    // @ts-ignore
    window.electron.printToPdf(id, (arg) => console.log(arg));
  }

  function goBackTo(to: string) {
    navigate("/" + to)
  }

  const economic = useAppSelector(selectEconomic);
  const structure = useAppSelector(selectStructure);
  const cvp = useAppSelector(selectCVP);
  const sortiment = useAppSelector(selectSortiment);
  const chain = useAppSelector(selectChain);
  const pareto = useAppSelector(selectPareto);
  const { tasks } = useAppSelector(selectReport);

  function save() {
    const json = JSON.stringify({economic, sortiment, structure, chain, cvp, pareto, tasks})

    // @ts-ignore
    window.electron.saveProject(json)
  }

  return (
    <div className={'header-bar row'}>
      <div className={'row col-3'}>
        {!props.addToReport && (

            <div
              className={'col-6 header-button'}
              onClick={() => addToReport(props.id)}
            >
              + Pridať do reportu
            </div>
            )}
        {!props.printToPDF && (
            <div
              className={'col-6 header-button'}
              onClick={() => printToPDF(props.title)}
            >
              + Tlačiť do PDF
            </div>
        )}
        {props.save && (
          <div
            className={'col-6 header-button'}
            onClick={save}
          >
            + Uložiť
          </div>
        )}

      </div>

      <div className={'col-6 header-title'}>{props.title}</div>

      <div className={'row col-3'}>
        {props.back && (
          <>
            <div className={"col-4"}/>
            <div className={"col-4"}/>
            <div className={'col-4 header-button'} onClick={() => goBackTo(props.back)}>
              ← Späť
            </div></>
        )}
      </div>
    </div>
  );
}
