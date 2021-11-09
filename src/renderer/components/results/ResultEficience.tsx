import '../../App.css';
import {Link} from "react-router-dom";


export default function ResultEficience(props:any) {

  return(
    <div>
      {//rozdelit do tabuliek
      }
      <h2>Ekonomická analýza ukazovateľov</h2>
      <p>VÝNOSY CELKOM: {props.result.income}</p>
      <p>Náklady celkom: {props.result.cost}</p>

      <h3>Ekonomické ukazovatele</h3>
      <p>Zisk: {props.result.income - props.result.cost}</p>
      <p>Efektívnosť: {props.result.income / props.result.cost}</p>
      <p>Rentabilita výnosov: {(props.result.income - props.result.cost) / props.result.income}</p>
      <p>Rentabilita nákladov: {(props.result.income - props.result.cost) / props.result.cost}</p>
      <p>Nákladová účinnosť: {props.result.income / props.result.cost}</p>
      <p>Nákladovosť: {props.result.cost / props.result.income}</p>
      <h3>Dashboarding</h3>
      {//stlpcový graf na ukazovatele(koeficienty)
        //graf 2: vynosy celkom, nakaldy celkom, zisk
      }
      <button><Link to={"/taskselect"}>Back</Link></button>
    </div>
  );
}
