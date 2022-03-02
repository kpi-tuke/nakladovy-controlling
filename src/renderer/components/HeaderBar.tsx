import { Link } from "react-router-dom";


export default function HeaderBar(props: any) {
	return (
		<div className={"card"}>
			<div className={"card-header"} style={{backgroundColor: "yellow"}}>
				<div className={"caption text-primary bold"} style={{fontSize:50}}>
				{props.title}
			</div>
			<div className={"tools"}>
				<Link className={"btn-outline-light btn bg-primary"} to={"/taskselect"}>
					Menu
				</Link>
			</div>
    	</div>
		</div>
  );
}