import { useAppDispatch } from '../../store/hooks';
import { ActionCellRight, TableCell, TableHead, TableRow } from './Table';
import TableActionButton from './TableActionButton';
import TableInput from './TableInput';

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
    <TableHead>
      <TableRow>
        {header.map((value: string, idx: number) => (
          <TableCell key={idx}>
            <TableInput
              defaultValue={value}
              onBlur={(e) => handleChangeHeader(e.target, idx)}
            />
          </TableCell>
        ))}
        {
          <ActionCellRight $topBorder={false}>
            <TableActionButton buttonType="add" onClick={addColumn} />
          </ActionCellRight>
        }
      </TableRow>
    </TableHead>
  );
}
