import '../App.css';
import {Link} from "react-router-dom";

export default function ResultStructure(props:any) {
  console.log(props.result)
  return(
    <div>
      <h2>Štruktúra nákladov</h2>
      <h3>Podľa nákladových druhov:</h3>
      {props.result.rowSums.map((value: number, idx: number) => {
          return <p>{props.result.inputs[idx]} {value * 100 / props.result.rowSums.reduce((a: number, b: number) => a + b, 0)}%</p>
        }
      )}
      <br/>
      <h3>Podľa kalkulačného členenia</h3>
      {props.result.colSums.map((value: number, idx: number) => {
          return <p>{props.result.header[idx]} {value * 100 / props.result.colSums.reduce((a: number, b: number) => a + b, 0)}%</p>
        }
      )}
      <br/>
      <p>Naklady spolu: {props.result.rowSums.reduce((a: number, b: number) => a + b, 0)}€</p>
      <button><Link to={"/taskselect"}>Back</Link></button>
    </div>
  );
}
