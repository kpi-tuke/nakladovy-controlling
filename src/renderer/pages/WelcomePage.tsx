import HeaderBar from '../components/HeaderBar';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  CVPActions,
  economicActions,
  indexActions,
  paretoActions,
  projectActions,
  reportActions,
  selectProject,
  sortimentActions,
  structureActions,
} from '../store/slice';

export default function WelcomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function newProject() {
    dispatch(economicActions.reset());
    dispatch(structureActions.reset());
    dispatch(CVPActions.reset());
    dispatch(indexActions.reset());
    dispatch(sortimentActions.reset());
    dispatch(paretoActions.reset());
    dispatch(reportActions.reset());
    dispatch(projectActions.setCreated());
    navigate('/taskselect');
  }

  function openProject() {
    // @ts-ignore
    window.electron.openProject();
    // @ts-ignore
    window.electron.onOpen('open', (arg) => {
      const json = JSON.parse(arg);
      dispatch(economicActions.open(json.economic));
      dispatch(structureActions.open(json.structure));
      dispatch(CVPActions.open(json.cvp));
      dispatch(indexActions.open(json.chain));
      dispatch(sortimentActions.open(json.sortiment));
      dispatch(paretoActions.open(json.pareto));
      dispatch(reportActions.open(json.tasks));
      navigate('/taskselect');
    });
  }

  const project = useAppSelector(selectProject);

  function continueProject() {
    navigate('/taskselect');
  }

  function quit() {
    // @ts-ignore
    window.electron.quit();
  }

  return (
    <div className={'welcome'}>
      <HeaderBar
        title={'NÁKLADOVÝ CONTROLLING'}
        addToReport={true}
        printToPDF={true}
      />

      <div>
        <div className={'welcome-text'}>
          <p>
            Vitajte v aplikácii pre nákladový controlling. Tento software slúži
            na zjednodušenie Vašej práce na predmete Manažérske účtovníctvo.
            Obsahuje rôzne typy nákladových analýz v ktorých môžete zadávať
            vstupy z účtovnej výsledovky. Následne z týchto vstupov aplikácia
            vypočíta príslušne ekonomické ukazovatele a vykresli grafický
            priebeh vývoja. Výsledok je možné uložiť vo formáte PDF.
          </p>
        </div>
        <div className={"row"}>
          {project.created && (
            <>
              <div className={"col-2"}/>
              <div className={'col-8 welcome-item'} onClick={continueProject}>
                <h2 className={'welcome-h2'}>Pokračovať</h2>
              </div>
              <div className={"col-2"}/>
            </>
          )}
        </div>

        <div className={'row'} >

          <div className={"col-2"}/>
          <div className={'col-4 welcome-item'} onClick={newProject}>
            <h2 className={'welcome-h2'}>Nový projekt</h2>
          </div>
          <div className={'col-4 welcome-item'} onClick={openProject}>
            <h2 className={'welcome-h2'}>Otvoriť projekt</h2>
          </div>
          <div className={"col-2"}/>
        </div>
        <div className={"row"}>
          <div className={"col-2"}/>
          <div className={'col-4 welcome-item'}>
            <h2 className={'welcome-h2'}>Manuál</h2>
          </div>
          <div className={'col-4 welcome-item'} onClick={quit}>
            <h2 className={'welcome-h2'}>Ukončiť</h2>
          </div>
          <div className={"col-2"}/>
        </div>

      </div>
    </div>
  );
}
