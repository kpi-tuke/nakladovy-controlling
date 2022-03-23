import '../ScreenStyle.css';
import SelectCard from "./SelectCard";

export default function TaskSelector() {
  return (
    <div style={{padding: 20}}>
      <div className={'row'}>

        <SelectCard
          to={'/task1'}
          head={'Ekonomická analýza hospodárenia'}
          body={
            'Hodnotenie úrovne hospodárenia podniku z hľadiska nákladov na základe výstupov z výkazu ziskov a strát a jeho grafické znázornenie.'
          }
        />

        <SelectCard
          to={'/task2'}
          head={'Analýza štruktúry nákladov'}
          body={
            "Analýza a grafické znázornenie štruktúry nákladov podľa druhového a kalkulačného členenia."
          }
        />

        <SelectCard
          to={'/task4'}
          head={'CVP analýza'}
          body={
            'Výpočet bod zvratu a minimálneho objemu výroby pre dosiahnutie požadovaného zisku pre štruktúru výkonov.'
          }
        />
      </div>

      <div className={'row'}>

        <SelectCard
          to={'/task5'}
          head={'Sortimentová analýza'}
          body={
            'Analýza a grafické znázornenie celkového ročného zisku výrobkov pre plné využitie výrobných kapacít.'
          }
        />

        <SelectCard
          to={'/task3'}
          head={'Analýza reťazových a bázických indexov'}
          body={
            'Zhodnotenie vývoja nákladových druhov v závislosti od zmeny objemu výkonov (tržieb) cez koeficient reakcie.'
          }
        />

        <SelectCard
          to={'/task6'}
          head={'Pareto analýza nákladov'}
          body={
            'Sledovanie nákladov na interné chyby a príčin vzniku týchto chýb v podniku.'
          }
        />


      </div>
    </div>
  );
}
