import '../../App.css';
import {Link} from "react-router-dom";
import InfoCard from "../InfoCard";
// import {Link} from "react-router-dom";
// import ReactApexChart from "react-apexcharts"
// import TableStatic from "../TableStatic";

export default function Result3(props: any) {

  const profitDiff = props.result.incomeSums[1] * 100 / props.result.incomeSums[0] - 100
  const chainIdx = props.result.costSums[1] / props.result.costSums[0]
  const costDiff = Math.round(chainIdx * 100 - 100) / 100
  const incomeDiff = Math.round(profitDiff * 100) / 100
  const reaction = Math.round((chainIdx * 100 - 100) * 100 / profitDiff) / 100

  return (
    <div style={{paddingLeft: 10, paddingRight: 10}}>
      <div className={"card-body"}>

        <div className={"row"}>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <InfoCard header={"NÁKLADY CELKOM(" + props.result.header[0] + ")"}
                      value={props.result.costSums[0]}
                      color={"primary"}
                      icon={"fa fa-line-chart"}
            />
          </div>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <InfoCard header={"NÁKLADY CELKOM(" + props.result.header[1] + ")"}
                      value={props.result.costSums[1]}
                      color={"primary"}
                      icon={"fa fa-line-chart"}
            />

          </div>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <InfoCard header={"VÝNOSY CELKOM(" + props.result.header[0] + ")"}
                      value={props.result.incomeSums[0]}
                      color={"warning"}
                      icon={"fa fa-money"}
            />
          </div>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <InfoCard header={"VÝNOSY CELKOM(" + props.result.header[1] + ")"}
                      value={props.result.incomeSums[1]}
                      color={"warning"}
                      icon={"fa fa-money"}
            />
          </div>

        </div>

        <h2>Ekonomická analýza ukazovateľov</h2>

        <div className={"row"}>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <InfoCard header={"REŤAZOVÝ INDEX"}
                      value={Math.round(chainIdx * 100) / 100}
                      color={"success"}
                      icon={"fa fa-area-chart"}
            />
          </div>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <InfoCard header={"PERCENTO ZMENY NÁKLADOV"}
                      value={costDiff}
                      color={"primary"}
                      icon={"fa fa-shopping-cart"}
            />
          </div>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <InfoCard header={"PERCENTO ZMENY VÝNOSOV"}
                      value={incomeDiff}
                      color={"warning"}
                      icon={"fa fa-dashboard"}
            />
          </div>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <InfoCard header={"KOEFICIENT REAKCIE"}
                      value={reaction}
                      color={"danger"}
                      icon={"fa fa-calculator"}
            />
          </div>

        </div>
      </div>
      <button><Link to={"/taskselect"}>Back</Link></button>
    </div>
  )
}
