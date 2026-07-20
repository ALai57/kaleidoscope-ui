import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '../../theme';
import { StirrerIcon } from './StirrerIcon';

const theme = makeTheme(BASE_THEME);
const renderIcon = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

it('renders the pot + cook glyph', () => {
  renderIcon(<StirrerIcon />);
  expect(screen.getByTestId('stirrer-icon')).toBeInTheDocument();
});

it('marks itself active when animating', () => {
  renderIcon(<StirrerIcon active />);
  expect(screen.getByTestId('stirrer-icon')).toHaveAttribute('data-active', 'true');
});

it('is static by default', () => {
  renderIcon(<StirrerIcon />);
  expect(screen.getByTestId('stirrer-icon')).toHaveAttribute('data-active', 'false');
});

it('honors the size prop', () => {
  renderIcon(<StirrerIcon size={32} />);
  const svg = screen.getByTestId('stirrer-icon');
  expect(svg).toHaveAttribute('width', '32');
  expect(svg).toHaveAttribute('height', '32');
});

it('is hidden from the accessibility tree (name comes from the host button)', () => {
  renderIcon(<StirrerIcon active />);
  expect(screen.getByTestId('stirrer-icon')).toHaveAttribute('aria-hidden', 'true');
});
