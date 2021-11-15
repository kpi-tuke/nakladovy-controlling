import '../../App.css';
import {Link} from "react-router-dom";
// import {Link} from "react-router-dom";
// import ReactApexChart from "react-apexcharts"
// import TableStatic from "../TableStatic";

export default function Result3(props: any) {

  const profitDiff = props.result.incomeSums[1] * 100 / props.result.incomeSums[0] - 100
  const chainIdx = props.result.costSums[1] / props.result.costSums[0]
  console.log(props.result.incomeSums)
  return (
    <div style={{paddingLeft: 10, paddingRight: 10}}>
      <div className={"card-body"}>

        <div className={"row"}>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <div className={"card card-outline-primary mb-3"}>
              <div className={"card-body"}>
                <div className={"number-left"}>
                  <h6 className={"bold"}>NÁKLADY CELKOM({props.result.header[0]})</h6>
                  <h3 className={"card-title bold text-primary"}>{props.result.costSums[0]}</h3>
                </div>
                <div className={"icon-right"}>
                  <i className={"fa fa-line-chart"}/>
                </div>
              </div>
            </div>
          </div>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <div className={"card card-outline-primary mb-3"}>
              <div className={"card-body"}>
                <div className={"number-left"}>
                  <h6 className={"bold"}>NÁKLADY CELKOM({props.result.header[1]})</h6>
                  <h3 className={"card-title bold text-primary"}>{props.result.costSums[1]}</h3>
                </div>
                <div className={"icon-right"}>
                  <i className={"fa fa-line-chart"}/>
                </div>
              </div>
            </div>
          </div>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <div className={"card card-outline-primary mb-3"}>
              <div className={"card-body"}>
                <div className={"number-left"}>
                  <h6 className={"bold"}>VÝNOSY CELKOM({props.result.header[0]})</h6>
                  <h3 className={"card-title bold text-warning"}>{props.result.incomeSums[0]}</h3>
                </div>
                <div className={"icon-right"}>
                  <i className={"fa fa-money"}/>
                </div>
              </div>
            </div>
          </div>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <div className={"card card-outline-primary mb-3"}>
              <div className={"card-body"}>
                <div className={"number-left"}>
                  <h6 className={"bold"}>VÝNOSY CELKOM({props.result.header[1]})</h6>
                  <h3 className={"card-title bold text-warning"}>{props.result.incomeSums[1]}</h3>
                </div>
                <div className={"icon-right"}>
                  <i className={"fa fa-money"}/>
                </div>
              </div>
            </div>
          </div>

        </div>

        <h2>Ekonomická analýza ukazovateľov</h2>

        <div className={"row"}>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <div className={"card card-outline-primary mb-3"}>
              <div className={"card-body"}>
                <div className={"number-left"}>
                  <h6 className={"bold"}>REŤAZOVÝ INDEX</h6>
                  <h3 className={"card-title bold text-success"}>{Math.round(chainIdx * 100) / 100}</h3>
                </div>
                <div className={"icon-right"}>
                  <i className={"fa fa-area-chart"}/>
                </div>
              </div>
            </div>
          </div>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <div className={"card card-outline-primary mb-3"}>
              <div className={"card-body"}>
                <div className={"number-left"}>
                  <h6 className={"bold"}>PERCENTO ZMENY NÁKLADOV</h6>
                  <h3 className={"card-title bold text-primary"}>{Math.round(chainIdx * 100 - 100) / 100}</h3>
                </div>
                <div className={"icon-right"}>
                  <i className={"fa fa-shopping-cart"}/>
                </div>
              </div>
            </div>
          </div>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <div className={"card card-outline-primary mb-3"}>
              <div className={"card-body"}>
                <div className={"number-left"}>
                  <h6 className={"bold"}>PERCENTO ZMENY VÝNOSOV</h6>
                  <h3 className={"card-title bold text-warning"}>{Math.round(profitDiff * 100) / 100}</h3>
                </div>
                <div className={"icon-right"}>
                  <i className={"fa fa-dashboard"}/>
                </div>
              </div>
            </div>
          </div>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <div className={"card card-outline-primary mb-3"}>
              <div className={"card-body"}>
                <div className={"number-left"}>
                  <h6 className={"bold"}>KOEFICIENT REAKCIE</h6>
                  <h3
                    className={"card-title bold text-danger"}>{Math.round((chainIdx * 100 - 100) * 100 / profitDiff) / 100}</h3>
                </div>
                <div className={"icon-right"}>
                  <i className={"fa fa-calculator"}/>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <button><Link to={"/taskselect"}>Back</Link></button>
    </div>
  )
}
