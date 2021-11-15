import '../App.css';

export default function SingleInput(props: any) {


  const handleChange = function (event: any, idx: number) {
    props.input[idx] = parseInt(event.target.value)
    props.proceed()
  }

  return (
    <div>
      <div className={"col"}>
        <div className={"card card-outline-primary mb-3"}>
          <div className={"card-body"}>
            <div className={"number-left"}>
              <h6 className={"bold"}>{props.title}</h6>
              <input type="number" className="input-group-text"
                //style={{border: 0, margin: 0, padding: 0, width: 60}
                     onChange={() => (handleChange(event, 0))}/>
            </div>
            <div className={"icon-right"}>
              <i className={"fa fa-dashboard"}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
