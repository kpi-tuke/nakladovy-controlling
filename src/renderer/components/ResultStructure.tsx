import '../App.css';
import {Link} from "react-router-dom";

export default function ResultStructure(props:any) {
  console.log(props.result)
  return(
    <div>
      {props.result.data.map((value:number, idx:number) => {
        return <p>{props.result.inputs[idx]} {value*100/props.result.data.reduce((a: number, b: number) => a + b, 0)}%</p>
        }
      )}
      <p>Naklady spolu: {props.result.data.reduce((a: number, b: number) => a + b, 0)}</p>
      <button><Link to={"/taskselect"}>Start</Link></button>
    </div>
  );
}
