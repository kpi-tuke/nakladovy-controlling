import { Grid, Typography } from '@mui/material';
import React from 'react';

enum SortingType {
  year = 'year',
  analytic = 'analytic',
}

type Props = {
  sortable?: boolean;
  onSort: (type: SortingType) => void;
};

const Title: React.FC<Props> = () => {
  return (
    <Grid container className={'hideInPrint'}>
      <Grid item xs={2} />

      <Grid
        xs={8}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          Vstupy
        </Typography>
      </Grid>

      <Grid
        item
        xs={2}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        zoradit
      </Grid>
    </Grid>
  );
};

export default Title;
