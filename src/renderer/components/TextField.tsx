import { TextareaAutosize } from '@mui/material';
import { useAppDispatch } from '../store/hooks';
import SectionTitle from './SectionTitle';

export default function TextField(props: any) {
  const dispatch = useAppDispatch();

  function changeText(target: EventTarget & HTMLTextAreaElement) {
    dispatch(props.action(target.value));
  }

  return (
    <div>
      <SectionTitle>Záver a zhodnotenie analýzy</SectionTitle>

      <TextareaAutosize
        defaultValue={props.text}
        onChange={(e) => changeText(e.target)}
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
}
