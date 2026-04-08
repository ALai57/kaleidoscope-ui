import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { BioSection } from './BioSection';
import { SkillsSection } from './SkillsSection';

const theme = createTheme();
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MemoryRouter>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </MemoryRouter>
);

describe('BioSection', () => {
  it('renders personal view with welcome text', () => {
    render(<BioSection view="personal" />, { wrapper: Wrapper });
    expect(screen.getByText(/welcome to my website/i)).toBeTruthy();
  });

  it('renders professional view with heading', () => {
    render(<BioSection view="professional" />, { wrapper: Wrapper });
    expect(screen.getByText(/software engineering leader/i)).toBeTruthy();
  });

  it('renders cv view as null (no visible content)', () => {
    const { container } = render(<BioSection view="cv" />, { wrapper: Wrapper });
    expect(container.textContent).toBe('');
  });
});

describe('SkillsSection', () => {
  it('renders the default skills sections', () => {
    render(
      <ThemeProvider theme={theme}>
        <SkillsSection />
      </ThemeProvider>
    );
    expect(screen.getByText('Languages I use')).toBeTruthy();
    expect(screen.getByText('Tools I use')).toBeTruthy();
  });

  it('renders custom sections', () => {
    const custom = [
      {
        title: 'My Languages',
        groups: [{ icons: [{ tooltipText: 'Rust', src: '/rust.svg' }] }],
      },
    ];
    render(
      <ThemeProvider theme={theme}>
        <SkillsSection sections={custom} />
      </ThemeProvider>
    );
    expect(screen.getByText('My Languages')).toBeTruthy();
  });
});
