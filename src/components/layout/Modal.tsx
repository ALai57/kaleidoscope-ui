import React from 'react';
import MuiModal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Close from '@mui/icons-material/Close';
import { Button } from './Button';

const COLORS: Record<string, string> = {
  primary: '#1139c9',
  secondary: '#f01c2e',
  success: 'rgb(101, 221, 149)',
  info: 'rgb(141, 174, 255)',
  warn: 'rgb(233, 218, 45)',
  error: 'rgb(245, 125, 111)',
};

const MODAL_BACKGROUND = 'rgba(0, 0, 40, 0.8)';

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
    <div
      className="modal-header"
      style={{ backgroundColor: COLORS[level] ?? COLORS['info'] }}
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
    </div>
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
        backdrop: { style: { backgroundColor: MODAL_BACKGROUND } },
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
