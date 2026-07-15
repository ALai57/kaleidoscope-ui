import * as React from 'react';
import { styled } from '@mui/material/styles';
import { alpha } from '../../../theme/alpha';

const Row = styled('div')(({ theme }) => ({
  display: 'flex', gap: 22, flexWrap: 'wrap', alignItems: 'center', margin: '18px 2px 0',
  fontFamily: theme.tokens.typography.mono, fontSize: 11, color: theme.tokens.color.text.secondary,
}));
const Item = styled('span')({ display: 'flex', alignItems: 'center', gap: 8 });
const Sw = styled('span')(({ theme }) => ({ width: 26, height: 12, borderRadius: 3, background: theme.tokens.color.text.secondary }));
const SwPassive = styled('span')(({ theme }) => ({
  width: 26, height: 12, borderRadius: 3, border: `1.5px dashed ${theme.tokens.color.border.strong}`,
  backgroundImage: `repeating-linear-gradient(135deg, transparent, transparent 4px, ${alpha(theme.tokens.color.text.primary, 0.12)} 4px, ${alpha(theme.tokens.color.text.primary, 0.12)} 5px)`,
}));
const Dep = styled('span')(({ theme }) => ({ width: 26, height: 0, borderTop: `1.4px dashed ${theme.tokens.color.text.disabled}` }));

export const TimelineLegend: React.FC = () => (
  <Row>
    <Item><Sw />Active — hands-on</Item>
    <Item><SwPassive />Passive — hands-off (marinate · simmer · rest)</Item>
    <Item><Dep />Depends on</Item>
  </Row>
);
