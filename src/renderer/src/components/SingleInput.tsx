import { ChangeEvent } from 'react';
import { useAppDispatch } from '../store/hooks';
import { Paper, styled, TextField, Typography } from '@mui/material';

const PaperStyled = styled(Paper)`
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

type Props = {
  title: string;
  value: number;
  action: any;
};

const SingleInput: React.FC<Props> = ({ title, value, action }) => {
  const dispatch = useAppDispatch();

  const handleChange = function (event: ChangeEvent<HTMLInputElement>) {
    dispatch(
      action(
        event.target.value === ''
          ? 0
          : Math.round(parseFloat(event.target.value) * 100) / 100,
      ),
    );
  };

  return (
    <PaperStyled>
      <Typography variant="h2" sx={{ fontSize: '18px', fontWeight: 700 }}>
        {title}
      </Typography>
      <TextField
        size="small"
        value={value}
        type="number"
        onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>)}
        onWheel={(event) => event.currentTarget.blur()}
        InputProps={{
          inputProps: { min: 0 },
        }}
        sx={{
          input: {
            textAlign: 'center',
          },
        }}
      />
    </PaperStyled>
  );
};

export default SingleInput;
