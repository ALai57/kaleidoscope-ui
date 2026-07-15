import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { TextInput, Chip, Button } from '../prism';
import { useUpdateInterest } from './hooks';
import type { Interest, MediaFormat, TasteProfile } from '../../types/interest';

const ALL_FORMATS: MediaFormat[] = [
  'podcast', 'article', 'show', 'video', 'book', 'paper', 'newsletter', 'course',
];

interface Props {
  interest: Interest;
  token: string | undefined;
  onSaved?: () => void;
}

export const TasteProfileEditor: React.FC<Props> = ({ interest, token, onSaved }) => {
  const { tokens } = useTheme();
  const tp = interest.taste_profile;
  const [formats, setFormats] = React.useState<MediaFormat[]>(tp.formats ?? []);
  const [sources, setSources] = React.useState<string[]>(tp.trusted_sources ?? []);
  const [novelty, setNovelty] = React.useState<number>(tp.novelty_ratio ?? 0.5);
  const [sourceDraft, setSourceDraft] = React.useState('');
  const update = useUpdateInterest(token);

  const purple = tokens.color.categorical[1];
  const amber = tokens.color.categorical[2];

  const addSource = (): void => {
    const s = sourceDraft.trim();
    if (s && !sources.includes(s)) setSources([...sources, s]);
    setSourceDraft('');
  };

  const toggleFormat = (f: MediaFormat): void =>
    setFormats(formats.includes(f) ? formats.filter((x) => x !== f) : [...formats, f]);

  const save = (): void => {
    const taste_profile: TasteProfile = {
      ...tp, formats, trusted_sources: sources, novelty_ratio: novelty,
    };
    update.mutate({ id: interest.id, body: { taste_profile } }, { onSuccess: () => onSaved?.() });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 640 }}>
      <section>
        <h3 style={eyebrow(tokens)}>KEYWORDS</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(tp.keywords ?? []).map((k) => (
            <Chip as="span" key={k} pressed={false}>{k}</Chip>
          ))}
        </div>
      </section>

      <section>
        <h3 style={eyebrow(tokens)}>FORMATS</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {ALL_FORMATS.map((f) => (
            <Chip key={f} pressed={formats.includes(f)} onClick={() => toggleFormat(f)}>{f}</Chip>
          ))}
        </div>
      </section>

      <section>
        <h3 style={eyebrow(tokens)}>SOURCES</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
          {sources.map((s) => (
            <Chip key={s} pressed onClick={() => setSources(sources.filter((x) => x !== s))}>
              <span>{s}</span>
              <span aria-hidden>✕</span>
            </Chip>
          ))}
        </div>
        <TextInput
          aria-label="add trusted source"
          placeholder="Add a trusted source…"
          value={sourceDraft}
          onChange={(e) => setSourceDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSource(); } }}
        />
      </section>

      <section>
        <h3 style={eyebrow(tokens)}>NOVELTY DIAL</h3>
        <p style={{ color: tokens.color.text.secondary, fontSize: 12.5, marginBottom: 8 }}>
          {Math.round((1 - novelty) * 100)}% trusted · {Math.round(novelty * 100)}% new sources
          <br />
          <span style={{ color: tokens.color.text.disabled }}>
            Takes effect on your next acquisition.
          </span>
        </p>
        <input
          type="range"
          aria-label="novelty ratio"
          min={0}
          max={1}
          step={0.05}
          value={novelty}
          onChange={(e) => setNovelty(Number(e.target.value))}
          style={{
            width: '100%',
            accentColor: amber,
            background: `linear-gradient(90deg, ${purple}, ${amber})`,
          }}
        />
      </section>

      <div>
        <Button variant="primary" onClick={save} disabled={update.isPending}>
          {update.isPending ? 'Saving…' : 'Save profile'}
        </Button>
      </div>
    </div>
  );
};

function eyebrow(tokens: { typography: { mono: string }; color: { text: { secondary: string } } }): React.CSSProperties {
  return {
    fontFamily: tokens.typography.mono, fontSize: 11, letterSpacing: '0.1em',
    color: tokens.color.text.secondary, marginBottom: 10,
  };
}
