import styled from '@emotion/styled';
import { useAppSelector } from '../../store/hooks';
import { RootSelectors } from '../../store/store';
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

type ItemValueProps = {
  selectors: RootSelectors;
};

const ItemValue: React.FC<ItemValueProps> = ({ selectors }) => {
  const corner = useAppSelector(selectors.corner);
  const items = useAppSelector(selectors.items);

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
};

export default ItemValue;
