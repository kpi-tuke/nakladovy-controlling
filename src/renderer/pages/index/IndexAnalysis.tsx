import IndexResult from './IndexResult';
import HeaderBar from '../../components/HeaderBar';
import groupedOptions from '../../chartOfAccounts';
import TableDynamic from '../../components/TableDynamic';
import { useSelector } from 'react-redux';
import TextField from '../../components/TextField';
import { useAppDispatch } from '../../store/hooks';
import { useState } from 'react';
import { indexActions, selectIndex } from './indexSlice';
import { sortTable } from '../../helper';
import Title from "../../components/Title";

export default function IndexAnalysis(props: any) {
  const { corner, headers, items, data, values, text, accounts } =
    useSelector(selectIndex);
  const dispatch = useAppDispatch();
  const [analytic, setAnalytic] = useState<boolean>(false);

  function sort() {
    const { newHeaders, newData } = sortTable(headers, data, 1);
    dispatch(
      indexActions.openProject({
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

  return (
    <div className={'task-container'}>
      {!props.hideHeader && (
        <HeaderBar
          id={'3'}
          title={'Analýza reťazových a bázických indexov'}
          back={'taskselect'}
        />
      )}

      <Title
        sortable={true}
        analytic={analytic}
        toggleAnalytic={toggleAnalytic}
        sort={sort}
      />

      {new Set(headers).size !== headers.length && (
        <div className={'row'}>
          <div
            className={'col-12'}
            style={{ textAlign: 'center', color: 'red' }}
          >
            Duplikované hodnoty
          </div>
        </div>
      )}

      <TableDynamic
        corner={'Ekonomická položka (€)'}
        headerType={'input'}
        header={headers}
        inputType={'select'}
        inputs={items}
        data={data}
        values={values}
        accounts={accounts}
        analytic={analytic}
        dynRows={true}
        dynCols={true}
        selectRow={groupedOptions}
        actions={indexActions}
        base={true}
      />

      <IndexResult />

      <TextField text={text} action={indexActions.changeText} />
    </div>
  );
}
