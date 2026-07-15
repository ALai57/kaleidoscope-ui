import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Chip } from '../prism';
import { CatalogCard } from './CatalogCard';
import { useShelf } from './hooks';

interface Props {
  interestId: string;
  token: string | undefined;
}

export const ShelfView: React.FC<Props> = ({ interestId, token }) => {
  const { tokens } = useTheme();
  const [kind, setKind] = React.useState<string | null>(null);
  // Unfiltered fetch drives the chip row so chips don't vanish when a filter is active.
  const all = useShelf(interestId, { status: 'shelved' }, token);
  const filtered = useShelf(
    interestId,
    kind ? { status: 'shelved', kind } : { status: 'shelved' },
    token
  );

  const kinds = React.useMemo(
    () => Array.from(new Set((all.data ?? []).map((r) => r.kind))).sort(),
    [all.data]
  );
  const items = filtered.data ?? [];

  return (
    <div>
      {kinds.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          <Chip pressed={kind === null} onClick={() => setKind(null)}>ALL</Chip>
          {kinds.map((k) => (
            <Chip key={k} pressed={kind === k} onClick={() => setKind(kind === k ? null : k)}>
              {k}
            </Chip>
          ))}
        </div>
      )}

      {items.length === 0 ? (
        <p style={{ color: tokens.color.text.secondary, fontFamily: tokens.typography.mono, fontSize: 13 }}>
          This shelf is empty — run an acquisition to curate it.
        </p>
      ) : (
        <div style={{
          display: 'grid', gap: 16,
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        }}>
          {items.map((rec) => (
            <CatalogCard key={rec.id} rec={rec} interestId={interestId} token={token} />
          ))}
        </div>
      )}
    </div>
  );
};
