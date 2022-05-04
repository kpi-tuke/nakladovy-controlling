import TableDynamic from '../../components/TableDynamic';
import SortimentResult from './SortimentResult';
import HeaderBar from '../../components/HeaderBar';
import {useAppSelector} from 'renderer/store/hooks';
import TextField from "../../components/TextField";
import {selectSortiment, sortimentActions} from "./sortimentSlice";
import Title from "../../components/Title";

export default function SortimentAnalysis(props:any) {

  const {corner, headers, values, data, items, text} = useAppSelector(selectSortiment);

  return (
    <div className={"task-container"}>
      {!props.hideHeader && <HeaderBar id={"5"} title={'Sortimentná analýza'}  back={"taskselect"}/>}

      <Title/>

      <TableDynamic
        corner={corner}
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

      <SortimentResult/>

      <TextField text={text} action={sortimentActions.changeText}/>
    </div>
  );
}
