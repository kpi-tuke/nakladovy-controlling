import { Box, styled } from '@mui/material';

export const TableData = styled(Box)`
  overflow: auto;

  @print {
    overflow: unset;
  }
`;
