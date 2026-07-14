import { describe, it, expect } from 'vitest';
import { render } from '../../../test/testUtils';
import { LlmCallView } from './LlmCallView';
import type { LlmCall } from '../../../types/lineage';

const call: LlmCall = {
  purpose: 'normalize',
  model: 'claude-haiku-4-5',
  request: {
    model: 'claude-haiku-4-5', max_tokens: 1024, system: 'You are a grouper.',
    messages: [{ role: 'user', content: 'INGREDIENTS:\n0. flour' }],
  },
  response: { content: [{ type: 'text', text: '{"sections":[]}' }],
              usage: { input_tokens: 1043, output_tokens: 218 } },
};

describe('LlmCallView', () => {
  it('shows purpose, model, usage, and each io block', () => {
    const { getByText, getAllByRole } = render(<LlmCallView call={call} />);
    expect(getByText(/normalize/i)).toBeInTheDocument();
    expect(getByText('claude-haiku-4-5')).toBeInTheDocument();
    expect(getByText(/1,043/)).toBeInTheDocument();
    expect(getByText('You are a grouper.')).toBeInTheDocument();
    expect(getByText(/INGREDIENTS:/)).toBeInTheDocument();
    expect(getByText('{"sections":[]}')).toBeInTheDocument();
    // system + 1 user message + response = 3 copy buttons
    expect(getAllByRole('button', { name: /copy/i })).toHaveLength(3);
  });
});
