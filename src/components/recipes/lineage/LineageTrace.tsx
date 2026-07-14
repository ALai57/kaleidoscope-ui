import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { StatTile, WarnBox } from './lineageStyled';
import { RefractionBanner } from './RefractionBanner';
import { StageCard } from './StageCard';
import {
  buildStages, tokenTotals, droppedIngredientLines, stagesRunCount, STAGE_ORDER,
} from './lineageView';
import type { RecipeLineage } from '../../../types/lineage';

const Field: React.FC<{ k: string; children: React.ReactNode; muted?: boolean }> = ({ k, children, muted }) => {
  const { color, typography } = useTheme().tokens;
  return (
    <div style={{ display: 'grid', gap: 3 }}>
      <span style={{ fontFamily: typography.mono, fontSize: 9.5, letterSpacing: '0.16em',
        textTransform: 'uppercase', color: color.text.disabled }}>{k}</span>
      <span style={{ fontFamily: typography.mono, fontSize: 12.5,
        color: muted ? color.text.secondary : color.text.primary, fontVariantNumeric: 'tabular-nums' }}>
        {children}
      </span>
    </div>
  );
};

const fmt = (n: number) => n.toLocaleString('en-US');

export const LineageTrace: React.FC<{ lineage: RecipeLineage; slug: string; token?: string | undefined }> = ({
  lineage, slug, token,
}) => {
  const { color, typography } = useTheme().tokens;
  const stages = buildStages(lineage);
  const tokens = tokenTotals(lineage.run.llm_calls);
  const dropped = droppedIngredientLines(lineage);
  const { raw, run } = lineage;

  return (
    <div style={{ borderTop: `1px solid ${color.border.subtle}`, paddingTop: 4 }}>
      {/* run header */}
      <div style={{ display: 'flex', gap: '14px 26px', flexWrap: 'wrap', alignItems: 'center',
        padding: '20px 22px 18px', borderBottom: `1px solid ${color.border.subtle}` }}>
        <Field k="Outcome">{run.outcome}</Field>
        <Field k="Source" muted>{raw.source_kind} · HTTP {raw.http_status ?? '—'}</Field>
        <Field k="Request → Final URL" muted>
          {raw.request_url ?? '—'}{raw.final_url && raw.final_url !== raw.request_url ? ` → ${raw.final_url}` : ''}
        </Field>
        <div style={{ flex: 1 }} />
        <Field k="Pipeline version">{run.pipeline_version}</Field>
        <Field k="Run started" muted>{new Date(run.created_at).toISOString().replace('T', ' ').slice(0, 19)}Z</Field>
        <Field k="Run id" muted>{run.id.slice(0, 8)}…</Field>
      </div>

      <RefractionBanner techniques={run.techniques} bytes={raw.content_bytes} />

      {/* stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: 12, padding: '8px 22px 22px' }}>
        <Stat label="Stages run" value={`${stagesRunCount(stages)}`} suffix=" / 3" />
        <Stat label="Model calls" value={`${run.llm_calls.length}`} />
        <Stat label="Tokens (in / out)" value={fmt(tokens.input)} suffix={` / ${fmt(tokens.output)}`} />
        <Stat label="Header lines dropped" value={`${dropped}`}
          color={dropped > 0 ? color.status.warning : undefined} />
      </div>

      {/* spine */}
      <div style={{ padding: '6px 22px 8px' }}>
        {stages.map((stage, i) => (
          <StageCard key={stage.key} stage={stage} lineage={lineage} slug={slug} token={token}
            isLast={i === STAGE_ORDER.length - 1} />
        ))}
      </div>

      {/* warnings */}
      {run.warnings.map((w, i) => (
        <WarnBox key={i}>
          <span style={{ color: color.status.warning, fontWeight: 600, fontFamily: typography.mono }}>⚠</span>
          <span>{w}</span>
        </WarnBox>
      ))}
    </div>
  );
};

const Stat: React.FC<{ label: string; value: string; suffix?: string; color?: string | undefined }> = ({
  label, value, suffix, color: valueColor,
}) => {
  const { color, typography } = useTheme().tokens;
  return (
    <StatTile>
      <div style={{ fontFamily: typography.mono, fontSize: 10, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: color.text.disabled }}>{label}</div>
      <div style={{ fontFamily: typography.mono, fontSize: 25, fontWeight: 700, marginTop: 6,
        color: valueColor ?? color.text.primary, fontVariantNumeric: 'tabular-nums' }}>
        {value}{suffix && <small style={{ fontSize: 13, color: color.text.disabled, fontWeight: 600 }}>{suffix}</small>}
      </div>
    </StatTile>
  );
};
