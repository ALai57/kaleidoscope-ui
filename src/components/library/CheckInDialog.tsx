import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Dialog, Button } from '../prism';
import { useShelf, useUpdateRecStatus, useUpdateInterest } from './hooks';
import type { Interest, Recommendation } from '../../types/interest';

interface Props {
  open: boolean;
  onClose: () => void;
  interest: Interest;
  token: string | undefined;
}

export const CheckInDialog: React.FC<Props> = ({ open, onClose, interest, token }) => {
  const { tokens } = useTheme();
  const shelf = useShelf(interest.id, { status: 'shelved' }, token);
  const updateStatus = useUpdateRecStatus(interest.id, token);
  const updateInterest = useUpdateInterest(token);
  const [promotable, setPromotable] = React.useState<string | null>(null);

  const sample: Recommendation[] = (shelf.data ?? []).slice(0, 5);

  const landed = (rec: Recommendation): void => {
    updateStatus.mutate({ recId: rec.id, status: 'shelved' });
    const trusted = interest.taste_profile.trusted_sources ?? [];
    if (rec.origin === 'novel' && !trusted.includes(rec.source)) {
      setPromotable(rec.source);
    }
  };

  const notForMe = (rec: Recommendation): void =>
    updateStatus.mutate({ recId: rec.id, status: 'archived' });

  const promote = (source: string): void => {
    const trusted = interest.taste_profile.trusted_sources ?? [];
    updateInterest.mutate({
      id: interest.id,
      body: { taste_profile: { ...interest.taste_profile, trusted_sources: [...trusted, source] } },
    });
    setPromotable(null);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Check-in — which of these landed?"
      actions={<Button variant="ghost" onClick={onClose}>Done</Button>}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {sample.map((rec) => (
          <div key={rec.id} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            padding: '10px 12px', borderRadius: tokens.radius.sm, background: tokens.color.surface.raised,
          }}>
            <span style={{ color: tokens.color.text.primary }}>{rec.title}</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="subtle" onClick={() => landed(rec)}>Landed</Button>
              <Button variant="ghost" onClick={() => notForMe(rec)}>Not for me</Button>
            </div>
          </div>
        ))}
        {promotable && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: tokens.color.text.secondary }}>
            <span>Trust {promotable} from now on?</span>
            <Button variant="primary" onClick={() => promote(promotable)}>
              Promote {promotable}
            </Button>
          </div>
        )}
      </div>
    </Dialog>
  );
};
