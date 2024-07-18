import { Typography } from '@mui/material';
import { TableCell, TableHead, TableRow } from './Table';

export default function HeaderValue({ header }: { header: string[] }) {
  return (
    <TableHead>
      <TableRow>
        {header.map((value: string, idx: number) => (
          <TableCell
            key={idx}
            sx={{
              minWidth: '13vw',
              maxWidth: '13vw',
              width: '13vw',
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              {value}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
