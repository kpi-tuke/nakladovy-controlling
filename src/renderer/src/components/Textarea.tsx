import {
  debounce,
  styled,
  TextareaAutosize,
  useTheme as useMuiTheme,
} from '@mui/material';
import { useTheme } from './providers/ThemeProvider';
import { RootSelectors } from '@renderer/store/store';
import { useAppDispatch, useAppSelector } from '@renderer/store/hooks';

const StyledTextareaAutosize = styled(TextareaAutosize)`
  &::placeholder {
    @media print {
      opacity: 0;
    }
  }
`;

type Props = {
  selectors: RootSelectors;
  actions: any;
  className?: string;
};

const Textarea: React.FC<Props> = ({ selectors, actions, className }) => {
  const theme = useMuiTheme();
  const { mode } = useTheme();
  const dispatch = useAppDispatch();

  const text = useAppSelector(selectors.text);

  const debouncedOnChange = (value: string) => {
    dispatch(actions.changeText(value));
  };

  const onChangeDebounced = debounce(debouncedOnChange, 1000);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeDebounced(event.target.value ?? '');
  };

  return (
    <StyledTextareaAutosize
      className={className}
      defaultValue={text}
      onChange={(e) => {
        handleChange(e);
      }}
      placeholder="Sem napíšte záver a zhodnotenie analýzy..."
      minRows={6}
      style={{
        fontSize: '16px',
        outline: 'none',
        borderRadius: '8px',
        padding: '8px',
        backgroundColor: theme.palette.background.paper,
        ...(mode === 'dark' && {
          border: 'none',
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))`,
          color: theme.palette.text.primary,
        }),
      }}
    />
  );
};

export default Textarea;
