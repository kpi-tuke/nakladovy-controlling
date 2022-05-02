import TableDynamic from '../components/TableDynamic';
import ParetoResult from '../components/results/ParetoResult';
import HeaderBar from '../components/HeaderBar';
import {useAppSelector} from 'renderer/store/hooks';
import {paretoActions, selectPareto} from 'renderer/store/slice';
import TextField from '../components/TextField';
import {paretoResult} from 'renderer/calculations';

export default function ParetoAnalysis(props:any) {
  const {headers, values, items, data, text} = useAppSelector(selectPareto);

  const result = paretoResult(data, items);

  return (
    <div className={'task-container'}>
      {!props.hideHeader && <HeaderBar id={"6"} title={'Pareto analýza nákladov'}  back={"taskselect"}/>}

      <h1 className={'result-h1'}>Vstupy</h1>

      <TableDynamic
        corner={'Príčiny vzniku nákladov'}
        headerType={'textCVP'}
        header={headers}
        inputType={'input'}
        inputs={items}
        data={data}
        values={values}
        rows={7}
        cols={2}
        dynRows={true}
        dynCols={false}
        actions={paretoActions}
      />
      <ParetoResult result={{...result}}/>

      <TextField text={text} action={paretoActions.changeText}/>
    </div>
  );
}
