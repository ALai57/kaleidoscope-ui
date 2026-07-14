import * as React from 'react';
import { styled } from '@mui/material/styles';
import { alpha } from '../../theme/alpha';

const Overlay = styled('div')({
  position: 'fixed',
  inset: 0,
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  // eslint-disable-next-line no-restricted-syntax -- fixed overlay scrim, intentionally plane-independent (not a theme token)
  background: 'rgba(6, 9, 14, 0.66)',
  backdropFilter: 'blur(4px)',
});

const Panel = styled('div')(({ theme }) => {
  const { color, radius, elevation } = theme.tokens;
  return {
    width: '100%',
    maxWidth: 460,
    background: color.surface.raised,
    border: `1px solid ${color.border.strong}`,
    borderRadius: radius.lg,
    boxShadow: elevation.lg,
    overflow: 'hidden',
  };
});

const Head = styled('div')({ padding: '20px 22px 0', display: 'flex', alignItems: 'center', gap: 12 });
const IconWrap = styled('div', { shouldForwardProp: (p) => p !== 'tone' })<{ tone: 'accent' | 'crit' }>(
  ({ theme, tone }) => {
    const { color, radius } = theme.tokens;
    const c = tone === 'crit' ? color.status.error : color.brand.primary;
    return {
      width: 38,
      height: 38,
      borderRadius: radius.md,
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0,
      color: c,
      background: alpha(c, 0.14),
    };
  }
);
const Title = styled('div')(({ theme }) => ({
  fontFamily: theme.tokens.typography.mono,
  fontSize: 15,
  fontWeight: 700,
  letterSpacing: '0.02em',
}));
const Body = styled('div')({ padding: '16px 22px 4px' });
const Actions = styled('div')({ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '18px 22px 22px' });

let dialogSeq = 0;

export const Dialog: React.FC<{
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: React.ReactNode;
  tone?: 'accent' | 'crit';
  children: React.ReactNode;
  actions: React.ReactNode;
}> = ({ open, onClose, title, icon, tone = 'accent', children, actions }) => {
  const titleId = React.useRef(`prism-dialog-${dialogSeq++}`).current;
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <Overlay
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <Panel role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <Head>
          {icon && <IconWrap tone={tone}>{icon}</IconWrap>}
          <Title id={titleId}>{title}</Title>
        </Head>
        <Body>{children}</Body>
        <Actions>{actions}</Actions>
      </Panel>
    </Overlay>
  );
};
