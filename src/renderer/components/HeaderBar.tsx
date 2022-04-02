import '../ScreenStyle.css';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../store/hooks';
import {reportActions} from '../store/slice';

export default function HeaderBar(props: any) {
  const dispatch = useAppDispatch();

  function addToReport(id: string) {
    dispatch(reportActions.addTask(id));
  }

  return (
    <div className={'header-bar row'}>
      {!props.addToReport && (
        <div
          className={'col-2 header-button'}
          onClick={() => addToReport(props.id)}
        >
          + Pridať do reportu
        </div>
      )}

      {
        !props.back && props.addToReport && <div className={"col-2"}/>
      }

      <div
        className={'header-title ' + (props.addToReport ? props.back ? 'col-12' : "col-8" : 'col-8')}
      >
        {props.title}
      </div>
      <div className={'col-1'}/>
      {!props.back && (
        <Link className={'col-1'} to={'/taskselect'}>
          <div className={'header-button'}>← Späť</div>
        </Link>
      )}
    </div>
  );
}
