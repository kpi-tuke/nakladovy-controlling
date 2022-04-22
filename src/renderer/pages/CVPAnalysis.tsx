import TableDynamic from '../components/TableDynamic';
import CVPResult from '../components/results/CVPResult';
import SingleInput from '../components/SingleInput';
import HeaderBar from '../components/HeaderBar';
import { CVPActions, selectCVP } from 'renderer/store/slice';
import { useAppSelector } from 'renderer/store/hooks';
import TextField from '../components/TextField';
import { useCVPCalc } from 'renderer/calculations';

export default function CVPAnalysis(props:any) {
  const { headers, data, items, values, fixTotal, minProfit, text } =
    useAppSelector(selectCVP);

  const result = useCVPCalc(data, fixTotal, minProfit);

  return (
    <div className={'task-container'}>
      {!props.hideHeader && <HeaderBar id={'4'} title={'CVP analýza'} back={"taskselect"}/>}



      <div>
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

        <div className={'row'}>
          <div className={'col-6'}>
            <SingleInput
              input={CVPActions.setFixTotal}
              value={fixTotal}
              title={'FIXNÉ NÁKLADY(€)'}
            />
          </div>
          <div className={'col-6'}>
            <SingleInput
              input={CVPActions.setMinProfit}
              value={minProfit}
              title={'MINIMÁLNY ZISK(€)'}
            />
          </div>
        </div>
      </div>

      <CVPResult result={{ items, ...result }} />

      <TextField text={text} action={CVPActions.changeText} />
    </div>
  );
}
