import { Link } from 'react-router-dom';

export default function ({
  to,
  head,
  body,
}: {
  to: string;
  head: string;
  body: string;
}) {
  return (
    <div className={'col-4 select-card'}>
      <Link to={to}>
        <div className={'select-head'}>
          <h2 className={'select-h2'}>{head}</h2>
        </div>
        <div className={'select-body'}>
          <p className={'select-text'}>{body}</p>
        </div>
      </Link>
    </div>
  );
}
