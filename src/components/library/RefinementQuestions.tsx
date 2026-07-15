import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { TextInput, Button } from '../prism';

interface Props {
  questions: string[];
  onSubmit: (answers: string[]) => void;
  submitting?: boolean;
}

export const RefinementQuestions: React.FC<Props> = ({ questions, onSubmit, submitting }) => {
  const { tokens } = useTheme();
  const [answers, setAnswers] = React.useState<string[]>(() => questions.map(() => ''));

  const setAnswer = (i: number, v: string): void =>
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? v : a)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {questions.map((q, i) => (
        <label key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ color: tokens.color.text.secondary, fontSize: 13 }}>{q}</span>
          <TextInput
            value={answers[i]}
            onChange={(e) => setAnswer(i, e.target.value)}
            placeholder="Your answer…"
          />
        </label>
      ))}
      <div>
        <Button variant="primary" disabled={submitting} onClick={() => onSubmit(answers)}>
          {submitting ? 'Refining…' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};
