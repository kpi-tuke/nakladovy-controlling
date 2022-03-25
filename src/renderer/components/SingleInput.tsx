import {useAppDispatch} from 'renderer/store/hooks';
import '../ScreenStyle.css';

export default function SingleInput(props: any) {
  const dispatch = useAppDispatch();

  const handleChange = function (event: any) {
    dispatch(props.input(parseFloat(event.target.value)));
  };

  return (
    <div
      className={'info-card'}
    >
      <h2 className={"info-title"}>{props.title}</h2>
      <input
        className={"single-input"}
        value={props.value}
        type="number"
        min="0"
        step="0.01"
        onChange={() => handleChange(event)}
      />
    </div>
  );
}
