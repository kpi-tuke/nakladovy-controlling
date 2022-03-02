import '../App.css';
import {Link} from "react-router-dom";
//import {useState} from "react";

export default function TaskSelector() {

  return (
    <div style={{ padding: 30 }}>
      <div className={'row'}>
        <div className={'col'}>
          <Link to={'/task1'} className={'card card-outline-primary'}>
            <div className={'card-header bg-primary'} style={{ height: 110 }}>
              <h1 style={{ color: 'white' }}>
                Ekonomická analýza hospodárenia
              </h1>
            </div>
            <div className={'card-body'} style={{ height: 150 }}>
              <p style={{ fontSize: 16 }}>
                Hodnotenie úrovne hospodárenia podniku z hľadiska nákladov na
                základe výstupov z výkazu ziskov a strát a jeho grafické
                znázornenie.
              </p>
            </div>
          </Link>
        </div>

        <div className={'col'}>
          <Link to={'/task2'} className={'card card-outline-primary'}>
            <div className={'card-header bg-primary'} style={{ height: 110 }}>
              <h1 style={{ color: 'white' }}>Analýza štruktúry nákladov</h1>
            </div>
            <div className={'card-body'} style={{ height: 150 }}>
              <p style={{ fontSize: 16 }}>
                Analýza a grafické znázornenie štruktúry nákladov podľa
                druhového a kalkulačného členenia.
              </p>
            </div>
          </Link>
        </div>

        <div className={'col-4'}>
          <Link to={'/task4'} className={'card card-outline-primary'}>
            <div className={'card-header bg-primary'} style={{ height: 110 }}>
              <h1 style={{ color: 'white' }}>CVP analýza</h1>
            </div>
            <div className={'card-body'} style={{ height: 150 }}>
              <p style={{ fontSize: 16 }}>
                Výpočet bod zvratu a minimálneho objemu výroby pre dosiahnutie
                požadovaného zisku pre štruktúru výkonov.
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className={'row mt-5'}>
        <div className={'col-4'}>
          <Link to={'/task5'} className={'card card-outline-primary'}>
            <div className={'card-header bg-primary'} style={{ height: 110 }}>
              <h1 style={{ color: 'white' }}>Sortimentová analýza</h1>
            </div>
            <div className={'card-body'} style={{ height: 150 }}>
              <p style={{ fontSize: 16 }}>
                Analýza a grafické znázornenie celkového ročného zisku výrobkov
                pre plné využitie výrobných kapacít.
              </p>
            </div>
          </Link>
        </div>

        <div className={'col'}>
          <Link to={'/task3'} className={'card card-outline-primary'}>
            <div className={'card-header bg-primary'} style={{ height: 110 }}>
              <h1 style={{ color: 'white' }}>Analýza reťazových a bázických indexov</h1>
            </div>
            <div className={'card-body'} style={{ height: 150 }}>
              <p style={{ fontSize: 16 }}>
                Zhodnotenie vývoja nákladových druhov v závislosti od zmeny
                objemu výkonov (tržieb) cez koeficient reakcie.
              </p>
            </div>
          </Link>
        </div>

        <div className={'col-4'}>
          <Link to={'/task6'} className={'card card-outline-primary'}>
            <div className={'card-header bg-primary'} style={{ height: 110 }}>
              <h1 style={{ color: 'white' }}>Pareto analýza nákladov</h1>
            </div>
            <div className={'card-body'} style={{ height: 150 }}>
              <p style={{ fontSize: 16 }}>
                Sledovanie nákladov na interné chyby a príčin vzniku týchto chýb
                v podniku.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
