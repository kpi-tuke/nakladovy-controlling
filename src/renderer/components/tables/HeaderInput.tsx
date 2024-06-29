import { Button, styled, TextField } from '@mui/material';
import { useAppDispatch } from '../../store/hooks';
import { TableCell, TableHead, TableRow } from './Table';
import { Add } from '@mui/icons-material';

const AddCell = styled(TableCell)`
  position: relative;
  width: 20px;
  min-width: 20px;
  max-width: 20px;
  border-right: 1px solid ${({ theme }) => theme.palette.divider};
`;

const AddButton = styled(Button)`
  background-color: #fff;
  padding: 0;
  position: absolute;
  inset: 0;
  min-width: unset;
  width: 100%;
  border-radius: 0;
  color: ${({ theme }) => theme.palette.success.main};

  &:hover {
    background-color: ${({ theme }) => theme.palette.success.main};
    color: #fff;
  }
`;

const InputStyled = styled(TextField)`
  border: none;
  border-radius: 0;
`;

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
            <InputStyled
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
          <AddCell>
            <AddButton onClick={addColumn}>
              <Add sx={{ fontSize: 18 }} />
            </AddButton>
          </AddCell>
        }
      </TableRow>
    </TableHead>
  );
}
