import IndexResult from '../components/results/IndexResult';
import HeaderBar from '../components/HeaderBar';
import groupedOptions from '../chartOfAccounts';
import TableDynamic from '../components/TableDynamic';
import {indexActions, selectChain} from 'renderer/store/slice';
import {useSelector} from 'react-redux';
import TextField from "../components/TextField";
import {useChainCalc} from 'renderer/calculations';

export default function IndexAnalysis(props:any) {

  const {headers, items, data, values, text} = useSelector(selectChain);

  const result = useChainCalc(data, headers, values)

  return (
    <div className={'task-container'}>

      <h1 className={"result-h1"}>Vstupy</h1>

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
