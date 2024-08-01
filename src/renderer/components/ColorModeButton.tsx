import { useTheme } from './providers/ThemeProvider';
import { styled } from '@mui/material';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Button } from '@mui/material';

const ButtonStyled = styled(Button)`
  width: 36px;
  min-width: 36px;
  max-width: 36px;
`;

const ColorModeButton = () => {
  const { switchColorMode, mode } = useTheme();

  return (
    <ButtonStyled onClick={switchColorMode}>
      {mode === 'light' ? <ModeNightIcon /> : <WbSunnyIcon />}
    </ButtonStyled>
  );
};

export default ColorModeButton;
