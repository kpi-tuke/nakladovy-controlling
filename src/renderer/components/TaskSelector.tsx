import '../ScreenStyle.css';
import SelectCard from "./SelectCard";
import HeaderBar from "./HeaderBar";

export default function TaskSelector() {
  return (
    <div style={{paddingTop:100, paddingLeft:50, backgroundColor: "#f2f1f6", height:"100vh"}}>
      <HeaderBar title={'NÁKALDOVÝ CONTROLLING'} back={true}/>
      <div className={'row'} style={{marginBottom:"10vh"}}>

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
            'Zhodnotenie trendu vývoja druhových nákladov počas sledovaných období v závislosti od zmeny objemu výkonov (tržieb) cez koeficient reakcie.'
          }
        />

        <SelectCard
          to={'/task6'}
          head={'Pareto analýza nákladov'}
          body={
            'Sledovanie príčin vzniku nákladov na základe pravidla 80/20.'
          }
        />


      </div>
    </div>
  );
}
