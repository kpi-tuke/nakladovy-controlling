import '../../App.css';
import {Link} from "react-router-dom";
import ReactApexChart from "react-apexcharts"
import TableStatic from "../TableStatic";

export default function ResultEficience(props: any) {

  let profitData: number[] = []
  for (let i = 0; i < props.result.header.length; i++) {
    profitData.push(props.result.incomeData[i] - props.result.costData[i])
  }

  let rentIncomeData: number[] = []
  for (let i = 0; i < props.result.header.length; i++) {
    if (profitData[i] === 0 || props.result.incomeData[i] === 0) rentIncomeData.push(0)
    else rentIncomeData.push(Math.round(100 * profitData[i] / props.result.incomeData[i]) / 100)
  }

  let rentCostData: number[] = []
  for (let i = 0; i < props.result.header.length; i++) {
    if (profitData[i] === 0 || props.result.costData[i] === 0) rentCostData.push(0)
    else rentCostData.push(Math.round(100 * profitData[i] / props.result.costData[i]) / 100)
  }

  let costEff: number[] = []
  for (let i = 0; i < props.result.header.length; i++) {
    if (props.result.incomeData[i] === 0 || props.result.costData[i] === 0) costEff.push(0)
    else costEff.push(Math.round(100 * props.result.incomeData[i] / props.result.costData[i]) / 100)
  }

  let costIndicator: number[] = []
  for (let i = 0; i < props.result.header.length; i++) {
    if (props.result.costData[i] === 0 || props.result.incomeData[i] === 0) costIndicator.push(0)
    else costIndicator.push(Math.round(100 * props.result.costData[i] / props.result.incomeData[i]) / 100)
  }


  let maxY = Math.ceil(Math.max(...props.result.incomeData, ...props.result.costData) + Math.max(...props.result.incomeData, ...props.result.costData) / 10)
  let minY = Math.min(...profitData)


  const lineGraph = {
    series: [
      {
        name: "Cost",
        data: props.result.costData
      },
      {
        name: "Income",
        data: props.result.incomeData
      },
      {
        name: "Profit",
        data: profitData
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#FF0000', '#00C3FF', '#00FF44'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Náklady, výnosy a zisky',
        align: 'center'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: props.result.header,
        title: {
          text: 'Year'
        }
      },
      yaxis: {
        title: {
          text: '€'
        },
        min: minY,
        max: maxY
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    },
  };

  let profitTotal: number[] = []
  for (let i = 0; i < props.result.header.length; i++) {
    profitTotal[i] = 0
    for (let j = 0; j <= i; j++) {
      profitTotal[i] += profitData[j]
    }
  }

  let costTotal: number[] = []
  for (let i = 0; i < props.result.header.length; i++) {
    costTotal[i] = 0
    for (let j = 0; j <= i; j++) {
      costTotal[i] += props.result.costData[j]
    }
  }

  let incomeTotal: number[] = []
  for (let i = 0; i < props.result.header.length; i++) {
    incomeTotal[i] = 0
    for (let j = 0; j <= i; j++) {
      incomeTotal[i] += props.result.incomeData[j]
    }
  }

  maxY = Math.max(...costTotal, ...incomeTotal, ...profitTotal)
  minY = Math.min(...costTotal, ...incomeTotal, ...profitTotal)
  const totalGraph = {
    series: [
      {
        name: "Total Cost",
        data: costTotal
      },
      {
        name: "Total Income",
        data: incomeTotal
      },
      {
        name: "Total Profit",
        data: profitTotal
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#FF0000', '#00C3FF', '#00FF44'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Celkové naklady, výnosy a zisk',
        align: 'center'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: props.result.header,
        title: {
          text: 'Year'
        }
      },
      yaxis: {
        title: {
          text: '€'
        },
        min: minY,
        max: maxY
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    },
  };

  minY = Math.round(Math.min(...costIndicator, ...costEff, ...rentCostData, ...rentIncomeData) * 100) / 100
  maxY = Math.round(Math.max(...costIndicator, ...costEff, ...rentCostData, ...rentIncomeData) * 100) / 100

  const colGraph = {

    series: [{
      name: 'Rentabilita výnosov',
      data: rentIncomeData
    }, {
      name: 'Rentabilita nákladov',
      data: rentCostData
    }, {
      name: 'Nákladová účinnosť',
      data: costEff
    }, {
      name: 'Nákladovosť',
      data: costIndicator
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: props.result.header,
      },
      yaxis: {
        title: {
          text: '$ (thousands)'
        },
        min: minY,
        max: maxY,
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val: string) {
            return "$ " + val + " thousands"
          }
        }
      }
    },
  };
  // @ts-ignore
  return (
    <div className={"scrollbox-lg"}>
      {//rozdelit do tabuliek
      }
      <h2>Ekonomická analýza ukazovateľov</h2>
      <p>VÝNOSY CELKOM: {props.result.income}</p>
      <p>Náklady celkom: {props.result.cost}</p>

      <h3>Ekonomické ukazovatele</h3>
      <p>Zisk: {props.result.income - props.result.cost}</p>
      <p>Rentabilita
        výnosov: {Math.round((props.result.income - props.result.cost) * 100 / props.result.income) / 100}</p>
      <p>Rentabilita
        nákladov: {Math.round((props.result.income - props.result.cost) * 100 / props.result.cost) / 100}</p>
      <p>Nákladová účinnosť: {Math.round(props.result.income * 100 / props.result.cost) / 100}</p>
      <p>Nákladovosť: {Math.round(props.result.cost * 100 / props.result.income) / 100}</p>

      <TableStatic taskName={"Zisky"}
                   header={[...props.result.header, "Celkovo"]}
                   inputs={["Zisk", "Rentabilita výnosov", "Rentabilita nákladov", "Nákladová účinnosť", "Nákladovosť"]}
                   data={[
                     [...profitData, props.result.income - props.result.cost],
                     [...rentIncomeData, Math.round((props.result.income - props.result.cost) * 100 / props.result.income) / 100],
                     [...rentCostData, Math.round((props.result.income - props.result.cost) * 100 / props.result.cost) / 100],
                     [...costEff, Math.round(props.result.income * 100 / props.result.cost) / 100],
                     [...costIndicator, Math.round(props.result.cost * 100 / props.result.income) / 100]
                   ]}
      />

      <h3>Dashboarding</h3>
      {//stlpcový graf na ukazovatele(koeficienty)
        //graf 2: vynosy celkom, nakaldy celkom, zisk
      }
      {   // @ts-ignore
        <ReactApexChart options={lineGraph.options} series={lineGraph.series} type="line" height={350}/>

      }
      {   // @ts-ignore
        <ReactApexChart options={totalGraph.options} series={totalGraph.series} type="line" height={350}/>
      }
      {   // @ts-ignore
        <ReactApexChart options={colGraph.options} series={colGraph.series} type="bar" height={350}/>
      }


      <button><Link to={"/taskselect"}>Back</Link></button>
    </div>
  );
}
