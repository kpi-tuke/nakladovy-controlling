import '../App.css';
import {Link} from "react-router-dom";

export default function ResultEficience(props:any) {

  return(
    <div>
      <p>Výnosy: {props.result.income}</p>
      <p>Náklady: {props.result.cost}</p>
      <p>Zisk: {props.result.income - props.result.cost}</p>
      <p>Efektívnosť: {props.result.income / props.result.cost}</p>
      <p>Rentabilita výnosov: {(props.result.income - props.result.cost) / props.result.income}</p>
      <p>Rentabilita nákladov: {(props.result.income - props.result.cost) / props.result.cost}</p>
      <p>Nákladová účinnosť: {props.result.income / props.result.cost}</p>
      <p>Nákladovosť: {props.result.cost / props.result.income}</p>
      <button><Link to={"/taskselect"}>Start</Link></button>
    </div>
  );
}
