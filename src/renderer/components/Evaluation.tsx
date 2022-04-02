import HeaderBar from "./HeaderBar";
import {useAppSelector} from "../store/hooks";
import {selectReport} from "../store/slice";
import Task1 from "./tasks/Task1";
import Task2 from "./tasks/Task2";
import Task4 from "./tasks/Task4";
import Task3 from "./tasks/Task3";
import Task6 from "./tasks/Task6";
import Task5 from "./tasks/Task5";

export default function Evaluation() {
  //všetko aj vstup
  // študent si zvolý ktre analýzy chce do reportu
  const tasks: string[] = useAppSelector(selectReport)
  console.log(tasks)
  return (
    <div>


      {tasks.includes("1") && <Task1/>}
      {tasks.includes("2") && <Task2/>}
      {tasks.includes("3") && <Task3/>}
      {tasks.includes("4") && <Task4/>}
      {tasks.includes("5") && <Task5/>}
      {tasks.includes("6") && <Task6/>}

      <HeaderBar addToReport={true} title={"Vyhodnotenie"}/>

    </div>
  )
}
