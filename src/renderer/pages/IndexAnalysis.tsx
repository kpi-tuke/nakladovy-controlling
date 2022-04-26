import IndexResult from '../components/results/IndexResult';
import HeaderBar from '../components/HeaderBar';
import groupedOptions from '../chartOfAccounts';
import TableDynamic from '../components/TableDynamic';
import {indexActions, selectChain} from 'renderer/store/slice';
import {useSelector} from 'react-redux';
import TextField from "../components/TextField";
import {indexResult, sortTable} from 'renderer/calculations';
import {useAppDispatch} from "../store/hooks";

export default function IndexAnalysis(props:any) {

  const {headers, items, data, values, text} = useSelector(selectChain);
  const dispatch = useAppDispatch()
  const result = indexResult(data, headers, values)


  function sort() {
    if (new Set(headers).size === headers.length) {
      const {newHeaders, newData} = sortTable(headers, data, 1)
      dispatch(indexActions.open({headers: newHeaders, data: newData, items, values, text}))
    }
  }

  return (
    <div className={'task-container'}>

      {!props.hideHeader &&<HeaderBar
        id={"3"}
        title={'Analýza reťazových a bázických indexov'}
        back={"taskselect"}
      />}

      <div className={"row"}>
        <div className={"col-5"}/>
        <h1 className={'col-2 result-h1'}>Vstupy</h1>
        <div className={"col-4"}/>
        <div className={"col-1 sort-button"} onClick={sort}>Zoradiť</div>
      </div>


      {new Set(headers).size !== headers.length && (
        <div className={"row"}>
          <div className={"col-12"} style={{textAlign: "center", color: "red"}}>Duplikované hodnoty</div></div>
      )}

      <TableDynamic
        corner={'Ekonomická položka'}
        headerType={'input'}
        header={headers}
        inputType={'select'}
        inputs={items}
        data={data}
        values={values}
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
