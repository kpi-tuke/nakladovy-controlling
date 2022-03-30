import { useBilanceCalc } from "renderer/calculations";
import { useAppSelector } from "renderer/store/hooks";
import { bilanceActions, selectBilance } from "renderer/store/slice";
import HeaderBar from "./HeaderBar";
import Result1 from "./results/Result1";
import TextField from "./TextField";

export default function Evaluation() {

	const tableBilance = useAppSelector(selectBilance);
	const resultBilance = useBilanceCalc(tableBilance.data, tableBilance.values);
	
	return(
		<div className="task-container">
			<HeaderBar title={"Vyhodnotenie"}/>
			<Result1 result={{...tableBilance, ...resultBilance}}/>
			<TextField text={tableBilance.text} action={bilanceActions.changeText} />
		</div>
	)
}