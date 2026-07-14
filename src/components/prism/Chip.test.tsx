import { it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../../test/testUtils';
import { Chip } from './Chip';

it('renders label and reflects pressed state', () => {
  render(
    <Chip pressed dotColor="#26A0BC">
      ethnicity/indian
    </Chip>
  );
  const chip = screen.getByRole('button', { name: /ethnicity\/indian/ });
  expect(chip).toHaveAttribute('aria-pressed', 'true');
});
