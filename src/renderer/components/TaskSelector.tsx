import '../App.css';
import {Link} from "react-router-dom";
//import {useState} from "react";

export default function TaskSelector() {

  //const [getSelection, setSelection] = useState(false)
  //použit tlacidla

  return (
    <div style={{padding: 30}}>
      <div className={"row"}>
        <div className={"col"}>
          <div className={"card card-outline-primary"}>
            <div className={"card-header"}>
              <h1>Task1</h1>
            </div>
            <div className={"card-body"}>
              <p>Lorem ipsum</p>
            </div>
            <div className={"card-footer"}>
              <button><Link to={"/task1"}>Task1</Link></button>
            </div>
          </div>
        </div>

        <div className={"col"}>
          <div className={"col"}>
            <div className={"card card-outline-primary"}>
              <div className={"card-header"}>
                <h1>Task2</h1>
              </div>
              <div className={"card-body"}>
                <p>Lorem ipsum</p>
              </div>
              <div className={"card-footer"}>
                <button><Link to={"/task2"}>Task2</Link></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
