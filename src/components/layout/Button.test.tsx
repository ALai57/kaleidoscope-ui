/// <reference types="node" />
import React from 'react';
import { readFileSync } from 'node:fs';
// Alias Node's URL to defeat Vite's literal-keyed `new URL('...', import.meta.url)`
// asset-rewrite (it matches on the identifier text `URL`, not the import source) —
// do not "simplify" this back to a bare `new URL(...)` call, it breaks under jsdom.
import { URL as NodeURL } from 'node:url';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders without errors', () => {
    const { container } = render(<Button text="Click me" />);
    expect(container).toBeDefined();
  });

  it('renders the button text', () => {
    render(<Button text="Submit" />);
    expect(screen.getByText('Submit')).toBeTruthy();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button text="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('renders as disabled when disabled prop is true', () => {
    render(<Button text="Disabled" disabled />);
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  it('does not force the primary.light background (uses palette-driven contained styling)', () => {
    const source = readFileSync(new NodeURL('./Button.tsx', import.meta.url), 'utf8');
    expect(source).not.toMatch(/primary\?\.light|primaryLight/);
  });
});
