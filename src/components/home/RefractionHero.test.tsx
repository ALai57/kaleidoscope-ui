import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test/testUtils';
import RefractionHero from './RefractionHero';

describe('RefractionHero', () => {
  it('renders a link for each garden facet with its route', () => {
    render(<RefractionHero />);
    expect(screen.getByRole('link', { name: /Writing/ }).getAttribute('href')).toBe('/archive');
    expect(screen.getByRole('link', { name: /Reading/ }).getAttribute('href')).toBe('/library');
    expect(screen.getByRole('link', { name: /Recipes/ }).getAttribute('href')).toBe('/recipes');
  });

  it('gives each facet an accessible name that includes its description', () => {
    render(<RefractionHero />);
    expect(screen.getByRole('link', { name: /essays, talks & notes/ })).toBeTruthy();
  });

  it('labels the scene as a group for assistive tech', () => {
    render(<RefractionHero />);
    expect(screen.getByRole('group', { name: /prism/i })).toBeTruthy();
  });
});
