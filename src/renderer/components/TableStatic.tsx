export default function TableStatic(props: any) {
  return (
    <table>
      <thead>
      <tr>
        <th>Ekonomický ukazovateľ</th>
        {props.header.map((value: string, idx: number) => {
          return <th key={idx}>{value}</th>;
        })}
      </tr>
      </thead>
      <tbody>
      {props.inputs.map((value: number, row: number) => {
        return (
          <tr key={row.toString()}>
            <td key={value.toString()}>{value.toString()}</td>

            {props.data[row].map((value: number, col: number) => {
              return (
                <td key={row.toString() + ':' + col.toString()}>
                  {value.toString()}
                </td>
              );
            })}
          </tr>
        );
      })}
      </tbody>
    </table>
  );
}
