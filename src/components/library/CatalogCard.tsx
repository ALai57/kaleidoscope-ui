import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Card, Chip, IconButton, Menu, MenuItem } from '../prism';
import { catalogCode, originLabel, originColorKey } from './catalog';
import { useUpdateRecStatus } from './hooks';
import type { Recommendation, RecommendationStatus } from '../../types/interest';

interface Props {
  rec: Recommendation;
  interestId: string;
  token: string | undefined;
}

export const CatalogCard: React.FC<Props> = ({ rec, interestId, token }) => {
  const { tokens } = useTheme();
  const [open, setOpen] = React.useState(false);
  const updateStatus = useUpdateRecStatus(interestId, token);
  const originColor = tokens.color.categorical[originColorKey(rec.origin)];

  const setStatus = (status: RecommendationStatus): void => {
    setOpen(false);
    updateStatus.mutate({ recId: rec.id, status });
  };

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <Chip as="span" dotColor={originColor} pressed={false}>
          {catalogCode(rec.kind)}
        </Chip>
        <IconButton
          aria-label="card actions"
          aria-expanded={open}
          onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </div>

      <a
        href={rec.url}
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'block', marginTop: 12, fontSize: 16, fontWeight: 600,
          color: tokens.color.text.primary, textDecoration: 'none',
        }}
      >
        {rec.title}
      </a>

      <div style={{
        marginTop: 8, fontFamily: tokens.typography.mono, fontSize: 11.5,
        color: tokens.color.text.secondary, display: 'flex', gap: 10, flexWrap: 'wrap',
      }}>
        <span>{rec.source}</span>
        <span aria-hidden>·</span>
        <span>{rec.est_time}</span>
      </div>

      <p style={{ marginTop: 12, color: tokens.color.text.secondary, fontSize: 13, lineHeight: 1.5 }}>
        {rec.why}
      </p>

      <div style={{
        marginTop: 14, fontFamily: tokens.typography.mono, fontSize: 10.5, letterSpacing: '0.08em',
        color: originColor, display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 2, background: originColor }} aria-hidden />
        {originLabel(rec.origin)}
      </div>

      <Menu open={open} onClose={() => setOpen(false)} aria-label="card actions menu">
        <MenuItem onSelect={() => setStatus('shelved')}>Keep on shelf</MenuItem>
        <MenuItem onSelect={() => setStatus('queued')}>Queue for later</MenuItem>
        <MenuItem onSelect={() => setStatus('archived')}>Archive</MenuItem>
      </Menu>
    </Card>
  );
};
