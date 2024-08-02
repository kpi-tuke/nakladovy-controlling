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
              minWidth: '12.75vw',
              maxWidth: '12.75vw',
              width: '12.75vw',
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
              dangerouslySetInnerHTML={{ __html: value }}
            />
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
