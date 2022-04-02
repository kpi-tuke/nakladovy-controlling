import TableDynamic from '../TableDynamic';
import Result2 from '../results/Result2';
import HeaderBar from '../HeaderBar';
import {selectStructure, structureActions} from 'renderer/store/slice';
import {costs} from '../chartOfAccounts';
import TextField from '../TextField';
import {useStructureCalc} from 'renderer/calculations';
import {useAppSelector} from 'renderer/store/hooks';

export default function Task2() {
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
  ];

  const result = useStructureCalc(data);

  return (
    <div className={'task-container'}>
      <HeaderBar id={"2"} title={'Štruktúrna analýza'}/>

      <h1 className={'result-h1'}>Vstupy</h1>

      <TableDynamic
        corner={'↓Nákladové druhy | Kalkulačné položky→'}
        headerType={'select'}
        header={headers}
        inputType={'select'}
        inputs={items}
        data={data}
        dynRows={true}
        dynCols={true}
        selectRow={costs}
        selectCol={selectCol}
        actions={structureActions}
      />

      <Result2 result={{items, headers, ...result}}/>

      <TextField text={text} action={structureActions.changeText}/>
    </div>
  );
}
