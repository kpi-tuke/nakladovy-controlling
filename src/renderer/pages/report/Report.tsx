import HeaderBar from '../../components/HeaderBar';
import { useAppSelector } from '../../store/hooks';
import { selectEvaluation } from './evaluationSlice';

export default function Report(props: any) {
  const { tasks } = useAppSelector(selectEvaluation);
  return (
    <div className={'evaluation'}>
      <HeaderBar back={'taskselect'} title={'Vyhodnotenie'} printToPDF={true} />
      {tasks.includes(1) && <props.id1 />}
      {tasks.includes(2) && <props.id2 />}
      {tasks.includes(3) && <props.id3 />}
      {tasks.includes(4) && <props.id4 />}
      {tasks.includes(5) && <props.id5 />}
      {tasks.includes(6) && <props.id6 />}
    </div>
  );
}
