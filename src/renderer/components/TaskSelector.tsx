import '../App.css';
import {Link} from "react-router-dom";
//import {useState} from "react";

export default function TaskSelector(props: any) {

  //const [getSelection, setSelection] = useState(false)


  return (
    <div id={"form"}>
      <input type={"checkbox"} id={"naklady"} name={"checkbox"}/>
      <label htmlFor={"naklady"}>ANALÝZA EKONOMICKÝCH UKAZOVATEĽOV V OBLASTI NÁKLADOVÉHO RIADENIA</label>
      <br/>
      <input type={"checkbox"} id={"products"} name={"checkbox"}/>
      <label htmlFor={"products"}>ANALÝZA NÁKLADOV NA ZÁKLADE ŠTRUKTÚRY NÁKLADOV</label>
      <br/>
      <button type={"submit"} onClick={() => {
        const naklady = document.getElementById('naklady');
        const products = document.getElementById('products');

        // @ts-ignore
        //console.log({first: naklady.checked, second: products.checked })
        // @ts-ignore
        props.action({first: naklady.checked, second: products.checked})
      }
      }><Link to={"/inputs"}
              className="btn btn-sm btn-info">Results</Link></button>
    </div>
  );
}
