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
        {props.inputs.map((value: string, row: number) => {
          return (
            <tr key={row}>
              <td key={value}>
                {value}
              </td>

              {props.data[row].map((value: string, col: number) => {
                return (
                  <td key={row + ":" + col}>{value}</td>
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
