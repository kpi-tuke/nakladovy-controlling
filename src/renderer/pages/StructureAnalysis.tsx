import TableDynamic from '../components/TableDynamic';
import StructureResult from '../components/results/StructureResult';
import HeaderBar from '../components/HeaderBar';
import {selectStructure, structureActions} from 'renderer/store/slice';
import groupedOptions from '../chartOfAccounts';
import TextField from '../components/TextField';
import {useStructureCalc} from 'renderer/calculations';
import {useAppSelector} from 'renderer/store/hooks';

export default function StructureAnalysis(props:any) {
  const {headers, items, data, text} = useAppSelector(selectStructure);

  const selectCol = [
    {value: 7, label: 'Priamy materiál'},
    {value: 8, label: 'Priame mzdy'},
    {value: 9, label: 'Ostatné priame náklady'},
    {value: 10, label: 'Výrobná réžia'},
    {value: 11, label: 'Správna réžia'},
    {value: 12, label: 'Odbytová réžia'},
    {value: 13, label: 'Zásobovacia réžia'},
    {value: 14, label: 'Dopravná réžia'},
  ]

  const result = useStructureCalc(data);

  return (
    <div className={'task-container'}>
      {!props.hideHeader && <HeaderBar id={"2"} title={'Štruktúrna analýza'}  back={"taskselect"}/>}

      <TableDynamic
        corner={'↓Nákladové druhy | Kalkulačné položky→'}
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

      <StructureResult result={{items, headers, ...result}}/>

      <TextField text={text} action={structureActions.changeText}/>
    </div>
  );
}
