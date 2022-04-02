import TableDynamic from '../TableDynamic';
import Result6 from '../results/Result6';
import HeaderBar from '../HeaderBar';
import {useAppSelector} from 'renderer/store/hooks';
import {paretoActions, selectPareto} from 'renderer/store/slice';
import TextField from '../TextField';
import {usePretoCalc} from 'renderer/calculations';

export default function Task6() {
  const {headers, values, items, data, text} = useAppSelector(selectPareto);

  const result = usePretoCalc(data, items);

  return (
    <div className={'task-container'}>
      <HeaderBar id={"6"} title={'Pareto analýza nákladov'}/>

      <h1 className={'result-h1'}>Vstupy</h1>

      <TableDynamic
        corner={'Príčiny vzniku nákladov'}
        headerType={'text'}
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
      <Result6 result={{...result}}/>

      <TextField text={text} action={paretoActions.changeText}/>
    </div>
  );
}
