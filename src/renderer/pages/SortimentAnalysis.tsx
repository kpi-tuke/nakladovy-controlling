import TableDynamic from '../components/TableDynamic';
import SortimentResult from '../components/results/SortimentResult';
import HeaderBar from '../components/HeaderBar';
import {selectSortiment, sortimentActions} from 'renderer/store/slice';
import {useAppSelector} from 'renderer/store/hooks';
import TextField from "../components/TextField";
import {useSortimentCalc} from 'renderer/calculations';

export default function SortimentAnalysis() {

  const {headers, values, data, items, text} = useAppSelector(selectSortiment);

  const result = useSortimentCalc(data)

  return (
    <div className={"task-container"}>
      <HeaderBar id={"5"} title={'Sortimentná analýza'}/>

      <h1 className={"result-h1"}>Vstupy</h1>

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
