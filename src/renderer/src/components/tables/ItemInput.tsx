import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { DefaultState } from '../../store/rootReducer';
import { RootState } from '../../store/store';
import {
  ActionCellBottom,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from './Table';
import TableActionButton from './TableActionButton';
import TableInput from './TableInput';

export default function ItemInput({
  selector,
  actions,
}: {
  corner: string[];
  inputs: string[];
  selector: (state: RootState) => DefaultState;
  actions: any;
}) {
  const { corner, items } = useAppSelector(selector);
  const dispatch = useAppDispatch();

  const handleChangeInput = function (e: any, idx: number) {
    dispatch(actions.setItemsOnIndex({ data: e.label || e.value, index: idx }));
    dispatch(actions.setValuesOnIndex({ data: e.value, index: idx }));
  };

  const addRow = () => {
    dispatch(actions.addRow());
  };

  const disableAddRow = items.some((item) => !item);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{corner}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((value: string, row: number) => {
          return (
            <TableRow key={row}>
              <TableCell key={value + row.toString()}>
                <TableInput
                  defaultValue={value}
                  onBlur={(e) => handleChangeInput(e.target, row)}
                />
              </TableCell>
            </TableRow>
          );
        })}

        <TableRow>
          <ActionCellBottom>
            <TableActionButton
              buttonType="add"
              onClick={addRow}
              disabled={disableAddRow}
            />
          </ActionCellBottom>
        </TableRow>
      </TableBody>
    </Table>
  );
}
