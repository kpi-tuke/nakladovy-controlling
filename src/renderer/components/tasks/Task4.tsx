import '../../App.css';
import TableDynamic from "../TableDynamic";
import Result4 from "../results/Result4";
import {useEffect, useState} from "react";
import SingleInput from "../SingleInput";
import HeaderBar from '../HeaderBar';
import { CVPActions, selectCVP } from 'renderer/store/slice';
import { useAppSelector } from 'renderer/store/hooks';

export default function Task4() {
  // potom po skonceni analýz pridat moznost suhrnu, report vysledkov a slovná interpretacia vysledkov
  //potom tento report može byt vytlaceny alebo pdf
  let [getResult, setResult] = useState({
    volumes: [],
    prices: [],
    costs: [],
    items: [],
    fixTotal: 0,
    minProfit: 0,
    zeroEur: [],
    zeroTon: [],
    zeroProf: []
  })

  const {headers, data, items, values, fixTotal, minProfit} = useAppSelector(selectCVP)

  const task4 = () => {
    let volumes: number[] = []
    let prices: number[] = []
    let costs: number[] = []

    for (let i = 0; i < items.length; i++) {
      volumes.push(0)
      prices.push(0)
      costs.push(0)
    }

    data.map((rowData: string[], idx: number) => {
      volumes[idx] = parseInt(rowData[0])
      prices[idx] = parseInt(rowData[1])
      costs[idx] = parseInt(rowData[2])
    })

    const zeroEur: number[] = []
    const zeroTon: number[] = []
    const zeroProf: number[] = []

    for (let i = 0; i < items.length; i++) {
      zeroEur.push(0)
      zeroTon.push(0)
      zeroProf.push(0)
    }

    for (let i = 0; i < items.length; i++) {
      zeroEur[i] = fixTotal / (1 - (costs[i] / prices[i]))
      zeroTon[i] = fixTotal / (prices[i] - costs[i])
      zeroProf[i] = (fixTotal + minProfit) / (prices[i] - costs[i]) // pridat min zisk
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
      fixTotal: fixTotal,
      // @ts-ignore
      minProfit: minProfit,
      // @ts-ignore
      zeroEur,
      // @ts-ignore
      zeroTon,
      // @ts-ignore
      zeroProf
    })
  }


  useEffect(task4, [fixTotal, minProfit, items, data, headers, values])

  return (
    <div className={'scrollbox-lg'} style={{ height: '100vh' }}>
      <HeaderBar title={"CVP analýza"}/>
      <div
        className={'row'}
        style={{paddingLeft: 10, paddingRight: 10, marginTop: 60}}
      >
        <TableDynamic
          corner={'Ekonomická položka'}
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

        <div className={'col'}>
          <div className={'row'}>
            <SingleInput
              input={CVPActions.setFixTotal}
              value={fixTotal}
              title={'CELKOVÉ FIXNÉ NÁKLADY'}
            />
            <SingleInput
              input={CVPActions.setMinProfit}
              value={minProfit}
              title={'MINIMÁLNY ZISK'}
            />
          </div>
        </div>
      </div>

      <div>
        <Result4 result={getResult} />
      </div>
    </div>
  );

}
