import { it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../test/testUtils';
import { TextInput } from './TextInput';

it('is controllable and labelable', () => {
  render(<TextInput aria-label="Recipe URL" defaultValue="chana-masala" />);
  const input = screen.getByLabelText('Recipe URL');
  fireEvent.change(input, { target: { value: 'chana-masala-v2' } });
  expect((input as HTMLInputElement).value).toBe('chana-masala-v2');
});
