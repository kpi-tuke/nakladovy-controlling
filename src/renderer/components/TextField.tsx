import '../ScreenStyle.css';
import {useAppDispatch} from '../store/hooks';

export default function TextField(props: any) {
  const dispatch = useAppDispatch();

  function changeText(target: EventTarget & HTMLTextAreaElement) {
    dispatch(props.action(target.value));
  }

  return (
    <div>
      <h1 className={'result-h1'}>Záver a zhodnotenie analýzy</h1>

      <textarea
        className={"text-input"}
        defaultValue={props.text}
        onChange={(e) => changeText(e.target)}
      />
    </div>
  );
}
