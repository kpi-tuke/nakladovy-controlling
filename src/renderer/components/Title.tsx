import { Box, Button, Grid, styled, Typography } from '@mui/material';
import React from 'react';
import { AccessTime, AlignHorizontalRight } from '@mui/icons-material';
import Dropdown from './Dropdown';
import { SortDirection } from 'renderer/types/sortDirection';
import SectionTitle from './SectionTitle';

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

const Title: React.FC<Props> = ({ onSortYear, onSortItems }) => {
  return (
    <Grid container>
      <Grid item xs={4} />

      <GridCenter item xs={4}>
        <SectionTitle>Vstupy</SectionTitle>
      </GridCenter>

      <div className="hideInPrint">
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

            {!!onSortItems && (
              <Dropdown
                options={[
                  {
                    onClick: () => onSortItems('asc'),
                    label: 'Vzostupne',
                  },
                  {
                    onClick: () => onSortItems('desc'),
                    label: 'Zostupne',
                  },
                ]}
              >
                <ResponsiveButton
                  variant="outlined"
                  icon={<AlignHorizontalRight />}
                >
                  Zoradiť položky
                </ResponsiveButton>
              </Dropdown>
            )}
          </SortingButtons>
        </GridSorting>
      </div>
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
