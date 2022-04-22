import ReactApexChart from 'react-apexcharts';
import TableStatic from '../TableStatic';
import { colGraph, lineGraph } from '../graphOptions';
import { ApexOptions } from 'apexcharts';

export default function IndexResult(props: any) {

  const lineSeries = [
    {
      name: 'Náklady',
      data: props.result.costSumsForYears,
    },
    {
      name: 'Výnosy',
      data: props.result.incomeSumsForYears,
    },
  ];

  const baseSeries = [
    {
      name: 'Bázický index',
      data: props.result.baseIndexes,
    },
  ];

  const chainSeries = [
    {
      name: 'Percento zmeny výnosov',
      data: props.result.chainIndexes,
    },
  ];

  const reactionSeries = [
    {
      name: 'Koeficient reakcie',
      data: props.result.reaction,
    },
  ];

  const line: ApexOptions = lineGraph(props.result.headers);
  const baseOptions: ApexOptions = {
    ...colGraph(props.result.headers),
    colors: ['#2E93fA'],
  };
  const chainOptions: ApexOptions = {
    ...colGraph(props.result.betweenYears),
    colors: ['#66DA26', '#E91E63'],
  };
  const reactionOptions: ApexOptions = {
    ...colGraph(props.result.betweenYears),
    colors: ['#E91E63'],
  };

  return (
    <div className={'new-page'}>
      <h1 className={'result-h1'}>Indexná analýza</h1>

      <div className={'table-card'}>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={[...props.result.headers]}
          inputs={['(Ib) bázický index']}
          data={[[...props.result.baseIndexes]]}
        />
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={[...props.result.betweenYears]}
          inputs={[
            '(Ir) reťazový index',
            '(Pzn) percento zmeny nákladov (%)',
            '(Pzv) percento zmeny výnosov (%)',
            '(Kr) koeficient reakcie',
          ]}
          data={[
            [...props.result.chainIndexes],
            [...props.result.costDiff.map((value: number) => value.toString())],
            [
              ...props.result.incomeDiff.map((value: number) =>
                value.toString()
              ),
            ],
            [...props.result.reaction],
          ]}
        />
      </div>

      <h1 className={'result-h1 new-page'}>Dashboarding</h1>

      <div className={'graph-card'}>
        <h4 className={'graph-title'}>TREND VÝVOJA NÁKLADOV A VÝNOSOV</h4>
        {
          <ReactApexChart
            options={line}
            series={lineSeries}
            type="line"
            height={450}
          />
        }
      </div>

      <div className={'graph-card'}>
        <h4 className={'graph-title'}>BÁZICKÝ INDEX</h4>
        {
          <ReactApexChart
            options={baseOptions}
            series={baseSeries}
            type="bar"
            height={450}
          />
        }
      </div>

      <div className={'graph-card new-page'}>
        <h4 className={'graph-title'}>REŤAZOVÝ INDEX</h4>
        {
          <ReactApexChart
            options={chainOptions}
            series={chainSeries}
            type="bar"
            height={450}
          />
        }
      </div>

        <div className={'graph-card new-page-after'}>
          <h4 className={'graph-title'}>KOFICIENT REAKCIE</h4>
          {
            <ReactApexChart
              options={reactionOptions}
              series={reactionSeries}
              type="bar"
              height={450}
            />
          }
        </div>

    </div>
  );
}
