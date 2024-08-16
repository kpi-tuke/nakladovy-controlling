import { Box, styled } from '@mui/material';

export const TableData: any = styled(Box)`
  overflow: auto;

  @media print {
    overflow: unset;
  }
`;
