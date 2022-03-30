import Result3 from '../results/Result3';
import HeaderBar from '../HeaderBar';
import groupedOptions from '../chartOfAccounts';
import TableDynamic from '../TableDynamic';
import {chainActions, selectChain} from 'renderer/store/slice';
import { useSelector } from 'react-redux';
import TextField from "../TextField";
import { useChainCalc } from 'renderer/calculations';

export default function Task3() {

  const { headers, items, data, values, text } = useSelector(selectChain);
  
  const result = useChainCalc(data, headers, values)
  
  return (
    <div className={'task-container'}>

      <h1 className={"result-h1"}>Vstupy</h1>

      <HeaderBar
        title={'Analýza reťazových a bázických indexov druhových nákladov '}
      />

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
        actions={chainActions}
        base={true}
      />

      <Result3 result={{...result}} />

      <TextField text={text} action={chainActions.changeText}/>
    </div>
  );
}
