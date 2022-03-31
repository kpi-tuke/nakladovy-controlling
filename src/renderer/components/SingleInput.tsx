import { ChangeEvent } from 'react';
import {useAppDispatch} from 'renderer/store/hooks';
import '../ScreenStyle.css';

export default function SingleInput(props: any) {
  const dispatch = useAppDispatch();

  const handleChange = function (event: ChangeEvent<HTMLInputElement>) {
    dispatch(props.input(event.target.value === '' ? 0 : parseFloat(event.target.value)));
  };

  return (
    <div
      className={'info-card'}
    >
      <h2 className={"info-title"}>{props.title}</h2>
      <input
        className={"single-input"}
        value={props.value === 0 ? "" : props.value}
        type="number"
        min={"0"}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}
