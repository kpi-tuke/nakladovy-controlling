import '../App.css';

export default function TableStatic(props: any) {
  return (
    <div className="card mb-3">

      <div className="card-header">
        <h3 className="caption">{props.taskName}</h3>
      </div>

      <table className="table table-bordered table-responsive">
        <thead className="thead-light">
        <tr>
          <th className="sorting">
            Ekonomická položka
          </th>
          {props.header.map((value: string) => {
            return <th key={value}>{value}</th>
          })}
        </tr>

        </thead>
        <tbody>
        {props.inputs.map((value: number, row: number) => {
          return (
            <tr key={row.toString()}>
              <td key={value.toString()}>
                {value.toString()}
              </td>

              {props.data[row].map((value: number, col: number) => {
                return (
                  <td key={row.toString() + ":" + col.toString()}>{value.toString()}</td>
                )
              })}
            </tr>)
        })
        }
        </tbody>
      </table>

    </div>
  );
}
