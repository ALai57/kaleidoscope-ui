import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SurfaceCard } from './SurfaceCard';

describe('SurfaceCard', () => {
  it('renders its children', () => {
    render(<SurfaceCard>hello</SurfaceCard>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('forwards click handlers when interactive', async () => {
    const onClick = vi.fn();
    render(
      <SurfaceCard interactive onClick={onClick}>
        clickable
      </SurfaceCard>
    );
    screen.getByText('clickable').click();
    expect(onClick).toHaveBeenCalled();
  });
});
