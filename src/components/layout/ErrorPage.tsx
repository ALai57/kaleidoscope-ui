import React, { useEffect } from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const RELOAD_KEY = 'chunk-error-reloaded';

export const ErrorPage: React.FC = () => {
  const error = useRouteError();

  const isChunkError =
    error instanceof TypeError &&
    error.message.includes('Failed to fetch dynamically imported module');

  useEffect(() => {
    if (isChunkError && !sessionStorage.getItem(RELOAD_KEY)) {
      sessionStorage.setItem(RELOAD_KEY, '1');
      window.location.reload();
    }
  }, [isChunkError]);

  // Clear the reload flag on successful navigation away
  useEffect(() => {
    return () => {
      sessionStorage.removeItem(RELOAD_KEY);
    };
  }, []);

  let message = 'Something went wrong.';
  if (isRouteErrorResponse(error)) {
    message =
      error.status === 404
        ? 'Page not found.'
        : `${error.status} ${error.statusText}`;
  } else if (isChunkError) {
    message = 'The app was updated. Reloading…';
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
      }}
    >
      <Typography variant="h5">{message}</Typography>
      {!isChunkError && (
        <Button variant="outlined" onClick={() => (window.location.href = '/')}>
          Go home
        </Button>
      )}
    </Box>
  );
};
