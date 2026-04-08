import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export interface NotificationCardProps {
  level?: 'error' | 'warn' | 'info';
  title?: string;
  message?: string;
}

const LevelIcon: React.FC<{ level: string }> = ({ level }) => {
  switch (level) {
    case 'warn':
      return <WarningAmberIcon style={{ color: 'orange' }} />;
    case 'error':
    default:
      return <ErrorOutlineIcon style={{ color: 'red' }} />;
  }
};

export const NotificationCard: React.FC<NotificationCardProps> = ({
  level = 'error',
  title,
  message,
}) => (
  <Card className="text-white bg-light mb-3 article-card">
    <LevelIcon level={level} />
    <CardContent>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        color="text.primary"
      >
        {title}
      </Typography>
    </CardContent>
    <CardContent>
      <Typography variant="body2" color="text.primary">
        {message}
      </Typography>
    </CardContent>
  </Card>
);
