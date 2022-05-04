import TableDynamic from '../../components/TableDynamic';
import CVPResult from './CVPResult';
import SingleInput from '../../components/SingleInput';
import HeaderBar from '../../components/HeaderBar';
import { useAppSelector } from 'renderer/store/hooks';
import TextField from '../../components/TextField';
import {CVPActions, selectCVP} from "./cvpSlice";
import Title from "../../components/Title";

export default function CVPAnalysis(props:any) {
  const { headers, data, items, values, fixTotal, minProfit, text } =
    useAppSelector(selectCVP);

  return (
    <div className={'task-container'}>
      {!props.hideHeader && <HeaderBar id={'4'} title={'CVP analýza'} back={"taskselect"}/>}

      <Title/>

      <div>
        <TableDynamic
          corner={'Názov výrobku'}
          headerType={'textCVP'}
          header={headers}
          inputType={'input'}
          inputs={items}
          data={data}
          values={values}
          dynRows={true}
          dynCols={false}
          actions={CVPActions}
        />

        <div className={'row'}>
          <div className={"col-2"}/>
          <div className={'col-4'}>
            <SingleInput
              input={CVPActions.setFixTotal}
              value={fixTotal}
              title={'FIXNÉ NÁKLADY(€)'}
            />
          </div>
          <div className={'col-4'}>
            <SingleInput
              input={CVPActions.setMinProfit}
              value={minProfit}
              title={'MINIMÁLNY ZISK(€)'}
            />
          </div>
        </div>
      </div>

      <CVPResult />

      <TextField text={text} action={CVPActions.changeText} />
    </div>
  );
}
