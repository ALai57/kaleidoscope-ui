import React, { useState } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '../../theme';
import {
  RecipeSectionsEditor,
  emptyEditSection,
  toSection,
  type EditSection,
} from './RecipeSectionsEditor';

function Harness({ initial }: { initial: EditSection[] }): React.ReactElement {
  const [sections, setSections] = useState<EditSection[]>(initial);
  return (
    <ThemeProvider theme={makeTheme(BASE_THEME)}>
      <RecipeSectionsEditor sections={sections} onChange={setSections} />
      <output data-testid="dump">{JSON.stringify(sections.map(toSection))}</output>
    </ThemeProvider>
  );
}

describe('RecipeSectionsEditor', () => {
  it('hides section chrome for a single section and reveals it on Add section', () => {
    render(<Harness initial={[emptyEditSection()]} />);
    expect(screen.queryByLabelText('Section name')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Add section' }));
    expect(screen.getAllByLabelText('Section name')).toHaveLength(2);
  });

  it('reorders steps with the down button', () => {
    render(<Harness initial={[{ name: '', ingredients: [''], steps: ['A', 'B'] }]} />);
    fireEvent.click(screen.getByRole('button', { name: 'move Steps 1 down' }));
    expect(screen.getByTestId('dump')).toHaveTextContent('"steps":["B","A"]');
  });

  it('adds and removes ingredient rows', () => {
    render(<Harness initial={[{ name: '', ingredients: ['flour'], steps: [''] }]} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add ingredients' }));
    fireEvent.click(screen.getByRole('button', { name: 'remove Ingredients 2' }));
    expect(screen.getByTestId('dump')).toHaveTextContent('"ingredients":["flour"]');
  });
});
