import TableDynamic from '../components/TableDynamic';
import SortimentResult from '../components/results/SortimentResult';
import HeaderBar from '../components/HeaderBar';
import {selectSortiment, sortimentActions} from 'renderer/store/slice';
import {useAppSelector} from 'renderer/store/hooks';
import TextField from "../components/TextField";
import {useSortimentCalc} from 'renderer/calculations';

export default function SortimentAnalysis(props:any) {

  const {headers, values, data, items, text} = useAppSelector(selectSortiment);

  const result = useSortimentCalc(data)

  return (
    <div className={"task-container"}>
      {!props.hideHeader && <HeaderBar id={"5"} title={'Sortimentná analýza'}  back={"taskselect"}/>}

      <TableDynamic
        corner={'Ekonomická položka'}
        headerType={'input'}
        header={headers}
        inputType={'text'}
        inputs={items}
        data={data}
        values={values}
        dynRows={false}
        dynCols={true}
        actions={sortimentActions}
      />

      <SortimentResult result={{headers, ...result}}/>

      <TextField text={text} action={sortimentActions.changeText}/>
    </div>
  );
}
