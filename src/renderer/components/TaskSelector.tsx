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


        <div className={"col"}>
          <div className={"card card-outline-primary"}>
            <div className={"card-header"}>
              <h1>Task3</h1>
            </div>
            <div className={"card-body"}>
              <p>Lorem ipsum</p>
            </div>
            <div className={"card-footer"}>
              <button><Link to={"/task3"}>Task3</Link></button>
            </div>
          </div>
        </div>

      </div>

      <div className={"row"}>


        <div className={"col-4"}>
          <div className={"card card-outline-primary"}>
            <div className={"card-header"}>
              <h1>Task4</h1>
            </div>
            <div className={"card-body"}>
              <p>Lorem ipsum</p>
            </div>
            <div className={"card-footer"}>
              <button><Link to={"/task4"}>Task4</Link></button>
            </div>
          </div>
        </div>

        <div className={"col-4"}>
          <div className={"card card-outline-primary"}>
            <div className={"card-header"}>
              <h1>Task5</h1>
            </div>
            <div className={"card-body"}>
              <p>Lorem ipsum</p>
            </div>
            <div className={"card-footer"}>
              <button><Link to={"/task5"}>Task5</Link></button>
            </div>
          </div>
        </div>

        <div className={"col-4"}>
          <div className={"card card-outline-primary"}>
            <div className={"card-header"}>
              <h1>Task6</h1>
            </div>
            <div className={"card-body"}>
              <p>Lorem ipsum</p>
            </div>
            <div className={"card-footer"}>
              <button><Link to={"/task6"}>Task6</Link></button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
