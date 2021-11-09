import '../../App.css';
import {Link} from "react-router-dom";

export default function ResultStructure(props:any) {

  return(
    <div>
      <h2>Štruktúrna analýza</h2>
      <p>Naklady spolu: {props.result.rowSums.reduce((a: number, b: number) => a + b, 0)}€</p>
      <h3>Podľa nákladových druhov:</h3>
      {props.result.rowSums.map((value: number, idx: number) => {
          return <p
            key={props.result.inputs[idx]}>{props.result.inputs[idx]} {value * 100 / props.result.rowSums.reduce((a: number, b: number) => a + b, 0)}%</p>
        }
      )}
      <br/>
      <h3>Podľa kalkulačného členenia</h3>
      {props.result.colSums.map((value: number, idx: number) => {
          return <p
            key={props.result.header[idx]}>{props.result.header[idx]} {value * 100 / props.result.colSums.reduce((a: number, b: number) => a + b, 0)}%</p>
        }
      )}
      <br/>

      <button><Link to={"/taskselect"}>Back</Link></button>
    </div>
  );
}
