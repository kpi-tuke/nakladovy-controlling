import { Box, Button, Grid, styled, Typography } from '@mui/material';
import React from 'react';
import { AccessTime, AlignHorizontalRight } from '@mui/icons-material';
import Dropdown from './Dropdown';
import { SortDirection } from 'renderer/helper';

const TitleText = styled(Typography)`
  font-size: 30px;
  font-weight: 700;
`;

const GridCenter = styled(Grid)`
  display: flex;
  justify-content: center;
`;

const GridSorting = styled(Grid)`
  display: flex;
  justify-content: flex-end;
`;

const SortingButtons = styled(Box)`
  display: flex;
  gap: 10px;
`;

type Props = {
  onSortYear?: (sortDirection: SortDirection) => void;
  onSortItems?: (sortDirection: SortDirection) => void;
};

const Title: React.FC<Props> = ({ onSortYear }) => {
  return (
    <Grid container className={'hideInPrint'}>
      <Grid item xs={4} />

      <GridCenter item xs={4}>
        <TitleText variant="h2">Vstupy</TitleText>
      </GridCenter>

      <GridSorting item xs={4}>
        <SortingButtons>
          {!!onSortYear && (
            <Dropdown
              options={[
                {
                  onClick: () => onSortYear('asc'),
                  label: 'Vzostupne',
                },
                {
                  onClick: () => onSortYear('desc'),
                  label: 'Zostupne',
                },
              ]}
            >
              <ResponsiveButton variant="outlined" icon={<AccessTime />}>
                Zoradiť roky
              </ResponsiveButton>
            </Dropdown>
          )}
          {/* {!!onSortItems && (
            <ResponsiveButton
              variant="outlined"
              onClick={onSortItems}
              icon={<AlignHorizontalRight />}
            >
              Zoradiť položky
            </ResponsiveButton>
          )} */}
        </SortingButtons>
      </GridSorting>
    </Grid>
  );
};

export default Title;

type ResponsiveButtonProps = {
  icon: React.ReactNode;
} & import('@mui/material/Button').ButtonProps;

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({
  icon,
  children,
  ...props
}) => {
  return (
    <Button
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
      {...props}
    >
      <IconWrapper>{icon}</IconWrapper>
      <Typography
        sx={{
          display: {
            xs: 'none',
            md: 'flex',
          },
          fontSize: 14,
        }}
      >
        {children}
      </Typography>
    </Button>
  );
};
