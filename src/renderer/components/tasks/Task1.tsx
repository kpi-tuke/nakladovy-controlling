import Result1 from '../results/Result1';
import {bilanceActions, selectBilance} from 'renderer/store/slice';
import HeaderBar from '../HeaderBar';
import groupedOptions from '../chartOfAccounts';
import TableDynamic from '../TableDynamic';
import TextField from '../TextField';
import {useBilanceCalc} from 'renderer/calculations';
import {useAppSelector} from 'renderer/store/hooks';

export default function Task1() {
  const {headers, items, data, values, text} = useAppSelector(selectBilance);

  const result = useBilanceCalc(data, values);

  return (
    <div className={'task-container'}>
      <HeaderBar id={"1"} title={'Ekonomická analýza hospodárenia'}/>

      <h1 className={'result-h1'}>Vstupy</h1>

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
        actions={bilanceActions}
      />

      <Result1 result={{...useAppSelector(selectBilance), ...result}}/>

      <TextField text={text} action={bilanceActions.changeText}/>
    </div>
  );
}
