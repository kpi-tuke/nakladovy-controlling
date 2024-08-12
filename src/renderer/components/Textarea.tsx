import {
  debounce,
  TextareaAutosize,
  useTheme as useMuiTheme,
} from '@mui/material';
import SectionTitle from './SectionTitle';
import { useTheme } from './providers/ThemeProvider';

type Props = {
  onChangeDebounced?: (value: string) => void;
  defaultValue?: string;
};

const Textarea: React.FC<Props> = ({
  defaultValue,
  onChangeDebounced: onChange,
}) => {
  const theme = useMuiTheme();
  const { mode } = useTheme();

  const debouncedOnChange = (value: string) => {
    onChange(value);
  };

  const onChangeDebounced = debounce(debouncedOnChange, 1000);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeDebounced(event.target.value ?? '');
  };

  return (
    <div>
      <SectionTitle>Záver a zhodnotenie analýzy</SectionTitle>

      <TextareaAutosize
        defaultValue={defaultValue}
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
    </div>
  );
};

export default Textarea;
