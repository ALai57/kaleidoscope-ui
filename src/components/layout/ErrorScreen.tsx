import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface ErrorScreenProps {
  error: Error;
  info: React.ErrorInfo;
  clearError: () => void;
}

/** Fallback UI rendered by the Bugsnag error boundary when the app tree throws. */
export const ErrorScreen: React.FC<ErrorScreenProps> = ({ clearError }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      minHeight: '100vh',
      p: 3,
      textAlign: 'center',
    }}
  >
    <Typography variant="h5">Something went wrong</Typography>
    <Typography color="text.secondary">
      An unexpected error occurred and has been reported. Please try again.
    </Typography>
    <Button variant="contained" onClick={clearError}>
      Try again
    </Button>
  </Box>
);
