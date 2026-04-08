import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PortfolioSection } from './PortfolioSection';
import type { Article } from '../../types/article';
import type { PortfolioCard } from './PortfolioSection';

const theme = createTheme();
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const mockCards: PortfolioCard[] = [
  { id: '1', title: 'Project Alpha', description: 'First project', tags: ['react'] },
  { id: '2', title: 'Project Beta', description: 'Second project' },
];

const mockArticles: Article[] = [
  {
    article_id: 'a1',
    article_url: 'my-article',
    article_title: 'My Article',
    article_tags: 'thoughts',
    public_visibility: true,
    created_at: '2024-01-01T00:00:00Z',
  },
];

describe('PortfolioSection', () => {
  it('renders portfolio cards', () => {
    render(<PortfolioSection portfolioCards={mockCards} />, { wrapper: Wrapper });
    expect(screen.getByText('Project Alpha')).toBeTruthy();
    expect(screen.getByText('Project Beta')).toBeTruthy();
  });

  it('renders articles as portfolio cards when no cards provided', () => {
    render(<PortfolioSection recentArticles={mockArticles} />, { wrapper: Wrapper });
    expect(screen.getByText('My Article')).toBeTruthy();
  });

  it('renders nothing when no data provided', () => {
    const { container } = render(<PortfolioSection />, { wrapper: Wrapper });
    expect(container.textContent).toBe('');
  });

  it('shows the section heading', () => {
    render(<PortfolioSection portfolioCards={mockCards} />, { wrapper: Wrapper });
    expect(screen.getByText('Recent Writing')).toBeTruthy();
  });
});
