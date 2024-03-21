import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { AnalysisItem } from 'renderer/types/AnalysisItem';

const AnalysisCard: React.FC<AnalysisItem> = ({ to, title, description }) => {
  return (
    <Link to={to}>
      <Card sx={{ height: '100%' }}>
        <CardHeader
          title={title}
          titleTypographyProps={{
            sx: {
              fontSize: 20,
            },
          }}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: '#fff',
          }}
        />
        <CardContent>{description}</CardContent>
      </Card>
    </Link>
  );
};

export default AnalysisCard;
