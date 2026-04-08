import React from 'react';
import MuiSnackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export interface SnackbarProps {
  message?: React.ReactNode;
  level?: 'success' | 'info' | 'warning' | 'error';
  open?: boolean | undefined;
  autoHideDuration?: number | undefined;
  onClose?: (() => void) | undefined;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  level = 'info',
  open: openProp = true,
  autoHideDuration = 6000,
  onClose,
}) => {
  const [showing, setShowing] = React.useState(openProp);

  const handleClose = React.useCallback(
    (_event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason !== 'clickaway') {
        setShowing(false);
        onClose?.();
      }
    },
    [onClose],
  );

  return (
    <MuiSnackbar
      open={showing}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert severity={level} onClose={handleClose}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};
