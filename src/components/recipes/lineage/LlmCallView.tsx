import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { CopyButton } from '../../prism';
import { IoBlock, IoHead, Role, Pre } from './lineageStyled';
import type { LlmCall } from '../../../types/lineage';

const IoSection: React.FC<{ kind: 'sys' | 'user' | 'asst'; label: string; text: string }> = ({
  kind, label, text,
}) => (
  <IoBlock>
    <IoHead>
      <Role kind={kind}>{label}</Role>
      <CopyButton text={text} />
    </IoHead>
    <Pre wrap>{text}</Pre>
  </IoBlock>
);

const fmt = (n: number) => n.toLocaleString('en-US');

export const LlmCallView: React.FC<{ call: LlmCall }> = ({ call }) => {
  const theme = useTheme();
  const { color, typography, radius, border } = {
    ...theme.tokens, border: theme.tokens.color.border,
  };
  const usage = call.response.usage;
  const responseText = (call.response.content ?? [])
    .map((c) => c.text)
    .filter(Boolean)
    .join('\n');

  return (
    <div style={{
      background: color.surface.sunken,
      border: `1px solid ${border.subtle}`,
      borderRadius: radius.md,
      overflow: 'hidden',
      marginTop: 12,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px',
        borderBottom: `1px solid ${border.subtle}`, flexWrap: 'wrap',
        fontFamily: typography.mono,
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em',
          textTransform: 'uppercase', color: color.categorical[1] }}>
          {call.purpose}
        </span>
        <span style={{ fontSize: 11, color: color.text.secondary, background: color.surface.raised,
          border: `1px solid ${border.subtle}`, borderRadius: radius.pill, padding: '2px 10px' }}>
          {call.model}
        </span>
        {usage && (
          <span style={{ marginLeft: 'auto', fontSize: 11, color: color.text.disabled,
            fontVariantNumeric: 'tabular-nums' }}>
            {call.request.max_tokens != null && <><b style={{ color: color.text.secondary }}>max_tokens</b> {fmt(call.request.max_tokens)} · </>}
            <b style={{ color: color.text.secondary }}>in</b> {fmt(usage.input_tokens)} ·{' '}
            <b style={{ color: color.text.secondary }}>out</b> {fmt(usage.output_tokens)}
          </span>
        )}
      </div>

      <div style={{ padding: 14, display: 'grid', gap: 14 }}>
        {call.request.system && (
          <IoSection kind="sys" label="System prompt" text={call.request.system} />
        )}
        {call.request.messages.map((m, i) => (
          <IoSection key={i} kind="user" label={`${m.role} message`} text={m.content} />
        ))}
        {responseText && <IoSection kind="asst" label="Response" text={responseText} />}
      </div>
    </div>
  );
};
