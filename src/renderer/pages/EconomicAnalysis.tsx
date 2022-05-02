import EconomicResult from '../components/results/EconomicResult';
import { economicActions, selectEconomic } from 'renderer/store/slice';
import HeaderBar from '../components/HeaderBar';
import groupedOptions from '../chartOfAccounts';
import TableDynamic from '../components/TableDynamic';
import TextField from '../components/TextField';
import { economicResult, sortTable } from 'renderer/calculations';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import {useState} from "react";

export default function EconomicAnalysis(props: any) {
  const { headers, items, data, values, text, accounts } = useAppSelector(selectEconomic);
  const dispatch = useAppDispatch();
  const [analytic, setAnalytic] = useState<boolean>(false)
  function sort() {
    if (new Set(headers).size === headers.length) {
      const { newHeaders, newData } = sortTable(headers, data, 0);
      dispatch(
        economicActions.open({
          headers: newHeaders,
          data: newData,
          items,
          values,
          text,
          accounts
        })
      );
    }
  }

  function toggleAnalytic() {
    setAnalytic(!analytic)
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
      <div className={'row'} style={{ height: 120}}>
        <div className={'col-3 sort-button'} onClick={toggleAnalytic}>{analytic ? "Odobrať" : "Pridať"} analytické účty</div>
        <div className={'col-2 hideInScreen'} />
        <div className={'col-2'} />
        <div className={'col-2'}>
          <h1 className={'result-h1'}>Vstupy</h1>
        </div>
        <div className={'col-4'} />
        <div className={'col-1 sort-button'} onClick={sort}>
          Zoradiť
        </div>
      </div>

      <div className={'row hideInPrint'}>
        {new Set(headers).size !== headers.length ? (
          <div
            className={'col-12'}
            style={{ textAlign: 'center', color: 'red', height:30 }}
          >
            Pozor! Duplikované hodnoty.
          </div>
        )
        : (<div
            className={'col-12'}
            style={{ textAlign: 'center', color: 'red', height:30 }}
          >
            <p></p>
          </div>)
        }
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

      <EconomicResult result={{ headers, ...economicResult(data, values) }} />

      <TextField text={text} action={economicActions.changeText} />
    </div>
  );
}
