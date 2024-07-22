import { debounce, TextareaAutosize } from '@mui/material';
import SectionTitle from './SectionTitle';

type Props = {
  onChangeDebounced?: (value: string) => void;
  defaultValue?: string;
};

const Textarea: React.FC<Props> = ({
  defaultValue,
  onChangeDebounced: onChange,
}) => {
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
        minRows={6}
        style={{
          fontSize: '16px',
          outline: 'none',
          borderRadius: '8px',
          padding: '8px',
        }}
      />
    </div>
  );
};

export default Textarea;
