import {useAppDispatch} from 'renderer/store/hooks';
import '../App.css';

export default function SingleInput(props: any) {

  const dispatch = useAppDispatch()

  const handleChange = function (event: any) {
    dispatch(props.input(event.target.value))
  }
  //input group text
  return (
    <div style={{
      backgroundColor: 'white',
      padding: 25,
      marginTop: 80,
      boxShadow: '0px 0px 10px lightgray',
    }}>

      <h6 className={"bold"}>{props.title}</h6>

      <div className={"input-group"}>
        <input value={props.value} type="number" className="form-control"
          //style={{border: 0, margin: 0, padding: 0, width: 60}
               onChange={() => (handleChange(event))}/>
        <span>

              </span></div>

    </div>
  )
}
