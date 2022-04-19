import HeaderBar from '../components/HeaderBar';
import { useAppSelector } from '../store/hooks';
import { selectReport } from '../store/slice';
import EconomicAnalysis from './EconomicAnalysis';
import StructureAnalysis from './StructureAnalysis';
import CVPAnalysis from './CVPAnalysis';
import IndexAnalysis from './IndexAnalysis';
import ParetoAnalysis from './ParetoAnalysis';
import SortimentAnalysis from './SortimentAnalysis';

export default function Evaluation() {
  const { tasks } = useAppSelector(selectReport);

  return (
    <div>
      {
        // @ts-ignore
        tasks.includes('1') && <EconomicAnalysis hideHeader={true} />
      }
      {
        // @ts-ignore
        tasks.includes('2') && <StructureAnalysis hideHeader={true} />
      }
      {
        // @ts-ignore
        tasks.includes('3') && <IndexAnalysis hideHeader={true} />
      }
      {
        // @ts-ignore
        tasks.includes('4') && <CVPAnalysis hideHeader={true} />
      }
      {
        // @ts-ignore
        tasks.includes('5') && <SortimentAnalysis hideHeader={true} />
      }
      {
        // @ts-ignore
        tasks.includes('6') && <ParetoAnalysis hideHeader={true} />
      }

      <HeaderBar
        addToReport={true}
        back={'taskselect'}
        title={'Vyhodnotenie'}
      />
    </div>
  );
}
