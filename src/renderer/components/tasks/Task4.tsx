import TableDynamic from '../TableDynamic';
import Result4 from '../results/Result4';
import { useEffect, useState } from 'react';
import SingleInput from '../SingleInput';
import HeaderBar from '../HeaderBar';
import {CVPActions, selectCVP} from 'renderer/store/slice';
import { useAppSelector } from 'renderer/store/hooks';
import TextField from "../TextField";

export default function Task4() {
  let [getResult, setResult] = useState({
    volumes: [],
    prices: [],
    costs: [],
    items: [],
    fixTotal: 0,
    minProfit: 0,
    zeroEur: [],
    zeroTon: [],
    zeroProf: [],
  });

  const { headers, data, items, values, fixTotal, minProfit, text } =
    useAppSelector(selectCVP);

  const task4 = () => {
    let volumes: number[] = [];
    let prices: number[] = [];
    let costs: number[] = [];

    const zeroEur: number[] = [];
    const zeroTon: number[] = [];
    const zeroProf: number[] = [];

    data.map((rowData: string[], idx: number) => {
      volumes[idx] = parseFloat(rowData[0]);
      prices[idx] = parseFloat(rowData[1]);
      costs[idx] = parseFloat(rowData[2]);
    });
    for (let i = 0; i < items.length; i++) {
      zeroEur[i] = (isNaN(fixTotal) ? 0 : fixTotal) / (1 - costs[i] / prices[i]);
      zeroTon[i] = (isNaN(fixTotal) ? 0 : fixTotal) / (prices[i] - costs[i]);
      zeroProf[i] = ((isNaN(fixTotal) ? 0 : fixTotal) + (isNaN(minProfit) ? 0 : minProfit)) / (prices[i] - costs[i]);
    }

    // @ts-ignore
    setResult({
      // @ts-ignore
      volumes,
      // @ts-ignore
      prices,
      // @ts-ignore
      costs,
      // @ts-ignore
      items,
      // @ts-ignore
      fixTotal: (isNaN(fixTotal) ? 0 : fixTotal),
      // @ts-ignore
      minProfit: (isNaN(minProfit) ? 0 : minProfit),
      // @ts-ignore
      zeroEur,
      // @ts-ignore
      zeroTon,
      // @ts-ignore
      zeroProf,
    });
  };

  useEffect(task4, [text, fixTotal, minProfit, items, data, headers, values]);

  return (
    <div className={'task-container'}>
      <HeaderBar title={'CVP analýza'} />

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
            title={'CELKOVÉ FIXNÉ NÁKLADY[€]'}
          />
        </div>

        <div className={"col-2"}>
          <SingleInput
            input={CVPActions.setMinProfit}
            value={minProfit}
            title={'MINIMÁLNY ZISK[€]'}
          />
        </div>
      </div>

      <Result4 result={getResult} />

      <TextField text={text} action={CVPActions.changeText}/>
    </div>
  );
}
