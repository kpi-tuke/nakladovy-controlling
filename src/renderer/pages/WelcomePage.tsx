import HeaderBar from '../components/HeaderBar';
import { useNavigate } from 'react-router-dom';
import {useAppDispatch} from "../store/hooks";
import {
  CVPActions,
  economicActions,
  indexActions,
  paretoActions, reportActions,
  sortimentActions,
  structureActions
} from "../store/slice";


export default function WelcomePage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  function newProject() {
    dispatch(economicActions.reset())
    dispatch(structureActions.reset())
    dispatch(CVPActions.reset())
    dispatch(indexActions.reset())
    dispatch(sortimentActions.reset())
    dispatch(paretoActions.reset())
    dispatch(reportActions.reset())
    navigate('/taskselect');
  }

  return (
    <div className={'welcome'}>
      <HeaderBar
        title={'NÁKLADOVÝ CONTROLLING'}
        addToReport={true}
        printToPDF={true}
      />

      <div className={'row'} style={{ paddingLeft: 100 }}>
        <div className={'col-3'} style={{ marginTop: 100 }}>
          <div className={'welcome-item'} onClick={newProject}>
            <h2 className={'welcome-h2'}>Nový projekt</h2>
          </div>
          <div className={'welcome-item'}>
            <h2 className={'welcome-h2'}>Nedávno otvorené</h2>
          </div>
          <div className={'welcome-item'}>
            <h2 className={'welcome-h2'}>Otvoriť projekt</h2>
          </div>
          <div className={'welcome-item'}>
            <h2 className={'welcome-h2'}>Manuál</h2>
          </div>
          <div className={'welcome-item'}>
            <h2 className={'welcome-h2'}>Ukončiť</h2>
          </div>
        </div>
        <div className={'col-9'} style={{ marginTop: 50 }}>
          <div className={'welcome-item'}>
            <h1 className={'welcome-h1'}>
              Aplikácia pre nákladový controlling
            </h1>
            <p>
              Vitajte v aplikácii pre nákladový controlling. Tento software
              slúži na zjednodušenie Vašej práce na predmete Manažérske
              účtovníctvo. Obsahuje rôzne typy nákladových analýz v ktorých
              môžete zadávať vstupy z účtovnej výsledovky. Následne z týchto
              vstupov aplikácia vypočíta príslušne ekonomické ukazovatele a
              vykresli grafický priebeh vývoja. Výsledok je možné uložiť vo formáte PDF.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
