import { Box, styled, TextField } from '@mui/material';
import SectionTitle from '@renderer/components/SectionTitle';
import { variationActions, selectors } from './variationSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Spacer from '@renderer/components/Spacer';

const InputWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const YearLabel = styled(SectionTitle)`
  margin-bottom: 0;
`;

const VariationResults = () => {
  const dispatch = useAppDispatch();

  // @ts-ignore
  const additionalData = useAppSelector(selectors.getAdditionalData!) as any;

  const year = additionalData?.year ?? '';

  const handleTextChange = (value: string) => {
    dispatch(
      variationActions.setAdditionalData({
        key: 'year',
        value,
      }),
    );
  };

  return (
    <div>
      <Spacer height={40} hideInPrint />

      <InputWrapper>
        <YearLabel>Rok</YearLabel>
        <TextField
          sx={{
            background: (theme) => theme.palette.background.paper,
          }}
          inputProps={{
            style: {
              textAlign: 'center',
            },
          }}
          onChange={(e) => handleTextChange(e.target.value)}
          value={year}
          type="number"
        />
      </InputWrapper>
    </div>
  );
};

export default VariationResults;
