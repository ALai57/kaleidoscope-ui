import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RefinementQuestions } from './RefinementQuestions';
import { renderWithProviders } from './testHelpers';

describe('RefinementQuestions', () => {
  it('renders one field per question and submits aligned answers', async () => {
    const onSubmit = vi.fn();
    renderWithProviders(
      <RefinementQuestions
        questions={['Which era of jazz?', 'Prefer theory or history?']}
        onSubmit={onSubmit}
      />
    );
    const fields = screen.getAllByRole('textbox');
    expect(fields).toHaveLength(2);
    await userEvent.type(fields[0]!, 'post-1959');
    await userEvent.type(fields[1]!, 'history');
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(onSubmit).toHaveBeenCalledWith(['post-1959', 'history']);
  });

  it('disables the submit button while submitting', () => {
    renderWithProviders(
      <RefinementQuestions questions={['Q?']} onSubmit={vi.fn()} submitting />
    );
    expect(screen.getByRole('button', { name: /refining/i })).toBeDisabled();
  });
});
