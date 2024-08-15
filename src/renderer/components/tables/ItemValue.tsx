import styled from '@emotion/styled';
import { useAppSelector } from '../../store/hooks';
import { DefaultState } from '../../store/rootReducer';
import { RootState } from '../../store/store';
import {
  Table,
  TableBody,
  TableCell,
  TableCorner,
  TableHead,
  TableRow,
  ActionCellBottom,
} from './Table';

const TableCellStyled = styled(TableCell)`
  padding: 0 9px;
  text-align: left;
`;

export default function ItemValue({
  selector,
}: {
  selector: (state: RootState) => DefaultState;
}) {
  const { corner, items } = useAppSelector(selector);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCorner>{corner}</TableCorner>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((value: string, row: number) => {
          return (
            <TableRow key={row}>
              <TableCellStyled
                key={value + row.toString()}
                dangerouslySetInnerHTML={{ __html: value }}
              />
            </TableRow>
          );
        })}
        <TableRow>
          <ActionCellBottom></ActionCellBottom>
        </TableRow>
      </TableBody>
    </Table>
  );
}
