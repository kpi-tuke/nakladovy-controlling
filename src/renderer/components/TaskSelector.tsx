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
              <h1>Analýza hospodárenia</h1>
            </div>
            <div className={"card-body"}>
              <p>Na základe výstupov z výkazu ziskov a strát uskutočnite hodnotenie úrovne hospodárenia podniku z
                hľadiska nákladov. Grafické znázornenie priebehu ukazovateľov.</p>
            </div>
            <div className={"card-footer"}>
              <button><Link to={"/task1"}>Start</Link></button>
            </div>
          </div>
        </div>

        <div className={"col"}>
          <div className={"card card-outline-primary"}>
            <div className={"card-header"}>
              <h1>Analýza štruktúry nákladov</h1>
            </div>
            <div className={"card-body"}>
              <p>Analyzujte štruktúru nákladov podľa druhového a kalkulačného členenia. Graficky znázornenie štruktúry
                nákladov podľa druhového a kalkulačného členenia.</p>
            </div>
            <div className={"card-footer"}>
              <button><Link to={"/task2"}>Start</Link></button>
            </div>
          </div>
        </div>

        <div className={"col-4"}>
          <div className={"card card-outline-primary"}>
            <div className={"card-header"}>
              <h1>CVP analýza</h1>
            </div>
            <div className={"card-body"}>
              <p>Vypočítajte bod zvratu pre štruktúru výkonov. Zistite pri akom objeme dosiahnete požadovaný zisk.
                Riešenie je znázornené graficky. </p>
            </div>
            <div className={"card-footer"}>
              <button><Link to={"/task4"}>Start</Link></button>
            </div>
          </div>
        </div>
      </div>

      <div className={"row mt-5"}>

        <div className={"col-4"}>
          <div className={"card card-outline-primary"}>
            <div className={"card-header"}>
              <h1>Sortimentová analýza</h1>
            </div>
            <div className={"card-body"}>
              <p>Na základe sortimentnej analýzy určte, ktorý výrobok je pre firmu výhodnejšie vyrábať. Analyzujte
                celkový ročný zisk pre výrobky, ak beriete do úvahy plné využitie výrobných kapacít jedného výrobku.
                Grafické znázornenie ukazovateľov sortimentnej analýzy.</p>
            </div>
            <div className={"card-footer"}>
              <button><Link to={"/task5"}>Start</Link></button>
            </div>
          </div>
        </div>

        <div className={"col"}>
          <div className={"card card-outline-primary"}>
            <div className={"card-header"}>
              <h1>Analýza reťazových a bázických indexov</h1>
            </div>
            <div className={"card-body"}>
              <p>Zhodnoťte vývoj nákladových druhov v závislosti od zmeny objemu výkonov (tržieb) cez koeficient
                reakcie.</p>
            </div>
            <div className={"card-footer"}>
              <button><Link to={"/task3"}>Start</Link></button>
            </div>
          </div>
        </div>

        <div className={"col-4"}>
          <div className={"card card-outline-primary"}>
            <div className={"card-header"}>
              <h1>Pareto analýza nákladov</h1>
            </div>
            <div className={"card-body"}>
              <p>Sledujte náklady na interné chyby a príčiny vzniku týchto chýb v podniku. Na základe Pareto analýzy
                určte skupinu životne dôležitých príčin a skupinu príčin, ktoré neovplyvňujú náklady na interné chyby vo
                veľkom rozsahu. </p>
            </div>
            <div className={"card-footer"}>
              <button><Link to={"/task6"}>Start</Link></button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
