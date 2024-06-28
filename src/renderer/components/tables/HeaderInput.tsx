import { useAppDispatch } from '../../store/hooks';

export default function HeaderInput({
  header,
  actions,
}: {
  header: string[];
  actions: any;
}) {
  const dispatch = useAppDispatch();

  const handleChangeHeader = function (event: any, idx: number) {
    dispatch(actions.setHeadersOnIndex({ data: event.value, index: idx }));
  };

  const addColumn = () => {
    dispatch(actions.addColumn());
  };

  return (
    <thead>
      <tr className={'table-head'}>
        {header.map((value: string, idx: number) => (
          <th
            key={idx}
            className={'table-cell'}
            style={{
              borderRightColor:
                idx === header.length - 1 ? '#65c565' : 'lightgray',
            }}
          >
            <input
              className={'table-input-head'}
              type="text"
              defaultValue={value}
              onBlur={(e) => handleChangeHeader(e.target, idx)}
            />
          </th>
        ))}
        {
          <th className={'add-cell'} onClick={addColumn}>
            +
          </th>
        }
      </tr>
    </thead>
  );
}
