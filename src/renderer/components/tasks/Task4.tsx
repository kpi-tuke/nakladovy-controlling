import '../../App.css';
import TableDynamic from "../TableDynamic";
import Result4 from "../results/Result4";
import {useEffect, useState} from "react";
import SingleInput from "../SingleInput";
import HeaderBar from '../HeaderBar';

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


  // @ts-ignore
  const [headers, setHeaders] = useState<string[]>(["Výroba", "Cena/tona", "Variabilné náklady/tona"])
  // @ts-ignore
  const [items, setItems] = useState<string[]>(["Výrobok A"])
  // @ts-ignore
  const [data, setData] = useState<string[][]>([["100", "8", "6"]])
  // @ts-ignore
  const [values, setValues] = useState<string[]>(["Výrobok A"])

  const [fixTotal, setFixTotal] = useState<number>(0)
  const [minProfit, setMinProfit] = useState<number>(0)

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


  useEffect(task4, [fixTotal, minProfit, items])

  return (
    <div className={'scrollbox-lg'} style={{ height: '100vh' }}>
      <HeaderBar title={"CVP analýza"}/>
      <div
        className={'row'}
        style={{paddingLeft: 10, paddingRight: 10, marginTop: 10}}
      >
        <TableDynamic
          corner={'Ekonomická položka'}
          headerType={'text'}
          header={headers}
          inputType={'input'}
          inputs={items}
          setInputs={setItems}
          data={data}
          values={values}
          dynRows={true}
          dynCols={false}
          proceed={task4}
        />

        <div className={'col'}>
          <div className={'row'}>
            <SingleInput
              input={setFixTotal}
              title={'CELKOVÉ FIXNÉ NÁKLADY'}
              proceed={task4}
            />
            <SingleInput
              input={setMinProfit}
              title={'MINIMÁLNY ZISK'}
              proceed={task4}
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
