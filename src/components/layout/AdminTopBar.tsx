import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

export interface AdminTopBarProps {
  /** The current section title, rendered in the heading voice. */
  title: string;
  /** Right-aligned page actions (buttons, toggles, …). */
  actions?: React.ReactNode;
  /** When set, a hamburger button appears left of the title (mobile shell). */
  onMenuClick?: (() => void) | undefined;
}

/**
 * The slim admin top bar — a section title on the left, page actions on the
 * right. Sticks to the top of the content column while the rail holds the left
 * edge. Token-driven (heading voice + surface/divider) with a bare-MUI fallback.
 */
export const AdminTopBar: React.FC<AdminTopBarProps> = ({ title, actions, onMenuClick }) => {
  const theme = useTheme();
  const tokens = theme.tokens;
  const mono = tokens?.typography.mono ?? 'monospace';
  const headingFamily = tokens?.typography.headingFamily === 'mono' ? mono : 'inherit';

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        minHeight: 56,
        px: 3,
        py: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
        {onMenuClick && (
          <Box
            component="button"
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              ml: -1,
              border: 'none',
              bgcolor: 'transparent',
              color: 'text.primary',
              cursor: 'pointer',
              borderRadius: 1,
            }}
          >
            <MenuIcon />
          </Box>
        )}
        <Typography
          component="h1"
          sx={{
            m: 0,
            fontFamily: headingFamily,
            fontWeight: 700,
            fontSize: '1.15rem',
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </Typography>
      </Box>
      {actions && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          {actions}
        </Box>
      )}
    </Box>
  );
};
