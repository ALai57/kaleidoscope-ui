import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { SectionHeading } from './SectionHeading';
import { makeTheme, BASE_THEME } from '../../theme';

const theme = makeTheme(BASE_THEME, 'prism');
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('SectionHeading', () => {
  it('renders the title as a heading of the default level (h3)', () => {
    render(<SectionHeading title="Recent Writing" />, { wrapper: Wrapper });
    expect(screen.getByRole('heading', { level: 3, name: 'Recent Writing' })).toBeInTheDocument();
  });

  it('renders the eyebrow label', () => {
    render(<SectionHeading eyebrow="// PROFILE" title="About" />, { wrapper: Wrapper });
    expect(screen.getByText('// PROFILE')).toBeInTheDocument();
  });

  it('honors the level prop for both tag and semantics', () => {
    render(<SectionHeading title="Career History" level="h2" />, { wrapper: Wrapper });
    expect(screen.getByRole('heading', { level: 2, name: 'Career History' })).toBeInTheDocument();
  });

  it('renders trailing action content', () => {
    render(<SectionHeading title="Writing" action={<a href="/archive">View all</a>} />, {
      wrapper: Wrapper,
    });
    expect(screen.getByRole('link', { name: 'View all' })).toBeInTheDocument();
  });
});
