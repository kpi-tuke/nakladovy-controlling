import ReactApexChart from 'react-apexcharts';
import TableStatic from '../../components/TableStatic';
import { useColGraph } from '../../components/graphOptions';
import { ApexOptions } from 'apexcharts';

export default function IndexResult(props: any) {
  const economicSeries = [
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

  const costDiffSeries = [
    {
      name: 'Percento zment nákladov',
      data: props.result.costDiff,
    },
  ];

  const incomeDiffSeries = [
    {
      name: 'Percento zmeny výnosov',
      data: props.result.incomeDiff,
    },
  ];

  const reactionSeries = [
    {
      name: 'Koeficient reakcie',
      data: props.result.reaction,
    },
  ];

  const economicOptions: ApexOptions = useColGraph(
    props.result.headers,
    'ekonomická veličina (€)'
  );
  const baseOptions: ApexOptions = {
    ...useColGraph(props.result.headers),
    colors: ['#2E93fA'],
  };
  const chainOptions: ApexOptions = {
    ...useColGraph(props.result.betweenYears),
    colors: ['#66DA26', '#E91E63'],
  };
  const costDiffOptions: ApexOptions = {
    ...useColGraph(props.result.betweenYears),
    colors: ['#FF9800'],
  };
  const incomeDiffOptions: ApexOptions = {
    ...useColGraph(props.result.betweenYears),
    colors: ['#546E7A'],
  };
  const reactionOptions: ApexOptions = {
    ...useColGraph(props.result.betweenYears),
    colors: ['#E91E63'],
  };

  return (
    <div className={'new-page'}>
      <h1 className={'result-h1'}>Indexná analýza</h1>

      <div className={'table-card'}>
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={[...props.result.headers]}
          inputs={[['(Ib) - bázický index', `I_{b} = \\frac{N_{i}}{N_{b}}`]]}
          data={[[...props.result.baseIndexes]]}
        />
        <TableStatic
          corner={'Ekonomické ukazovatele'}
          header={[...props.result.betweenYears]}
          inputs={[
            ['(Ir) - reťazový index', `I_{r} = \\frac{N_{i+1}}{N_{i}}`],
            ['(Pzn) - percento zmeny nákladov (%)', `P_{zn} = = (\\frac{N_{i+1}}{N_{i}} \\times) - 100`],
            ['(Pzv) - percento zmeny výnosov (%)', `P_{zn} = = (\\frac{V_{i+1}}{V_{i}} \\times) - 100`],
            ['(Kr) - koeficient reakcie', `K_{r} = \\frac{P_{zn}}{P_{zv}}`],
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
        <h4 className={'graph-title'}>VÝVOJ EKONOMICKÝCH VELIČÍN</h4>
        {
          <ReactApexChart
            options={economicOptions}
            series={economicSeries}
            type="bar"
            height={420}
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
            height={420}
          />
        }
      </div>

      <div className={"row"}>
        <div className={'col-t graph-card new-page'}>
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

        <div className={'col-t graph-card new-page-after'}>
          <h4 className={'graph-title'}>PERCENTO ZMENY NÁKLADOV</h4>
          {
            <ReactApexChart
              options={costDiffOptions}
              series={costDiffSeries}
              type="bar"
              height={450}
            />
          }
        </div>
      </div>
      <div className={"row new-page-after"}>
        <div className={'col-t graph-card'} >
          <h4 className={'graph-title'}>PERCENTO ZMENY VÝNOSOV</h4>
          {
            <ReactApexChart
              options={incomeDiffOptions}
              series={incomeDiffSeries}
              type="bar"
              height={450}
            />
          }
        </div>
        <div className={'col-t graph-card'}>
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
    </div>
  );
}
