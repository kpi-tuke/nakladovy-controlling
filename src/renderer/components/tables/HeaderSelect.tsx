import { useAppDispatch } from '../../store/hooks';

export default function HeaderSelect({
  header,
  actions,
}: {
  header: string[];
  actions: any;
}) {

  const selectCol = [
    {value: 7, label: 'Priamy materiál'},
    {value: 8, label: 'Priame mzdy'},
    {value: 9, label: 'Ostatné náklady'},
    {value: 10, label: 'Výrobná réžia'},
    {value: 11, label: 'Správna réžia'},
    {value: 12, label: 'Odbytová réžia'},
    {value: 13, label: 'Zásobovacia réžia'},
    {value: 14, label: 'Dopravná réžia'},
  ]

  const dispatch = useAppDispatch();

  const handleChangeHeader = function (e: any, idx: number) {
    dispatch(actions.setHeadersOnIndex({ data: e.value, index: idx }));
  };

  const addColumn = () => {
    dispatch(actions.addColumn());
  };

  let availableHeadersOptions =
    selectCol.filter(
        (option: { value: number; label: string }) =>
          !header.includes(option.label)
      )
      .map((option: any) => option.label);

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
            <select
              className={'table-select-head'}
              value={value}
              onChange={(e) => handleChangeHeader(e.target, idx)}
            >
              {availableHeadersOptions.map(
                (option: string, idx: number) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                )
              )}
              <option key={8} value={value} hidden={true}>
                {value}
              </option>
            </select>
          </th>
        ))}
        {
          header.length < 8 && <th className={'add-cell'} onClick={addColumn}>
          +
          </th>
        }
      </tr>
    </thead>
  );
}
