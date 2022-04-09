import {Link} from 'react-router-dom';

export default function (props: any) {
  return (
    <div className={'col-4 select-card'}>
      <Link to={props.to}>
        <div className={'select-head'}>
          <h1 className={"select-h1"}>
            {props.head}
          </h1>
        </div>
        <div className={"select-body"}>
          <p className={"select-text"}>
            {props.body}
          </p>
        </div>
      </Link>
    </div>
  );
}
