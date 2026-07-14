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

it('renders a real <span> (non-interactive) when as="span"', () => {
  const { container } = render(
    <Chip as="span" dotColor="#26A0BC">
      ethnicity/indian
    </Chip>
  );
  const el = screen.getByText('ethnicity/indian');
  expect(el.tagName.toLowerCase()).toBe('span');
  // must NOT be a button, and must not leak an `as` attribute to the DOM
  expect(container.querySelector('button')).toBeNull();
  expect(container.innerHTML).not.toContain('as=');
  // a span tag carries no aria-pressed
  expect(el.getAttribute('aria-pressed')).toBeNull();
});

it('renders a <button> with aria-pressed when as="button" (default)', () => {
  const { container } = render(<Chip pressed>filter</Chip>);
  const btn = container.querySelector('button');
  expect(btn).not.toBeNull();
  expect(btn!.getAttribute('aria-pressed')).toBe('true');
});
