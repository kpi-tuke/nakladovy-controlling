import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  TableHead as MuiTableHead,
  styled,
} from '@mui/material';

export const Table = styled(MuiTable)``;

export const TableHead = styled(MuiTableHead)`
  background-color: #e6f7ff;
`;

export const TableBody = styled(MuiTableBody)``;

export const TableRow = styled(MuiTableRow)``;

export const TableCell = styled(MuiTableCell)`
  padding: 0;
  height: 48px;
  width: 12vw;
  min-width: 12vw;
  max-width: 12vw;
  position: relative;

  &:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.palette.divider};
  }
`;
