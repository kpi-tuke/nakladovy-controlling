export default function HeaderValue({
  header,
}: {
  header: string[];
}) {
  return (
    <thead>
      <tr className={'table-head'}>
        {header.map((value: string, idx: number) => (
          <th
            key={idx}
            className={'table-cell'}
            style={{ textAlign: "center"}}
          >
            {value}
          </th>
        ))}
      </tr>
    </thead>
  );
}
