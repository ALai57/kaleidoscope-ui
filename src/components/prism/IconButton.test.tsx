import { it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../../test/testUtils';
import { IconButton } from './IconButton';

it('exposes its aria-label as an accessible name', () => {
  render(<IconButton aria-label="Recipe actions">•••</IconButton>);
  expect(screen.getByRole('button', { name: 'Recipe actions' })).toBeInTheDocument();
});
