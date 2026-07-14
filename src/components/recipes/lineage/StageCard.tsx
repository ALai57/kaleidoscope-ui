import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Details, Summary, Twisty, Handoff, ErrBox } from './lineageStyled';
import { LlmCallView } from './LlmCallView';
import { RawScrapeInspector, ExtractedFactsInspector, RecipeContentInspector } from './inspectors';
import { stageHues, type StageView } from './lineageView';
import type { RecipeLineage } from '../../../types/lineage';

const Chevron: React.FC = () => (
  <Twisty>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 2 8 6 4 10" />
    </svg>
  </Twisty>
);

export const StageCard: React.FC<{
  stage: StageView;
  lineage: RecipeLineage;
  slug: string;
  token?: string | undefined;
  isLast: boolean;
}> = ({ stage, lineage, slug, token, isLast }) => {
  const theme = useTheme();
  const { color, typography, radius } = theme.tokens;
  const hue = stageHues(color.categorical)[stage.key];
  const dim = stage.status === 'not-reached';
  const nodeColor = dim ? color.text.disabled : hue;
  const [rawOpen, setRawOpen] = React.useState(false);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '30px 1fr', gap: '0 16px' }}>
      {/* rail + node */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <span aria-hidden style={{ position: 'absolute', top: 22, bottom: isLast ? 'auto' : 0,
          height: isLast ? 22 : undefined, width: 2, background: color.border.subtle }} />
        <span aria-hidden style={{ position: 'relative', zIndex: 1, marginTop: 20, width: 14, height: 14,
          borderRadius: '50%', border: `2px solid ${nodeColor}`, background: color.surface.base,
          boxShadow: dim ? 'none' : `0 0 10px color-mix(in srgb, ${hue} 55%, transparent)` }} />
      </div>

      <div>
        <div style={{ background: color.surface.raised, border: `1px solid ${color.border.subtle}`,
          borderLeft: `3px solid ${nodeColor}`, borderRadius: radius.lg, margin: '10px 0',
          overflow: 'hidden', opacity: dim ? 0.85 : 1 }}>
          {/* header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px 14px',
            flexWrap: 'wrap' }}>
            <span style={{ fontFamily: typography.mono, fontSize: 15, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', color: nodeColor }}>
              {stage.label}
            </span>
            {stage.status === 'ok' && (
              <>
                <span style={{ fontFamily: typography.mono, fontSize: 11, color: color.text.disabled }}>produced</span>
                <span style={{ fontFamily: typography.mono, fontSize: 11, color: color.text.primary, fontWeight: 600 }}>
                  {stage.artifact}
                </span>
              </>
            )}
            {stage.status === 'not-reached' && (
              <span style={{ fontFamily: typography.mono, fontSize: 11, color: color.text.disabled }}>
                not reached
              </span>
            )}
            {stage.status !== 'not-reached' && stage.technique && (
              <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: typography.mono, fontSize: 11, fontWeight: 600, padding: '3px 9px 3px 8px',
                borderRadius: radius.sm, color: nodeColor,
                border: `1px solid color-mix(in srgb, ${nodeColor} 45%, transparent)`,
                background: `color-mix(in srgb, ${nodeColor} 15%, transparent)` }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: nodeColor }} />
                :{stage.technique}
              </span>
            )}
          </div>

          {/* failure detail */}
          {stage.status === 'failed' && stage.errorDetail && (
            <ErrBox>
              <div>
                <div style={{ color: color.status.error, fontWeight: 700, textTransform: 'uppercase',
                  fontSize: 11, letterSpacing: '0.04em' }}>
                  {stage.errorDetail.reason ?? 'error'}
                </div>
                {stage.errorDetail.message}
              </div>
            </ErrBox>
          )}

          {/* artifact inspector — only for stages that ran */}
          {stage.status === 'ok' && (
            <Details onToggle={(e) => { if (stage.key === 'acquire') setRawOpen((e.target as HTMLDetailsElement).open); }}>
              <Summary>
                <Chevron />
                <span style={{ color: color.text.primary, fontWeight: 600, textTransform: 'uppercase',
                  letterSpacing: '0.1em' }}>{stage.artifact}</span>
              </Summary>
              <div style={{ padding: '4px 18px 18px' }}>
                {stage.key === 'acquire' && (
                  <RawScrapeInspector slug={slug} token={token} open={rawOpen}
                    bytes={lineage.raw.content_bytes} />
                )}
                {stage.key === 'parse' && lineage.run.facts && (
                  <ExtractedFactsInspector facts={lineage.run.facts} />
                )}
                {stage.key === 'normalize' && lineage.run.content && (
                  <RecipeContentInspector content={lineage.run.content} />
                )}
              </div>
            </Details>
          )}

          {/* llm calls */}
          {stage.llmCalls.length > 0 && (
            <Details>
              <Summary>
                <Chevron />
                <span style={{ color: color.text.primary, fontWeight: 600, textTransform: 'uppercase',
                  letterSpacing: '0.1em' }}>
                  Model call{stage.llmCalls.length > 1 ? `s · ${stage.llmCalls.length}` : ''}
                </span>
              </Summary>
              <div style={{ padding: '4px 18px 18px' }}>
                {stage.llmCalls.map((c, i) => <LlmCallView key={i} call={c} />)}
              </div>
            </Details>
          )}
        </div>

        {/* handoff pill (not after the last stage) */}
        {!isLast && stage.status === 'ok' && (
          <Handoff>
            <span className="pill"><span className="t">{stage.artifact}</span></span>
            <span>→</span>
          </Handoff>
        )}
      </div>
    </div>
  );
};
