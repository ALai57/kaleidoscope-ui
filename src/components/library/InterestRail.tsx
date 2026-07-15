import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Button } from '../prism';
import type { Interest } from '../../types/interest';

interface Props {
  interests: Interest[];
  activeId: string | undefined;
  onAdd: () => void;
}

export const InterestRail: React.FC<Props> = ({ interests, activeId, onAdd }) => {
  const { tokens } = useTheme();
  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 220 }}>
      <div style={{
        fontFamily: tokens.typography.mono, fontSize: 11, letterSpacing: '0.1em',
        color: tokens.color.text.secondary, marginBottom: 8,
      }}>
        INTERESTS
      </div>
      {interests.map((i) => (
        <Link
          key={i.id}
          to={`/library/${i.id}`}
          style={{
            padding: '8px 10px', borderRadius: tokens.radius.sm, textDecoration: 'none',
            color: i.id === activeId ? tokens.color.brand.primary : tokens.color.text.primary,
            background: i.id === activeId ? tokens.color.surface.sunken : 'transparent',
            fontSize: 14,
          }}
        >
          {i.intent}
        </Link>
      ))}
      <div style={{ marginTop: 12 }}>
        <Button variant="subtle" onClick={onAdd} aria-label="add interest">+ Add interest</Button>
      </div>
    </nav>
  );
};
