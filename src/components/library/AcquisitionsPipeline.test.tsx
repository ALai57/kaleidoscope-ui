import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { AcquisitionsPipeline } from './AcquisitionsPipeline';
import { renderWithProviders } from './testHelpers';

const server = setupServer(
  http.post('/interests/i1/curate', () =>
    HttpResponse.json({ status: 'completed', 'run-id': 'run1', summary: { total: 6, trusted: 3, novel: 3 }, shelved: [] })),
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('AcquisitionsPipeline', () => {
  it('shows the three stages and settles on the curation summary', async () => {
    renderWithProviders(<AcquisitionsPipeline interestId="i1" token={undefined} />);
    expect(screen.getByText(/discover/i)).toBeInTheDocument();
    expect(screen.getByText(/relevance score/i)).toBeInTheDocument();
    expect(screen.getByText(/shelve/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /run acquisition/i }));
    expect(await screen.findByText(/6 shelved/i)).toBeInTheDocument();
    expect(screen.getByText(/3 trusted/i)).toBeInTheDocument();
    expect(screen.getByText(/3 novel/i)).toBeInTheDocument();
  });

  it('surfaces refinement questions when curation awaits input', async () => {
    server.use(
      http.post('/interests/i1/curate', () =>
        HttpResponse.json({ status: 'awaiting_input', 'run-id': 'run1', 'step-run-id': 'step1', questions: ['Narrower topic?'] })),
      http.post('/interests/i1/curation-runs/run1/steps/step1/respond', () =>
        HttpResponse.json({ status: 'completed', 'run-id': 'run1', summary: { total: 4, trusted: 2, novel: 2 }, shelved: [] })),
    );
    renderWithProviders(<AcquisitionsPipeline interestId="i1" token={undefined} />);
    await userEvent.click(screen.getByRole('button', { name: /run acquisition/i }));
    expect(await screen.findByText('Narrower topic?')).toBeInTheDocument();
    await userEvent.type(screen.getByRole('textbox'), 'jazz theory');
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(await screen.findByText(/4 shelved/i)).toBeInTheDocument();
  });
});
