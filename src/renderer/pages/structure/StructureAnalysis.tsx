import TableDynamic from '../../components/TableDynamic';
import StructureResult from './StructureResult';
import HeaderBar from '../../components/HeaderBar';
import groupedOptions from '../../chartOfAccounts';
import TextField from '../../components/TextField';
import {useAppSelector} from 'renderer/store/hooks';
import {selectStructure, structureActions} from "./structureSlice";
import Title from "../../components/Title";

export default function StructureAnalysis(props:any) {
  const {corner, headers, items, data, text} = useAppSelector(selectStructure);

  const selectCol = [
    {value: 7, label: 'Priamy materiál'},
    {value: 8, label: 'Priame mzdy'},
    {value: 9, label: 'Ostatné náklady'},
    {value: 10, label: 'Výrobná réžia'},
    {value: 11, label: 'Správna réžia'},
    {value: 12, label: 'Odbytová réžia'},
    {value: 13, label: 'Zásobovacia réžia'},
    {value: 14, label: 'Dopravná réžia'},
  ]

  return (
    <div className={'task-container'}>
      {!props.hideHeader && <HeaderBar id={"2"} title={'Štruktúrna analýza'}  back={"taskselect"}/>}

      <Title/>

      <TableDynamic
        corner={corner}
        headerType={'select'}
        header={headers}
        inputType={'select'}
        inputs={items}
        data={data}
        dynRows={true}
        dynCols={true}
        selectRow={[groupedOptions[0]]}
        selectCol={selectCol}
        actions={structureActions}
      />

      <StructureResult/>

      <TextField text={text} action={structureActions.changeText}/>
    </div>
  );
}
