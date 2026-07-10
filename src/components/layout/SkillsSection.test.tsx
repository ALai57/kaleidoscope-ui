import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { SkillsSection } from './SkillsSection';
import { makeTheme, BASE_THEME } from '../../theme';
import type { SkillSection } from '../../data/skills';

const theme = makeTheme(BASE_THEME, 'prism');
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Grid container>{children}</Grid>
  </ThemeProvider>
);

const sections: SkillSection[] = [
  {
    title: 'Languages I use',
    groups: [{ icons: [{ tooltipText: 'TypeScript', src: '/ts.svg' }] }],
  },
];

describe('SkillsSection', () => {
  it('renders section titles and skill icons', () => {
    render(<SkillsSection sections={sections} />, { wrapper: Wrapper });
    expect(screen.getByText('Languages I use')).toBeInTheDocument();
    // SkillIcon renders both a caption label and an img alt for each skill.
    expect(screen.getByRole('img', { name: 'TypeScript' })).toBeInTheDocument();
  });

  it('falls back to the default SKILLS data', () => {
    render(<SkillsSection />, { wrapper: Wrapper });
    expect(screen.getByText('Languages I use')).toBeInTheDocument();
    expect(screen.getByText('Tools I use')).toBeInTheDocument();
  });
});
