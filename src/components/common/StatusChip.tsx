import React from 'react';
import Chip from '@mui/material/Chip';
import type { ChipProps } from '@mui/material/Chip';

/**
 * The design system's single source of truth for status → color. Replaces the
 * per-component maps (`WorkflowRunPanel`'s STATUS_COLOR, `RoundCard`'s action
 * map, `ScoreRunCard`'s threshold, and ~25 inline `<Chip color=…>` sites).
 *
 * Colors resolve through MUI's palette, which is derived from design tokens
 * (`theme.palette.success` ← `tokens.color.status.success`), so a StatusChip
 * stays contrast-safe and is the one place to rework if the app leaves MUI.
 */

/** Canonical semantic tones. */
export type StatusTone = 'success' | 'warning' | 'error' | 'info' | 'pending' | 'neutral';

const TONE_COLOR: Record<StatusTone, NonNullable<ChipProps['color']>> = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
  pending: 'default',
  neutral: 'default',
};

const TONE_LABEL: Record<StatusTone, string> = {
  success: 'Complete',
  warning: 'Needs input',
  error: 'Failed',
  info: 'In progress',
  pending: 'Pending',
  neutral: '',
};

/** Maps domain status strings (across workflows/projects/tasks) to a tone. */
const STATUS_TONE: Record<string, StatusTone> = {
  // success
  completed: 'success',
  complete: 'success',
  approved: 'success',
  passed: 'success',
  proceed: 'success',
  success: 'success',
  // error
  failed: 'error',
  failure: 'error',
  error: 'error',
  rejected: 'error',
  // info / in-flight
  in_progress: 'info',
  running: 'info',
  active: 'info',
  info: 'info',
  // warning / needs attention
  awaiting_input: 'warning',
  needs_input: 'warning',
  clarify: 'warning',
  refine: 'warning',
  warning: 'warning',
  // pending / idle
  pending: 'pending',
  queued: 'pending',
  // neutral
  default: 'neutral',
  neutral: 'neutral',

  // ── App-domain statuses (workflows / projects / advisor) ──
  // workflow lifecycle
  live: 'success',
  draft: 'warning',
  archived: 'neutral',
  // project lifecycle
  idea: 'neutral',
  developing: 'info', // was `primary`; info matches its in-progress meaning
  executing: 'success',
  // advisor review outcome
  clear: 'success',
  needs_work: 'warning',
  blocked: 'error',
};

/** Resolves a domain status (or a tone) to a canonical tone. */
export function statusToTone(status: string): StatusTone {
  return STATUS_TONE[status.trim().toLowerCase()] ?? 'neutral';
}

export interface StatusChipProps {
  /** A domain status (e.g. "in_progress", "completed") or a tone directly. */
  status: string;
  /** Overrides the default label for the resolved tone. */
  label?: string;
  size?: 'small' | 'medium';
  variant?: 'filled' | 'outlined';
  icon?: React.ReactElement;
  /** Passed through to the underlying Chip for one-off layout tweaks. */
  sx?: ChipProps['sx'];
}

export const StatusChip: React.FC<StatusChipProps> = ({
  status,
  label,
  size = 'small',
  variant = 'outlined',
  icon,
  sx,
}) => {
  const tone = statusToTone(status);
  const text = label ?? (TONE_LABEL[tone] || status);
  return (
    <Chip
      label={text}
      color={TONE_COLOR[tone]}
      size={size}
      variant={variant}
      {...(icon ? { icon } : {})}
      {...(sx ? { sx } : {})}
    />
  );
};
