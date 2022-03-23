import {useAppDispatch} from 'renderer/store/hooks';
import '../ScreenStyle.css';

export default function SingleInput(props: any) {
  const dispatch = useAppDispatch();

  const handleChange = function (event: any) {
    dispatch(props.input(event.target.value));
  };

  return (
    <div
      className={'info-card'}
      style={{
        marginTop: 80,
      }}
    >
      <h6>{props.title}</h6>

      <div>
        <input
          value={props.value}
          type="number"
          onChange={() => handleChange(event)}
        />
      </div>
    </div>
  );
}
