import '../ScreenStyle.css';
import {Link} from "react-router-dom";

export default function HeaderBar(props: any) {
  return (
    <div
      className={'header-bar row'}
    >
      <Link  to={"/evaluation"} className={"col-1"}>
      <div style={{borderColor:"white", borderWidth:1, borderStyle:"solid", borderRadius:5, marginRight:20, padding:10, color:"white", fontWeight:"bold", backgroundColor:"#1a98ff", textAlign:"center"}} >Výsledok</div>
      </Link>
      
      <div className={"header-title col-10"}>
        {props.title}
      </div>
      {!props.back && <Link className={"col-1"} to={"/taskselect"}>
        <div style={{borderColor:"white", borderWidth:1, borderStyle:"solid", borderRadius:5, marginRight:20, padding:10, color:"white", fontWeight:"bold", backgroundColor:"#1a98ff", textAlign:"center"}} >← Späť</div>
      </Link>}
    </div>
  );
}
