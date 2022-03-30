import ReactApexChart from 'react-apexcharts';
import TableStatic from "../TableStatic";

export default function Result3(props: any) {
  const lineGraph = {
    series: [
      {
        name: 'Náklady',
        data: props.result.costSumsForYears,
      },
      {
        name: 'Tržby',
        data: props.result.incomeSumsForYears,
      },
    ],
    options: {
      chart: {
        type: 'line',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'straight',
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: props.result.headers,
      },
      legend: {
        horizontalAlign: 'center',
        verticalAlign: 'center',
      },
    },
  };

  const chainGraph = {
    series: [
      {
        name: 'Reťazový index',
        data: props.result.chainIndexes,
      },
    ],
    options: {
      chart: {
        type: 'line',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'straight',
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: props.result.betweenYears,
      },
      legend: {
        horizontalAlign: 'center',
        verticalAlign: 'center',
      },
    },
  };

  const baseGraph = {
    series: [
      {
        name: 'Bázický index',
        data: props.result.baseIndexes,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'straight',
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: props.result.headers,
      },
      legend: {
        horizontalAlign: 'center',
        verticalAlign: 'center',
      },
    },
  };

  const incomeDiffGraph = {
    series: [
      {
        name: 'Percento zmeny výnosov',
        data: props.result.incomeDiff,
      },
    ],
    options: {
      chart: {
        type: 'bar',
      },
      colors: ['#ff4560'],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: props.result.betweenYears,
      },
      fill: {
        opacity: 1,
      },
    },
  };

  const costDiffGraph = {
    series: [
      {
        name: 'Percento zmeny nákladov',
        data: props.result.costDiff,
      },
    ],
    options: {
      chart: {
        type: 'bar',
      },
      colors: ['#00e396'],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: props.result.betweenYears,
      },
      fill: {
        opacity: 1,
      },
    },
  };

  const reactionGraph = {
    series: [
      {
        name: 'Koeficient reakcie',
        data: props.result.reaction,
      },
    ],
    options: {
      chart: {
        type: 'bar',
      },
      colors: ['#feb019'],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: props.result.betweenYears,
      },
      fill: {
        opacity: 1,
      },
    },
  };

  return (
    <div>

      <h1 className={"result-h1"}>Indexná analýza</h1>

      <div
        className={"table-card"}
        style={{marginTop:50}}
      >
        <TableStatic
          corner={"Ekonomické ukazovatele"}
          header={[...props.result.betweenYears]}
          inputs={[
            'Reťazový index',
            'Percento zmeny nákladov',
            'Percento zmeny výnosov',
            'Koeficient reakcie',
          ]}
          data={[
            [...props.result.chainIndexes],
            [...(props.result.costDiff.map((value: number) => (value.toString() + "%")))],
            [...(props.result.incomeDiff.map((value: number) => (value.toString() + "%")))],
            [...props.result.reaction],

          ]}
        />
      </div>

      <h1 className={"result-h1"}>Dashboarding</h1>

      <div
        className={"graph-card"}
      >
        <h4 className={"graph-title"}>NÁKLADY A VÝNOSY</h4>
        {
          // @ts-ignore
          <ReactApexChart options={lineGraph.options}
                          series={lineGraph.series}
                          type="line"
                          height={400}
          />
        }
      </div>

      <div
        className={"graph-card"}
      >
        <h4 className={"graph-title"}>REŤAZOVÝ INDEX</h4>
        {
          // @ts-ignore
          <ReactApexChart options={chainGraph.options}
                          series={chainGraph.series}
                          type="line"
                          height={400}
          />
        }
      </div>

      <div className={"row"}>
        <div className={"col-6"}>
          <div
            className={"graph-card"}
            style={{marginRight:25}}
          >
            <h4 className={"graph-title"}>BÁZICKÝ INDEX</h4>
            {
              // @ts-ignore
              <ReactApexChart options={baseGraph.options}
                              series={baseGraph.series}
                              type="bar"
                              height={400}
              />
            }
          </div>
        </div>

        <div className={"col-6"}>
          <div
            className={"graph-card"}
            style={{marginLeft:25}}
          >
            <h4 className={"graph-title"}>PERCENTO ZMENY VÝNOSOV</h4>
            {
              // @ts-ignore
              <ReactApexChart options={incomeDiffGraph.options}
                              series={incomeDiffGraph.series}
                              type="bar"
                              height={400}
              />
            }
          </div>
        </div>
      </div>

      <div className={"row"}>
        <div className={"col-6"}>
          <div
            className={"graph-card"}
            style={{marginRight:25}}
          >
            <h4 className={"graph-title"}>PRECENTO ZMENY NÁKLADOV</h4>
            {
              // @ts-ignore
              <ReactApexChart options={costDiffGraph.options}
                              series={costDiffGraph.series}
                              type="bar"
                              height={400}
              />
            }
          </div>
        </div>

        <div className={"col-6"}>
          <div
            className={"graph-card"}
            style={{marginLeft:25}}
          >
            <h4 className={"graph-title"}>KOFICIENT REAKCIE</h4>
            {
              // @ts-ignore
              <ReactApexChart options={reactionGraph.options}
                              series={reactionGraph.series}
                              type="bar"
                              height={400}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
