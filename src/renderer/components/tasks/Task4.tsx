import TableDynamic from '../TableDynamic';
import Result4 from '../results/Result4';
import SingleInput from '../SingleInput';
import HeaderBar from '../HeaderBar';
import {CVPActions, selectCVP} from 'renderer/store/slice';
import {useAppSelector} from 'renderer/store/hooks';
import TextField from "../TextField";
import {useCVPCalc} from 'renderer/calculations';

export default function Task4() {

  const {headers, data, items, values, fixTotal, minProfit, text} =
    useAppSelector(selectCVP);

  const result = useCVPCalc(data, fixTotal, minProfit)

  return (
    <div className={'task-container'}>
      <HeaderBar id={"4"} title={'CVP analýza'}/>

      <h1 className={"result-h1"}>Vstupy</h1>

      <div className={"row"}>
        <div className={"col-8"}>
          <TableDynamic
            corner={'Výrobok'}
            headerType={'text'}
            header={headers}
            inputType={'input'}
            inputs={items}
            data={data}
            values={values}
            dynRows={true}
            dynCols={false}
            actions={CVPActions}
          />
        </div>

        <div className={"col-2"}>
          <SingleInput
            input={CVPActions.setFixTotal}
            value={fixTotal}
            title={'FIXNÉ NÁKLADY(€)'}
          />
        </div>

        <div className={"col-2"}>
          <SingleInput
            input={CVPActions.setMinProfit}
            value={minProfit}
            title={'MINIMÁLNY ZISK(€)'}
          />
        </div>
      </div>

      <Result4 result={{items, ...result}}/>

      <TextField text={text} action={CVPActions.changeText}/>
    </div>
  );
}
