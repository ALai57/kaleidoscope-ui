import React from 'react';
import MuiModal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import Close from '@mui/icons-material/Close';
import { Button } from './Button';

// Notification level -> theme palette slot (the header color comes from the theme).
type PaletteLevel = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
const LEVEL_PALETTE: Record<string, PaletteLevel> = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  info: 'info',
  warn: 'warning',
  error: 'error',
};

export interface ModalTemplateProps {
  title?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: (() => void) | undefined;
  level?: string | undefined;
}

export const ModalTemplate: React.FC<ModalTemplateProps> = ({
  title,
  body,
  footer,
  onClose,
  level = 'info',
}) => (
  <div
    className="modal-content"
    style={{ border: 'none', maxHeight: '90vh' }}
  >
    <Box
      className="modal-header"
      sx={(theme) => ({
        backgroundColor: theme.palette[LEVEL_PALETTE[level] ?? 'info'].main,
      })}
    >
      <Typography variant="h5" sx={{ display: 'inline-block' }}>
        {title}
      </Typography>
      <Button
        onClick={onClose}
        sx={{
          display: 'inline-block',
          float: 'inline-end',
          padding: '0px',
        }}
        text={<Close className="close-button" sx={{ padding: '0px' }} />}
      />
    </Box>
    {body && <div className="modal-body">{body}</div>}
    {footer && <div className="modal-footer">{footer}</div>}
  </div>
);

export interface BasicModalProps {
  open?: boolean | undefined;
  title?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  level?: string | undefined;
  onClose?: (() => void) | undefined;
}

export const BasicModal: React.FC<BasicModalProps> = ({
  open = true,
  title,
  body,
  footer,
  level = 'info',
  onClose,
}) => {
  const handleClose = React.useCallback(
    (_event: object, _reason: 'backdropClick' | 'escapeKeyDown') => {
      onClose?.();
    },
    [onClose],
  );

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      slotProps={{
        backdrop: {
          sx: (theme) => ({ backgroundColor: alpha(theme.palette.common.black, 0.8) }),
        },
      }}
    >
      <Box className="modal-box">
        <ModalTemplate
          title={title}
          body={body}
          footer={footer}
          onClose={onClose}
          level={level}
        />
      </Box>
    </MuiModal>
  );
};
