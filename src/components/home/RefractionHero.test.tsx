import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test/testUtils';
import RefractionHero from './RefractionHero';
import { PULSE_CONFIG } from './gardenFacets';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useIsMobile } from '@/hooks/useIsMobile';

// RefractionHero gates its pulses on prefers-reduced-motion; drive that query.
vi.mock('@mui/material/useMediaQuery', () => ({ default: vi.fn(() => false) }));
const mockUseMediaQuery = vi.mocked(useMediaQuery);

vi.mock('@/hooks/useIsMobile', () => ({ useIsMobile: vi.fn(() => false) }));
const mockUseIsMobile = vi.mocked(useIsMobile);

beforeEach(() => {
  mockUseMediaQuery.mockReturnValue(false); // motion allowed by default
  mockUseIsMobile.mockReturnValue(false); // desktop scene by default
  PULSE_CONFIG.enabled = true; // restore the shared config between tests
});

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

  it('renders one incoming packet plus one per facet, all decorative', () => {
    const { container } = render(<RefractionHero />);
    const packets = container.querySelectorAll('[data-pulse]');
    expect(packets).toHaveLength(4); // 1 incoming + 3 fan-out
    expect(container.querySelector('[data-pulse="incoming"]')).toBeTruthy();
    expect(container.querySelector('[data-pulse="writing"]')).toBeTruthy();
    expect(container.querySelector('[data-pulse="reading"]')).toBeTruthy();
    expect(container.querySelector('[data-pulse="recipes"]')).toBeTruthy();
    packets.forEach((p) => expect(p.getAttribute('aria-hidden')).toBe('true'));
  });

  it('renders no pulses under prefers-reduced-motion, keeping the static scene', () => {
    mockUseMediaQuery.mockReturnValue(true);
    const { container } = render(<RefractionHero />);
    expect(container.querySelectorAll('[data-pulse]')).toHaveLength(0);
    // static scene and links still present
    expect(screen.getByRole('link', { name: /Writing/ })).toBeTruthy();
  });

  it('renders no pulses when the animation is disabled in config', () => {
    PULSE_CONFIG.enabled = false;
    const { container } = render(<RefractionHero />);
    expect(container.querySelectorAll('[data-pulse]')).toHaveLength(0);
    expect(screen.getByRole('link', { name: /Recipes/ })).toBeTruthy();
  });

  it('renders the mobile optical-bench hero below md', () => {
    mockUseIsMobile.mockReturnValue(true);
    render(<RefractionHero />);
    expect(screen.getByTestId('refraction-hero-mobile')).toBeTruthy();
    // links still present and correct in the mobile variant
    expect(screen.getByRole('link', { name: /Writing/ }).getAttribute('href')).toBe('/archive');
  });
});
