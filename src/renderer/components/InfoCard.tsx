export default function InfoCard(props: any) {

  return (
    <div className={"card card-outline-primary mb-3"}>
      <div className={"card-body"}>
        <div className={"number-left"}>
          <h6 className={"bold"}>{props.header}</h6>
          <h3 className={"card-title bold text-" + props.color}>{props.value}</h3>
        </div>
        <div className={"icon-right"}>
          <i className={props.icon}/>
        </div>
      </div>
    </div>
  )
}
