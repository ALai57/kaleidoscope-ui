import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { SurfaceCard } from '../common/SurfaceCard';

export interface NotificationCardProps {
  level?: 'error' | 'warn' | 'info';
  title?: string;
  message?: string;
}

// Level → MUI palette tone (each has a `.main`, so it resolves in light + dark).
const LEVEL_TONE: Record<NonNullable<NotificationCardProps['level']>, 'error' | 'warning' | 'info'> = {
  error: 'error',
  warn: 'warning',
  info: 'info',
};

const LevelIcon: React.FC<{ level: NotificationCardProps['level'] }> = ({ level }) => {
  switch (level) {
    case 'warn':
      return <WarningAmberIcon fontSize="small" color="inherit" />;
    case 'info':
      return <InfoOutlinedIcon fontSize="small" color="inherit" />;
    case 'error':
    default:
      return <ErrorOutlineIcon fontSize="small" color="inherit" />;
  }
};

export const NotificationCard: React.FC<NotificationCardProps> = ({
  level = 'error',
  title,
  message,
}) => {
  const theme = useTheme();
  const mono = theme.tokens?.typography.mono ?? 'monospace';
  const tone = LEVEL_TONE[level] ?? 'error';

  return (
    <SurfaceCard sx={{ p: 2, mb: 3, borderLeft: 3, borderLeftColor: `${tone}.main` }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: `${tone}.main` }}>
        <LevelIcon level={level} />
        <Typography
          component="div"
          sx={{ fontFamily: mono, fontWeight: 700, letterSpacing: '0.03em', color: `${tone}.main` }}
        >
          {title}
        </Typography>
      </Box>
      {message && (
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mt: 1
          }}>
          {message}
        </Typography>
      )}
    </SurfaceCard>
  );
};
