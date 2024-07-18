import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  TableHead as MuiTableHead,
  styled,
} from '@mui/material';

export const Table = styled(MuiTable)`
  @media print {
    border-top: ${({ theme }) => `1px solid ${theme.palette.divider}`};
    border-left: ${({ theme }) => `1px solid ${theme.palette.divider}`};
  }
`;

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
  border-right: 1px solid ${({ theme }) => theme.palette.divider};
  text-align: center;

  &:hover {
    .tooltiptext {
      visibility: visible;
    }
  }
`;

export const TableCorner = styled(TableCell)`
  font-weight: bold;
  text-align: center;
`;

export const DataTable = styled(Table)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  width: unset;
`;

export const ActionCellRight = styled(TableCell)<{ $topBorder?: boolean }>`
  width: 20px;
  min-width: 20px;
  max-width: 20px;
  border-right: 1px solid ${({ theme }) => theme.palette.divider};
  border-top: ${({ theme, $topBorder = true }) =>
    $topBorder ? `1px solid ${theme.palette.divider}` : 'none'};
`;

export const ActionCellBottom = styled(TableCell)`
  height: 28px;
`;

export const ActionCellBottomRight = styled(ActionCellRight)`
  height: 28px;
  border: none;
`;
