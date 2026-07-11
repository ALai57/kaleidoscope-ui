import React, { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../test/testUtils';
import { LabelPicker, enforceOnePerGroup } from './LabelPicker';
import type { RecipeLabel } from '../../types/recipe';

const indian: RecipeLabel = { id: 'l1', name: 'indian', group_id: 'g1', group_name: 'ethnicity' };
const mexican: RecipeLabel = { id: 'l2', name: 'mexican', group_id: 'g1', group_name: 'ethnicity' };
const baking: RecipeLabel = { id: 'l3', name: 'baking', group_id: null, group_name: null };
const carbs: RecipeLabel = { id: 'l4', name: 'carbs', group_id: null, group_name: null };
const labels = [indian, mexican, baking, carbs];

describe('enforceOnePerGroup', () => {
  it('replaces a same-group selection when a grouped label is added', () => {
    const result = enforceOnePerGroup([indian], [indian, mexican]);
    expect(result.map((l) => l.id)).toEqual(['l2']);
  });

  it('keeps ungrouped labels alongside each other', () => {
    const result = enforceOnePerGroup([baking], [baking, carbs]);
    expect(result.map((l) => l.id).sort()).toEqual(['l3', 'l4']);
  });

  it('keeps a grouped label and an ungrouped label together', () => {
    const result = enforceOnePerGroup([indian], [indian, baking]);
    expect(result.map((l) => l.id).sort()).toEqual(['l1', 'l3']);
  });

  it('is a no-op on removal', () => {
    const result = enforceOnePerGroup([indian, mexican], [indian]);
    expect(result.map((l) => l.id)).toEqual(['l1']);
  });
});

function Harness({
  onCreateLabel,
}: {
  onCreateLabel?: (name: string) => Promise<RecipeLabel>;
}): React.ReactElement {
  const [value, setValue] = useState<string[]>([]);
  return (
    <>
      <LabelPicker
        labels={labels}
        value={value}
        onChange={setValue}
        {...(onCreateLabel ? { onCreateLabel } : {})}
      />
      <div data-testid="selected">{value.join(',')}</div>
    </>
  );
}

describe('LabelPicker', () => {
  it('renders grouped labels by their qualified name', async () => {
    render(<Harness />);
    fireEvent.mouseDown(screen.getByRole('combobox'));
    await waitFor(() => expect(screen.getByText('ethnicity/indian')).toBeInTheDocument());
    expect(screen.getByText('baking')).toBeInTheDocument();
  });

  it('replaces a same-group label rather than stacking it', async () => {
    render(<Harness />);
    const input = screen.getByRole('combobox');
    // disableCloseOnSelect keeps the listbox open across selections.
    fireEvent.mouseDown(input);
    fireEvent.click(await screen.findByText('ethnicity/indian'));
    await waitFor(() => expect(screen.getByTestId('selected').textContent).toBe('l1'));

    fireEvent.click(await screen.findByText('ethnicity/mexican'));
    // one-per-group: indian (l1) replaced by mexican (l2)
    await waitFor(() => expect(screen.getByTestId('selected').textContent).toBe('l2'));
  });

  it('offers a create affordance for an unknown query and selects the created label', async () => {
    const created: RecipeLabel = { id: 'new', name: 'vegan', group_id: null, group_name: null };
    const onCreateLabel = vi.fn().mockResolvedValue(created);
    render(<Harness onCreateLabel={onCreateLabel} />);
    const input = screen.getByRole('combobox') as HTMLInputElement;
    input.focus();
    fireEvent.change(input, { target: { value: 'vegan' } });
    fireEvent.click(await screen.findByText('Add "vegan"'));
    // create dialog opens; confirm
    fireEvent.click(await screen.findByRole('button', { name: 'Create' }));
    await waitFor(() => expect(onCreateLabel).toHaveBeenCalledWith('vegan'));
    await waitFor(() => expect(screen.getByTestId('selected').textContent).toBe('new'));
  });
});
