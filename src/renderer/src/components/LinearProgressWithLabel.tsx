import {
  LinearProgress,
  LinearProgressProps,
  Stack,
  Typography,
} from '@mui/material';

type Props = LinearProgressProps & { value: number };

const LinearProgressWithLabel: React.FC<Props> = (props) => {
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      sx={{
        gap: '8px',
      }}
    >
      <LinearProgress
        sx={{
          flex: 1,
          height: 6,
          borderRadius: 8,
        }}
        variant="determinate"
        {...props}
      />
      <Typography
        variant="body2"
        sx={{
          color: 'white',
        }}
      >{`${Math.round(props.value)}%`}</Typography>
    </Stack>
  );
};

export default LinearProgressWithLabel;
