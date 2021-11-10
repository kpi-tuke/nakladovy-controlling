import '../../App.css';
import {Link} from "react-router-dom";
import ReactApexChart from "react-apexcharts"
import TableStatic from "../TableStatic";


export default function Result1(props: any) {

  const makeArray = (numerator: number[], denominator: number[]): number[] => {
    let arr: number[] = []
    for (let i = 0; i < props.result.header.length; i++) {
      if (numerator[i] === 0 || denominator[i] === 0) arr.push(0)
      else arr.push(Math.round(100 * numerator[i] / denominator[i]) / 100)
    }
    return arr
  }


  let profitData: number[] = []
  for (let i = 0; i < props.result.header.length; i++) {
    profitData.push(props.result.incomeData[i] - props.result.costData[i])

  }

  let rentIncomeData: number[] = makeArray(profitData, props.result.incomeData);
  let rentCostData: number[] = makeArray(profitData, props.result.costData);
  let costEff: number[] = makeArray(props.result.incomeData, props.result.costData);
  let costIndicator: number[] = makeArray(props.result.costData, props.result.incomeData);

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
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'straight'
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
      },
      legend: {
        horizontalAlign: 'right',
      }
    },
  };

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
        type: 'area',
        height: 350,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'straight'
      },

      title: {
        text: 'Celkové náklady, výnosy, zisky',
        align: 'center'
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
        }
      },
      legend: {
        horizontalAlign: 'right'
      }
    }
  };

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

  return (
    <div>

      <h2>Ekonomická analýza ukazovateľov</h2>
      <p>VÝNOSY CELKOM: {props.result.income}</p>
      <p>Náklady celkom: {props.result.cost}</p>

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

      {   // @ts-ignore
        <ReactApexChart options={lineGraph.options} series={lineGraph.series} type="line" height={350}/>
      }
      {   // @ts-ignore
        <ReactApexChart options={totalGraph.options} series={totalGraph.series} type="area" height={350}/>
      }
      {   // @ts-ignore
        <ReactApexChart options={colGraph.options} series={colGraph.series} type="bar" height={350}/>
      }


      <button><Link to={"/taskselect"}>Back</Link></button>
    </div>
  );
}
