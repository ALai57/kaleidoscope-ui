import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Button } from '../prism';
import { RefinementQuestions } from './RefinementQuestions';
import { useCurate, useRespondToStep } from './hooks';
import type { CurationResult } from '../../types/interest';

interface Props {
  interestId: string;
  token: string | undefined;
}

const STAGES = ['Discover', 'Relevance Score', 'Shelve'] as const;

type View =
  | { name: 'idle' }
  | { name: 'running' }
  | { name: 'refine'; runId: string; stepRunId: string; questions: string[] }
  | { name: 'done'; total: number; trusted: number; novel: number };

export const AcquisitionsPipeline: React.FC<Props> = ({ interestId, token }) => {
  const { tokens } = useTheme();
  const [view, setView] = React.useState<View>({ name: 'idle' });
  const curateM = useCurate(token);
  const respond = useRespondToStep(token);
  const purple = tokens.color.categorical[1]!;
  const amber = tokens.color.categorical[2]!;

  const apply = (result: CurationResult): void => {
    if (result.status === 'awaiting_input') {
      setView({ name: 'refine', runId: result.run_id, stepRunId: result.step_run_id, questions: result.questions });
    } else {
      setView({ name: 'done', ...result.summary });
    }
  };

  const run = (): void => {
    setView({ name: 'running' });
    curateM.mutate({ id: interestId }, { onSuccess: apply });
  };

  const submitAnswers = (answers: string[]): void => {
    if (view.name !== 'refine') return;
    setView({ name: 'running' });
    respond.mutate(
      { interestId, runId: view.runId, stepRunId: view.stepRunId, answers },
      { onSuccess: apply }
    );
  };

  const active = view.name === 'running';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
        {STAGES.map((stage, i) => (
          <React.Fragment key={stage}>
            <div style={{
              flex: 1, padding: '16px 18px', borderRadius: tokens.radius.lg,
              background: tokens.color.surface.raised,
              border: `1px solid ${active ? tokens.color.brand.primary : tokens.color.border.subtle}`,
              transition: `border-color ${tokens.motion.duration.base}ms ${tokens.motion.easing.springSettle}`,
              opacity: active ? 1 : 0.85,
            }}>
              <div style={{ fontFamily: tokens.typography.mono, fontSize: 11, letterSpacing: '0.08em', color: tokens.color.text.secondary }}>
                STEP {i + 1}
              </div>
              <div style={{ marginTop: 6, color: tokens.color.text.primary, fontWeight: 600 }}>{stage}</div>
              <div style={{ marginTop: 8, fontSize: 12, color: tokens.color.text.secondary }}>
                {active ? 'Librarian at work…' : 'Idle'}
              </div>
            </div>
            {i < STAGES.length - 1 && (
              <div aria-hidden style={{ alignSelf: 'center', color: tokens.color.text.disabled }}>→</div>
            )}
          </React.Fragment>
        ))}
      </div>

      {view.name === 'done' && (
        <div style={{ fontFamily: tokens.typography.mono, fontSize: 14, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <span style={{ color: tokens.color.text.primary }}>{view.total} shelved</span>
          <span aria-hidden>·</span>
          <span style={{ color: purple }}>{view.trusted} trusted</span>
          <span aria-hidden>·</span>
          <span style={{ color: amber }}>{view.novel} novel</span>
        </div>
      )}

      {view.name === 'refine' && (
        <RefinementQuestions
          questions={view.questions}
          submitting={respond.isPending}
          onSubmit={submitAnswers}
        />
      )}

      {view.name !== 'refine' && (
        <div>
          <Button variant="primary" onClick={run} disabled={active}>
            {active ? 'Running…' : 'Run acquisition'}
          </Button>
        </div>
      )}
    </div>
  );
};
