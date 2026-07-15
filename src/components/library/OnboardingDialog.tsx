import * as React from 'react';
import { Dialog, TextInput, Button } from '../prism';
import { RefinementQuestions } from './RefinementQuestions';
import { useCreateInterest, useCurate, useRespondToStep } from './hooks';
import type { CurationResult } from '../../types/interest';

interface Props {
  open: boolean;
  onClose: () => void;
  token: string | undefined;
  onCreated: (interestId: string) => void;
}

type Phase =
  | { name: 'intent' }
  | { name: 'refine'; interestId: string; runId: string; stepRunId: string; questions: string[] };

export const OnboardingDialog: React.FC<Props> = ({ open, onClose, token, onCreated }) => {
  const [intent, setIntent] = React.useState('');
  const [phase, setPhase] = React.useState<Phase>({ name: 'intent' });
  const create = useCreateInterest(token);
  const curateM = useCurate(token);
  const respond = useRespondToStep(token);

  const reset = (): void => { setIntent(''); setPhase({ name: 'intent' }); };
  const close = (): void => { reset(); onClose(); };

  const handleResult = (interestId: string, result: CurationResult): void => {
    if (result.status === 'awaiting_input') {
      setPhase({
        name: 'refine', interestId, runId: result.run_id,
        stepRunId: result.step_run_id, questions: result.questions,
      });
    } else {
      reset();
      onCreated(interestId);
    }
  };

  const start = (): void => {
    create.mutate({ intent }, {
      onSuccess: (interest) => {
        curateM.mutate({ id: interest.id }, {
          onSuccess: (result) => handleResult(interest.id, result),
        });
      },
    });
  };

  const submitAnswers = (answers: string[]): void => {
    if (phase.name !== 'refine') return;
    respond.mutate(
      { interestId: phase.interestId, runId: phase.runId, stepRunId: phase.stepRunId, answers },
      { onSuccess: (result) => handleResult(phase.interestId, result) }
    );
  };

  const busy = create.isPending || curateM.isPending;

  return (
    <Dialog
      open={open}
      onClose={close}
      title="Add an interest"
      actions={phase.name === 'intent'
        ? <>
            <Button variant="ghost" onClick={close}>Cancel</Button>
            <Button variant="primary" onClick={start} disabled={!intent.trim() || busy}>
              {busy ? 'Curating…' : 'Create shelf'}
            </Button>
          </>
        : <Button variant="ghost" onClick={close}>Cancel</Button>}
    >
      {phase.name === 'intent' ? (
        <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span>What do you want to follow?</span>
          <TextInput
            aria-label="what do you want to follow"
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            placeholder="e.g. investigative journalism about tech and power"
          />
        </label>
      ) : (
        <RefinementQuestions
          questions={phase.questions}
          submitting={respond.isPending}
          onSubmit={submitAnswers}
        />
      )}
    </Dialog>
  );
};
