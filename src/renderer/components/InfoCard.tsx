import ReactApexChart from 'react-apexcharts';

export default function InfoCard(props: any) {
  const graph = {
    seriesSpark3:
      props.series && props.series.length > 1
        ? [
            {
              data: [...props.series],
            },
          ]
        : [],
    optionsSpark3: {
      chart: {
        type: 'area',
        sparkline: {
          enabled: true,
        },
        distributed: true,
      },
      stroke: {
        curve: 'straight',
      },
      fill: {
        opacity: 0.6,
      },
    },
  };
  const height = props.series && props.series.length >1 ? 100 : 0
  return (
    <div className={'info-card'}>
      <h2 className={'info-title'}>{props.header}:</h2>
      <p className={"info-value"}>{props.value}</p>
      {props.series ? (
        <ReactApexChart
          //@ts-ignore
          options={graph.optionsSpark3}
          series={graph.seriesSpark3}
          type={"area"}
          height={height}
        />
      )
      : <div style={{height:5}}/>
      }
    </div>
  );
}
