export default function TableStatic(props: any) {
  return (
    <div style={{overflow: 'visible'}}>
      <table>
        <thead>
        <tr className={"table-head"}>
          <th className={'table-cell'}>{props.corner}</th>
          {props.header.map((value: string, idx: number) => {
            return <th className={'table-cell'} key={idx}>{value}</th>;
          })}
        </tr>
        </thead>

        <tbody>
        {props.inputs.map((value: number, row: number) => {
          return (
            <tr key={row.toString()}>
              <td className={'table-cell'} key={value.toString()}>
                {value.toString()}
              </td>

              {props.data[row].map((value: number, col: number) => {
                return (
                  <td
                    className={'table-cell'}
                    style={{textAlign: "center"}}
                    key={row.toString() + ':' + col.toString()}
                  >
                    {value.toString()}
                  </td>
                );
              })}
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
}
