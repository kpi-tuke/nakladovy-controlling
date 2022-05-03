import IndexResult from './IndexResult';
import HeaderBar from '../../components/HeaderBar';
import groupedOptions from '../../chartOfAccounts';
import TableDynamic from '../../components/TableDynamic';
import {useSelector} from 'react-redux';
import TextField from "../../components/TextField";
import {useAppDispatch} from "../../store/hooks";
import {useState} from "react";
import {indexActions, selectIndex} from "./indexSlice"
import {indexCalculation} from "./indexCalculation";
import {sortTable} from "../../helper";

export default function IndexAnalysis(props:any) {

  const {headers, items, data, values, text, accounts} = useSelector(selectIndex);
  const dispatch = useAppDispatch()
  const result = indexCalculation(data, headers, values)
  const [analytic, setAnalytic] = useState<boolean>(false)

  function sort() {
    if (new Set(headers).size === headers.length) {
      const {newHeaders, newData} = sortTable(headers, data, 1)
      dispatch(indexActions.openProject({headers: newHeaders, data: newData, items, values, text, accounts}))
    }
  }

  function toggleAnalytic() {
    setAnalytic(!analytic)
  }

  return (
    <div className={'task-container'}>

      {!props.hideHeader &&<HeaderBar
        id={"3"}
        title={'Analýza reťazových a bázických indexov'}
        back={"taskselect"}
      />}

      <div className={"row"}>
        <div className={'col-3 sort-button'} onClick={toggleAnalytic}>Pridať analytické účty</div>
        <div className={'col-2'} />
        <h1 className={'col-2 result-h1'}>Vstupy</h1>
        <div className={"col-4"}/>
        <div className={"col-1 sort-button"} onClick={sort}>Zoradiť</div>
      </div>


      {new Set(headers).size !== headers.length && (
        <div className={"row"}>
          <div className={"col-12"} style={{textAlign: "center", color: "red"}}>Duplikované hodnoty</div></div>
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

      <IndexResult result={{...result}}/>

      <TextField text={text} action={indexActions.changeText}/>
    </div>
  );
}
