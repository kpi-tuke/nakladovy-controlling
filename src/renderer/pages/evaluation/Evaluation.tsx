import HeaderBar from '../../components/HeaderBar';
import { useAppSelector } from '../../store/hooks';
import EconomicAnalysis from '../economic/EconomicAnalysis';
import StructureAnalysis from '../structure/StructureAnalysis';
import CVPAnalysis from '../cvp/CVPAnalysis';
import IndexAnalysis from '../index/IndexAnalysis';
import ParetoAnalysis from '../pareto/ParetoAnalysis';
import SortimentAnalysis from '../sortiment/SortimentAnalysis';
import {selectEvaluation} from "./evaluationSlice";

export default function Evaluation() {
  const { tasks } = useAppSelector(selectEvaluation);

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
