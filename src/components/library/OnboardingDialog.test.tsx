import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { OnboardingDialog } from './OnboardingDialog';
import { renderWithProviders } from './testHelpers';

const server = setupServer(
  http.post('/interests', () => HttpResponse.json({ id: 'i9', intent: 'Jazz', 'taste-profile': {}, 'user-id': 'u', 'created-at': 'x', 'updated-at': 'x' })),
  http.post('/interests/i9/curate', () =>
    // First curate asks for refinement; used by the clarify test.
    HttpResponse.json({ status: 'awaiting_input', 'run-id': 'run1', 'step-run-id': 'step1', questions: ['Which era?'] })),
  http.post('/interests/i9/curation-runs/run1/steps/step1/respond', () =>
    HttpResponse.json({ status: 'completed', 'run-id': 'run1', summary: { total: 6, trusted: 3, novel: 3 }, shelved: [] })),
);
beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers(); });
afterAll(() => server.close());

describe('OnboardingDialog', () => {
  it('creates an interest, runs the clarify branch, then reports created on completion', async () => {
    const onCreated = vi.fn();
    renderWithProviders(<OnboardingDialog open onClose={vi.fn()} token={undefined} onCreated={onCreated} />);
    await userEvent.type(screen.getByLabelText(/what do you want to follow/i), 'Modern jazz history');
    await userEvent.click(screen.getByRole('button', { name: /create shelf/i }));

    // clarify step appears
    expect(await screen.findByText('Which era?')).toBeInTheDocument();
    await userEvent.type(screen.getByRole('textbox'), 'post-1959');
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => expect(onCreated).toHaveBeenCalledWith('i9'));
  });

  it('skips refinement when curate completes immediately', async () => {
    server.use(
      http.post('/interests/i9/curate', () =>
        HttpResponse.json({ status: 'completed', 'run-id': 'run1', summary: { total: 6, trusted: 3, novel: 3 }, shelved: [] })),
    );
    const onCreated = vi.fn();
    renderWithProviders(<OnboardingDialog open onClose={vi.fn()} token={undefined} onCreated={onCreated} />);
    await userEvent.type(screen.getByLabelText(/what do you want to follow/i), 'Jazz');
    await userEvent.click(screen.getByRole('button', { name: /create shelf/i }));
    await waitFor(() => expect(onCreated).toHaveBeenCalledWith('i9'));
  });
});
