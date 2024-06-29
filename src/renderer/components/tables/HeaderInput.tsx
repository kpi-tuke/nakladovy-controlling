import { TextField } from '@mui/material';
import { useAppDispatch } from '../../store/hooks';
import { ActionCellRight, TableCell, TableHead, TableRow } from './Table';
import { Add } from '@mui/icons-material';
import TableActionButton from './TableActionButton';

export default function HeaderInput({
  header,
  actions,
}: {
  header: string[];
  actions: any;
}) {
  const dispatch = useAppDispatch();

  const handleChangeHeader = function (event: any, idx: number) {
    dispatch(actions.setHeadersOnIndex({ data: event.value, index: idx }));
  };

  const addColumn = () => {
    dispatch(actions.addColumn());
  };

  return (
    <TableHead>
      <TableRow>
        {header.map((value: string, idx: number) => (
          <TableCell key={idx}>
            <TextField
              defaultValue={value}
              onBlur={(e) => handleChangeHeader(e.target, idx)}
              sx={{
                position: 'absolute',
                inset: 0,

                '& .MuiOutlinedInput-root': {
                  borderRadius: '0',
                  '& fieldset': {
                    border: 'none',
                  },
                },

                input: {
                  height: '48px',
                  padding: 0,
                  fontWeight: 'bold',
                  textAlign: 'center',
                },
              }}
            />
          </TableCell>
        ))}
        {
          <ActionCellRight>
            <TableActionButton buttonType="add" onClick={addColumn} />
          </ActionCellRight>
        }
      </TableRow>
    </TableHead>
  );
}
