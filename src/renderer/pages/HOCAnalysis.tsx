import HeaderBar from '../components/HeaderBar';
import Title from '../components/Title';
import { useSelector } from 'react-redux';
import { sortTable } from '../helper';
import { useAppDispatch } from '../store/hooks';
import { useState } from 'react';
import TextField from '../components/TextField';
import { defaultState} from '../store/rootReducer';
import { RootState } from '../store/store';
import withTable from "../components/tables/HOCTable";

export default function withAnalysis(
  selector: (state: RootState) => defaultState,
  actions: any,
  TableItems: (props: any) => JSX.Element,
  TableHeaders: (props: any) => JSX.Element,
  Result: () => JSX.Element,
) {
  return () => {
    const { id, title, corner, headers, items, data, values, text, accounts, sortable, hasAnalytic, dynRows, dynCols } =
      useSelector(selector);
    const dispatch = useAppDispatch();
    const [analytic, setAnalytic] = useState<boolean>(false);

    function sort() {

      const { newHeaders, newData } = sortTable(headers, data, id === 3 ? 1 : 0);
      dispatch(
        actions.openProject({
          corner: corner,
          headers: newHeaders,
          data: newData,
          items,
          values,
          text,
          accounts,
        })
      );
    }

    function toggleAnalytic() {
      setAnalytic(!analytic);
    }

    const Table: () => JSX.Element = withTable(TableItems, TableHeaders, selector, analytic, actions, dynRows, dynCols)
    return (
      <div className={'task-container new-page-after'}>
        <HeaderBar
          id={id}
          title={title}
          back={'taskselect'}
        />
        <Title
          sortable={sortable}
          analytic={analytic}
          hasAnalytic={hasAnalytic}
          toggleAnalytic={toggleAnalytic}
          sort={sort}
        />
        <Table/>

        <Result/>

        <TextField text={text} action={actions.changeText} />
      </div>
    );
  };
}
