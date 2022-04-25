import EconomicResult from '../components/results/EconomicResult';
import {economicActions, selectEconomic} from 'renderer/store/slice';
import HeaderBar from '../components/HeaderBar';
import groupedOptions from '../chartOfAccounts';
import TableDynamic from '../components/TableDynamic';
import TextField from '../components/TextField';
import {economicResult} from 'renderer/calculations';
import {useAppDispatch, useAppSelector} from 'renderer/store/hooks';

export default function EconomicAnalysis(props:any) {
  const {headers, items, data, values, text} = useAppSelector(selectEconomic);
  const result = economicResult(data, values);
  const dispatch = useAppDispatch()

  function sortTable() {
    let tableCols: Map<string, number[]> = new Map<string, number[]>();
    for (let i = 0; i < headers.length; i++) {
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
    for (let row = 0; row < items.length; row++) {
      let col = 0
      newData.push([])
      for (const [key, value] of map.entries()) {
        newHeaders[col] = key;
        newData[row][col] = value[row]
        col++
      }
    }
    dispatch(economicActions.open({headers: newHeaders, data: newData, items, values, text}))
  }



  return (
    <div className={'task-container'}>
      {
        !props.hideHeader && <HeaderBar id={"1"} title={'Ekonomická analýza hospodárenia'}  back={"taskselect"}/>
      }
      <div className={"row"}>
        <div className={"col-5"}/>
        <h1 className={'col-2 result-h1'}>Vstupy</h1>
        <div className={"col-4"}/>
          <div className={"col-1 sort-button"} onClick={sortTable}>Zoradiť</div>
      </div>
      <TableDynamic
        corner={'Ekonomická položka (Náklady(€) /Výnosy(€))'}
        headerType={'input'}
        header={headers}
        inputType={'select'}
        inputs={items}
        data={data}
        dynRows={true}
        dynCols={true}
        selectRow={groupedOptions}
        actions={economicActions}
      />

      <EconomicResult result={{headers, ...result}}/>

      <TextField text={text} action={economicActions.changeText}/>
    </div>
  );
}
