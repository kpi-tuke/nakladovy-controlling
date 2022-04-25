import IndexResult from '../components/results/IndexResult';
import HeaderBar from '../components/HeaderBar';
import groupedOptions from '../chartOfAccounts';
import TableDynamic from '../components/TableDynamic';
import { indexActions, selectChain} from 'renderer/store/slice';
import {useSelector} from 'react-redux';
import TextField from "../components/TextField";
import {indexResult} from 'renderer/calculations';
import {useAppDispatch} from "../store/hooks";

export default function IndexAnalysis(props:any) {

  const {headers, items, data, values, text} = useSelector(selectChain);
  const dispatch = useAppDispatch()
  const result = indexResult(data, headers, values)

  function sortTable() {
    let tableCols: Map<string, number[]> = new Map<string, number[]>();
    for (let i = 1; i < headers.length; i++) {
      if(isNaN(parseInt(headers[i]))) {
        return
      }
      let col: number[] = data.map((value) => value[i])
      tableCols.set(headers[i], col);
    }
    let map: Map<string, number[]> = new Map(
      [...tableCols.entries()].sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    );

    let newHeaders: string[] = []
    let newData: number[][] = []
    newHeaders.push(headers[0])
    for (let row = 0; row < items.length; row++) {
      let col = 1
      newData.push([])
      newData[row][0] = data[row][0]
      for (const [key, value] of map.entries()) {
        newHeaders[col] = key;
        newData[row][col] = value[row]
        col++
      }
    }
    console.log(newData)
    console.log(newHeaders)
    dispatch(indexActions.open({headers: newHeaders, data: newData, items, values, text}))
  }

  return (
    <div className={'task-container'}>

      <div className={"row"}>
        <div className={"col-5"}/>
        <h1 className={'col-2 result-h1'}>Vstupy</h1>
        <div className={"col-4"}/>
        <div className={"col-1 sort-button"} onClick={sortTable}>Zoradiť</div>
      </div>

      {!props.hideHeader &&<HeaderBar
        id={"3"}
        title={'Analýza reťazových a bázických indexov'}
        back={"taskselect"}
      />}

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
