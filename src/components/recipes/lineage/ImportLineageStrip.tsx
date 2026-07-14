import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { styled, useTheme } from '@mui/material/styles';
import { getRecipeLineage } from '../../../api/recipes';
import { LineageTrace } from './LineageTrace';
import { modelCallSummary, relativeTime } from './lineageView';

const Wrap = styled('details')(({ theme }) => ({
  border: `1px solid ${theme.tokens.color.border.strong}`,
  borderRadius: theme.tokens.radius.lg,
  background: theme.tokens.color.surface.raised,
  overflow: 'hidden',
  margin: '18px 0',
}));

const Strip = styled('summary')(({ theme }) => {
  const { color, typography } = theme.tokens;
  return {
    listStyle: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '13px 18px',
    fontFamily: typography.mono,
    fontSize: 12,
    color: color.text.secondary,
    flexWrap: 'wrap',
    transition: 'background .18s',
    '&::-webkit-details-marker': { display: 'none' },
    '&:hover': { background: color.surface.sunken },
    '&:focus-visible': { outline: `2px solid ${color.brand.primary}`, outlineOffset: 2 },
  };
});

export const ImportLineageStrip: React.FC<{ slug: string; token?: string | undefined }> = ({ slug, token }) => {
  const { color } = useTheme().tokens;
  const brand = color.brand;
  const [open, setOpen] = React.useState(false);
  const { data: lineage, isLoading, isError } = useQuery({
    queryKey: ['recipe-lineage', slug],
    queryFn: () => getRecipeLineage(slug, false, token),
    staleTime: 60_000,
  });

  if (isError) return null; // backend 404s non-writers / no-run — hide the strip

  const t = lineage?.run.techniques;
  const calls = lineage ? modelCallSummary(lineage.run.llm_calls) : { count: 0, label: '' };

  return (
    <Wrap open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
      <Strip>
        <span style={{ color: brand.primary, display: 'inline-flex' }} aria-hidden>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2 L9 6.5 L4 11" /></svg>
        </span>
        {isLoading || !lineage ? (
          <span>Loading import lineage…</span>
        ) : (
          <>
            <span style={{ color: color.text.primary, fontWeight: 600 }}>{lineage.run.outcome}</span>
            <span style={{ color: color.text.disabled }}>·</span>
            <span>
              {[t?.acquire, t?.parse, t?.normalize].filter(Boolean).join(' → ')}
            </span>
            <span style={{ color: color.text.disabled }}>·</span>
            <span>{calls.count} model call{calls.count === 1 ? '' : 's'}{calls.label && ` · ${calls.label}`}</span>
            <span style={{ color: color.text.disabled }}>·</span>
            <span>imported {relativeTime(lineage.run.created_at)}</span>
            <span style={{ marginLeft: 'auto', color: brand.primary, letterSpacing: '0.08em',
              textTransform: 'uppercase', fontSize: 10.5, fontWeight: 600 }}>
              Import lineage
            </span>
          </>
        )}
      </Strip>
      {open && lineage && <LineageTrace lineage={lineage} slug={slug} token={token} />}
    </Wrap>
  );
};
