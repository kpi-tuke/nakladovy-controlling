import HeaderBar from '../components/HeaderBar';
import { useSelector } from 'react-redux';
import TextField from '../components/TextField';
import { defaultState } from '../store/rootReducer';
import { RootState } from '../store/store';
import withTable from '../components/tables/HOCTable';

export default function withAnalysis(
  selector: (state: RootState) => defaultState,
  actions: any,
  TableItems: (props: any) => JSX.Element,
  TableHeaders: (props: any) => JSX.Element,
  Result: () => JSX.Element
) {
  return () => {
    const { id, title, text } = useSelector(selector);

    const Table: () => JSX.Element = withTable(
      TableItems,
      TableHeaders,
      selector,
      actions
    );

    return (
      <div className={'task-container new-page-after'}>
        <HeaderBar
          id={id}
          title={title}
          back={'taskselect'}
          addToReport={true}
          printToPDF={true}
        />
        <Table />

        <Result />

        <TextField text={text} action={actions.changeText} />
      </div>
    );
  };
}
