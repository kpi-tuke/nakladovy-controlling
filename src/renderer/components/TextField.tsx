import { useAppDispatch } from '../store/hooks';
import SectionTitle from './SectionTitle';

export default function TextField(props: any) {
  const dispatch = useAppDispatch();

  function changeText(target: EventTarget & HTMLTextAreaElement) {
    dispatch(props.action(target.value));
  }

  return (
    <div>
      <SectionTitle>Záver a zhodnotenie analýzy</SectionTitle>

      <textarea
        defaultValue={props.text}
        onChange={(e) => changeText(e.target)}
      />
    </div>
  );
}
