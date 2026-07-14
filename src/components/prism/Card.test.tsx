import { it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../../test/testUtils';
import { Card } from './Card';

it('renders children', () => {
  render(<Card>Chana Masala</Card>);
  expect(screen.getByText('Chana Masala')).toBeInTheDocument();
});
