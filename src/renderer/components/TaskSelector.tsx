import '../App.css';
import {Link} from "react-router-dom";
//import {useState} from "react";

export default function TaskSelector(props: any) {

  //const [getSelection, setSelection] = useState(false)


  return (
    <div id={"form"}>
      <input type={"checkbox"} id={"naklady"} name={"checkbox"}/>
      <label htmlFor={"naklady"}>ANALÝZA HOSPODARENIA</label>
      <br/>
      <input type={"checkbox"} id={"products"} name={"checkbox"}/>
      <label htmlFor={"products"}>ANALÝZA ŠTRUKTÚRY NÁKLADOV</label>
      <br/>
      <button onClick={() => {
        const naklady = document.getElementById('naklady');
        const products = document.getElementById('products');
        // @ts-ignore
        props.action({first: naklady.checked, second: products.checked})
        }
      }><Link to={"/inputs"}>Start</Link></button>
    </div>
  );
}
