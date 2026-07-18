import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/test/testUtils';
import { PrismThemeProvider } from '@/components/prism';
import { RecipeViewToggle } from './RecipeViewToggle';

describe('RecipeViewToggle', () => {
  it('renders three views and reports changes', async () => {
    const onChange = vi.fn();
    render(
      <PrismThemeProvider>
        <RecipeViewToggle value="timeline" onChange={onChange} />
      </PrismThemeProvider>
    );
    expect(screen.getByRole('button', { name: /timeline/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    await userEvent.click(screen.getByRole('button', { name: /shopping/i }));
    expect(onChange).toHaveBeenCalledWith('shopping');
  });
});
