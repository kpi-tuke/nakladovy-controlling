import '../App.css';

export default function TableStatic(props: any) {
  return (
      <table className="table table-bordered table-responsive">
        <thead className="thead-light">
        <tr>
          <th className="sorting">
            Ekonomický ukazovateľ
          </th>
          {props.header.map((value: string, idx: number) => {
            return <th key={idx}>{value}</th>
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
  );
}
