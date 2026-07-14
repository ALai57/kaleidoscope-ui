import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@mui/material/styles';
import { CopyButton } from '../../prism';
import { IoBlock, IoHead, Role, Pre } from './lineageStyled';
import { formatBytes } from './lineageView';
import { getRecipeLineage } from '../../../api/recipes';
import type { LineageExtractedFacts } from '../../../types/lineage';
import type { RecipeContent } from '../../../types/recipe';

/** ACQUIRE: the raw scrape body. Lazily fetched with include-raw only when open. */
export const RawScrapeInspector: React.FC<{
  slug: string;
  token?: string | undefined;
  open: boolean;
  bytes: number;
}> = ({ slug, token, open, bytes }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['recipe-lineage', slug, 'raw'],
    queryFn: () => getRecipeLineage(slug, true, token),
    enabled: open,
    staleTime: Infinity,
  });
  const body = data?.raw.raw_content ?? '';
  return (
    <IoBlock>
      <IoHead>
        <Role>Raw scrape · {formatBytes(bytes)}</Role>
        {body && <CopyButton text={body} />}
      </IoHead>
      <Pre wrap>{isLoading ? 'Loading raw content…' : body || 'No raw content stored.'}</Pre>
    </IoBlock>
  );
};

const Lines: React.FC<{ items: string[]; ordered?: boolean }> = ({ items, ordered }) => {
  const theme = useTheme();
  const { color, typography } = theme.tokens;
  return (
    <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 4 }}>
      {(items ?? []).map((line, i) => (
        <li key={i} style={{ display: 'grid', gridTemplateColumns: '22px 1fr', gap: 8,
          fontFamily: typography.mono, fontSize: 12, color: color.text.primary, lineHeight: 1.5 }}>
          <span style={{ textAlign: 'right', color: color.text.disabled, fontSize: 10.5 }}>
            {ordered ? i : '▸'}
          </span>
          <span>{line}</span>
        </li>
      ))}
    </ol>
  );
};

const H4: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { color, typography } = useTheme().tokens;
  return (
    <h4 style={{ fontFamily: typography.mono, fontSize: 10.5, letterSpacing: '0.14em',
      textTransform: 'uppercase', color: color.text.disabled, margin: '0 0 8px' }}>
      {children}
    </h4>
  );
};

/** PARSE: extracted facts — ingredients, steps, signals, suggested labels. */
export const ExtractedFactsInspector: React.FC<{ facts: LineageExtractedFacts }> = ({ facts }) => {
  const { color, typography, radius } = useTheme().tokens;
  const ingredients = facts.ingredients ?? [];
  const steps = facts.steps ?? [];
  const sectionSignals = facts.section_signals ?? [];
  const labels = facts.labels ?? [];
  const chip = (text: string, i: number) => (
    <span key={i} style={{ fontFamily: typography.mono, fontSize: 11, color: color.categorical[1],
      background: `color-mix(in srgb, ${color.categorical[1]} 15%, transparent)`,
      border: `1px solid color-mix(in srgb, ${color.categorical[1]} 35%, transparent)`,
      borderRadius: radius.pill, padding: '2px 10px' }}>{text}</span>
  );
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div>
        <H4>Ingredients · {ingredients.length}</H4>
        <Lines items={ingredients} ordered />
      </div>
      <div>
        <H4>Steps · {steps.length}</H4>
        <Lines items={steps} ordered />
        {sectionSignals.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <H4>Section signals · {sectionSignals.length}</H4>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {sectionSignals.map(chip)}
            </div>
          </div>
        )}
        {labels.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <H4>Suggested labels · {labels.length}</H4>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {labels.map(chip)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/** NORMALIZE: the final RecipeContent — one block per paired section. */
export const RecipeContentInspector: React.FC<{ content: RecipeContent }> = ({ content }) => {
  const { color, typography, radius } = useTheme().tokens;
  const normalize = color.categorical[3];
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {(content.sections ?? []).map((s, i) => (
        <div key={i} style={{ border: `1px solid ${color.border.subtle}`, borderRadius: radius.md,
          background: color.surface.base, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px',
            background: `color-mix(in srgb, ${normalize} 15%, transparent)`,
            borderBottom: `1px solid ${color.border.subtle}` }}>
            <span style={{ fontFamily: typography.mono, fontSize: 12.5, fontWeight: 700,
              color: normalize }}>{s.name ?? 'Recipe'}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ padding: '12px 14px' }}>
              <H4>Ingredients</H4><Lines items={s.ingredients} />
            </div>
            <div style={{ padding: '12px 14px', borderLeft: `1px solid ${color.border.subtle}` }}>
              <H4>Steps</H4><Lines items={s.steps} ordered />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
