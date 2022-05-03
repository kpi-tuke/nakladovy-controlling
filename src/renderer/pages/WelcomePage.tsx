import HeaderBar from '../components/HeaderBar';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  projectActions,
  selectProject,
} from '../store/projectSlice';
import {CVPActions} from "./cvp/cvpSlice";
import {economicActions} from "./economic/economicSlice";
import {indexActions} from "./index/indexSlice";
import {paretoActions} from "./pareto/paretoSlice";
import {sortimentActions} from "./sortiment/sortimentSlice";
import {structureActions} from "./structure/structureSlice";
import {evaluationActions} from "./evaluation/evaluationSlice";

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
    dispatch(evaluationActions.reset());
    dispatch(projectActions.setCreated());
    navigate('/taskselect');
  }

  function openProject() {
    // @ts-ignore
    window.electron.openProject();
    // @ts-ignore
    window.electron.onOpen('open', (arg) => {
      const json = JSON.parse(arg);
      dispatch(economicActions.openProject(json.economic));
      dispatch(structureActions.openProject(json.structure));
      dispatch(CVPActions.openProject(json.cvp));
      dispatch(indexActions.openProject(json.chain));
      dispatch(sortimentActions.openProject(json.sortiment));
      dispatch(paretoActions.openProject(json.pareto));
      dispatch(evaluationActions.openProject(json.tasks));
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
            Vitajte v aplikácii pre Nákladový Controlling.
            Táto softvérová aplikácia slúži na riešenie praktických
            príkladov a prípadových štúdií zameraných na využívanie
            ekonomických analýz v rámci manažérskeho rozhodovania.
            Obsahuje rôzne typy ekonomických analýz orientovaných
            na ekonomickú veličinu – náklady.
            Výstupy jednotlivých ekonomických analýz obsahujú
            grafické metódy a sú realizované vo formáte pdf.
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
