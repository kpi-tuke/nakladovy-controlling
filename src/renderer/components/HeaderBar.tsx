import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { reportActions } from '../store/slice';

export default function HeaderBar(props: any) {
  const dispatch = useAppDispatch();

  const navigate = useNavigate()

  function addToReport(id: string) {
    dispatch(reportActions.addTask(id));
  }

  function printToPDF(id: string) {
    // @ts-ignore
    window.electron.saveFile(id, (arg) => console.log(arg));
  }

  function goBack() {
    navigate("/taskselect")
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
      </div>

      <div className={'col-6 header-title'}>{props.title}</div>

      <div className={'row col-3'}>
        {!props.back && (
          <>
            <div className={"col-4"}/>
            <div className={"col-4"}/>
            <div className={'col-4 header-button'} onClick={goBack}>
              ← Späť
            </div></>
        )}
      </div>
    </div>
  );
}
