import '../App.css';
import {Link} from "react-router-dom";
//import {useState} from "react";

export default function TaskSelector() {

  //const [getSelection, setSelection] = useState(false)
  //použit tlacidla

  return (
    <div id={"form"}>

      <button><Link to={"/task1"}>Task1</Link></button>
      <button><Link to={"/task2"}>Task2</Link></button>

    </div>
  );
}
