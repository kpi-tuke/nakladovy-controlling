export default function TableStatic(props: any) {
  let separatedData: number[][][] = [];
  let separatedHeaders: string[][] = [];

  let numOfTables = Math.ceil(props.data[0].length / 6);

  for (let i = 0; i < numOfTables; i++) {
    separatedData.push([]);
    separatedHeaders.push([]);
    for (let j = 0; j < props.data.length; j++) {
      separatedData[i].push([]);
    }
  }

  let table: number = 0;
  for (let y = 0; y < props.data[0].length; y++) {
    if (y % 6 === 0 && y !== 0) table++;
    for (let x = 0; x < props.data.length; x++) {
      separatedData[table][x].push(props.data[x][y]);
    }
    separatedHeaders[table].push(props.header[y]);
  }

  return (
    <div className={'table-data row'}>
      {separatedData.map((table, index) => (
        <table
          key={index}
          className={'col-t'}
          style={{ borderCollapse: 'collapse' }}
        >
          <thead>
            <tr className={'table-head'}>
              {index === 0 && <th className={'table-cell'}>{props.corner}</th>}
              {separatedHeaders[index].map((value: string, idx: number) => {
                return (
                  <th className={'table-cell'} key={idx}>
                    {value}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {table.map((tableRow: number[], row: number) => {
              return (
                <tr key={row.toString()}>
                  {index === 0 && (
                    <td className={'table-cell'} key={row}>
                      {props.inputs[row]}
                    </td>
                  )}

                  {tableRow.map((value: number, col: number) => {
                    return (
                      <td
                        className={'table-cell'}
                        style={{ textAlign: 'center' }}
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
      ))}
    </div>
  );
}
