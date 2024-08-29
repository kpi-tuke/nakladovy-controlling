import { Typography } from '@mui/material';
import { TableCell, TableHead, TableRow } from './Table';
import { RootSelectors } from '@renderer/store/store';
import { useAppSelector } from '@renderer/store/hooks';

type HeaderValueProps = {
  selectors: RootSelectors;
};

const HeaderValue: React.FC<HeaderValueProps> = ({ selectors }) => {
  const headers = useAppSelector(selectors.headers);

  return (
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableCell
            key={header.id}
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
              dangerouslySetInnerHTML={{ __html: header.label }}
            />
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default HeaderValue;
