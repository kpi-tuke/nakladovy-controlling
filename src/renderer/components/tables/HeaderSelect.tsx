import { useAppDispatch } from '../../store/hooks';
import { ActionCellRight, TableCell, TableHead, TableRow } from './Table';
import TableActionButton from './TableActionButton';
import TableSelect from './TableSelect';

export default function HeaderSelect({
  header,
  actions,
}: {
  header: string[];
  actions: any;
}) {
  const selectCol = [
    { value: 7, label: 'Priamy materiál' },
    { value: 8, label: 'Priame mzdy' },
    { value: 9, label: 'Ostatné náklady' },
    { value: 10, label: 'Výrobná réžia' },
    { value: 11, label: 'Správna réžia' },
    { value: 12, label: 'Odbytová réžia' },
    { value: 13, label: 'Zásobovacia réžia' },
    { value: 14, label: 'Dopravná réžia' },
  ];

  const dispatch = useAppDispatch();

  const handleChangeHeader = function (
    event: React.ChangeEvent<HTMLSelectElement>,
    idx: number
  ) {
    dispatch(
      actions.setHeadersOnIndex({ data: event.target.value, index: idx })
    );
  };

  const addColumn = () => {
    dispatch(actions.addColumn());
  };

  let availableHeadersOptions = selectCol
    .filter(
      (option: { value: number; label: string }) =>
        !header.includes(option.label)
    )
    .map((option: any) => option.label);

  const disableAddButton = header.some((value) => !value);

  return (
    <TableHead>
      <TableRow>
        {header.map((value: string, idx: number) => (
          <TableCell key={idx}>
            <TableSelect
              value={value}
              onChange={(e) => handleChangeHeader(e as any, idx)}
              options={[...availableHeadersOptions, value].filter(
                (option) => !!option
              )}
            />
          </TableCell>
        ))}
        {header.length < selectCol.length && (
          <ActionCellRight $topBorder={false}>
            <TableActionButton
              buttonType="add"
              onClick={addColumn}
              disabled={disableAddButton}
            />
          </ActionCellRight>
        )}
      </TableRow>
    </TableHead>
  );
}
