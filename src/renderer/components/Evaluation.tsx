import HeaderBar from "./HeaderBar";
import {useAppSelector} from "../store/hooks";
import {selectReport} from "../store/slice";
import EconomicAnalysis from "../pages/EconomicAnalysis";
import StructureAnalysis from "../pages/StructureAnalysis";
import CVPAnalysis from "../pages/CVPAnalysis";
import IndexAnalysis from "../pages/IndexAnalysis";
import ParetoAnalysis from "../pages/ParetoAnalysis";
import SortimentAnalysis from "../pages/SortimentAnalysis";

export default function Evaluation() {
  //všetko aj vstup
  // študent si zvolý ktre analýzy chce do reportu
  const tasks: string[] = useAppSelector(selectReport)
  console.log(tasks)
  return (
    <div>


      {tasks.includes("1") && <EconomicAnalysis/>}
      {tasks.includes("2") && <StructureAnalysis/>}
      {tasks.includes("3") && <IndexAnalysis/>}
      {tasks.includes("4") && <CVPAnalysis/>}
      {tasks.includes("5") && <SortimentAnalysis/>}
      {tasks.includes("6") && <ParetoAnalysis/>}

      <HeaderBar addToReport={true} title={"Vyhodnotenie"}/>

    </div>
  )
}
