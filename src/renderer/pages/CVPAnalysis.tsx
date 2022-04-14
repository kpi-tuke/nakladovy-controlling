import TableDynamic from '../components/TableDynamic';
import CVPResult from '../components/results/CVPResult';
import SingleInput from '../components/SingleInput';
import HeaderBar from '../components/HeaderBar';
import { CVPActions, selectCVP } from 'renderer/store/slice';
import { useAppSelector } from 'renderer/store/hooks';
import TextField from '../components/TextField';
import { useCVPCalc } from 'renderer/calculations';

export default function CVPAnalysis() {
  const { headers, data, items, values, fixTotal, minProfit, text } =
    useAppSelector(selectCVP);

  const result = useCVPCalc(data, fixTotal, minProfit);

  return (
    <div className={'task-container'}>
      <HeaderBar id={'4'} title={'CVP analýza'} />

      <h1 className={'result-h1'}>Vstupy</h1>

      <div className={"row hide"}>
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

      <div className={'print-hidden'}>
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
