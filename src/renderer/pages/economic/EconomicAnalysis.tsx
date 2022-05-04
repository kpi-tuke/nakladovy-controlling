// import EconomicResult from './EconomicResult';
import HeaderBar from '../../components/HeaderBar';
import groupedOptions from '../../chartOfAccounts';
import TableDynamic from '../../components/TableDynamic';
import TextField from '../../components/TextField';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import { useState } from 'react';
import { economicActions, selectEconomic } from './economicSlice';
import { sortTable } from '../../helper';
// import { economicCalculation } from './economicCalculation';
import Title from '../../components/Title';

export default function EconomicAnalysis(props: any) {
  const { corner, headers, items, data, values, text, accounts } =
    useAppSelector(selectEconomic);
  const dispatch = useAppDispatch();
  const [analytic, setAnalytic] = useState<boolean>(false);
  function sort() {
    const { newHeaders, newData } = sortTable(headers, data, 0);
    dispatch(
      economicActions.openProject({
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
    console.log(analytic);
  }

  return (
    <div className={'task-container'}>
      {!props.hideHeader && (
        <HeaderBar
          id={'1'}
          title={'Ekonomická analýza hospodárenia'}
          back={'taskselect'}
        />
      )}

      <Title
        sortable={true}
        analytic={analytic}
        toggleAnalytic={toggleAnalytic}
        sort={sort}
      />

      <div className={'row hideInPrint'}>
        {new Set(headers).size !== headers.length ? (
          <div
            className={'col-12'}
            style={{ textAlign: 'center', color: 'red', height: 30 }}
          >
            Pozor! Duplikované hodnoty.
          </div>
        ) : (
          <div
            className={'col-12'}
            style={{ textAlign: 'center', color: 'red', height: 30 }}
          >
            <p></p>
          </div>
        )}
      </div>

      <TableDynamic
        corner={'Ekonomická položka (Náklady(€) /Výnosy(€))'}
        headerType={'input'}
        header={headers}
        inputType={'select'}
        inputs={items}
        data={data}
        analytic={analytic}
        accounts={accounts}
        dynRows={true}
        dynCols={true}
        selectRow={groupedOptions}
        actions={economicActions}
      />

      {/*<EconomicResult*/}
      {/*  result={{ headers, ...economicCalculation(data, values) }}*/}
      {/*/>*/}

      <TextField text={text} action={economicActions.changeText} />
    </div>
  );
}
