import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NotificationCard } from './NotificationCard';

describe('NotificationCard', () => {
  it('renders without errors', () => {
    const { container } = render(
      <NotificationCard title="Error" message="Something went wrong" />,
    );
    expect(container).toBeDefined();
  });

  it('renders the title', () => {
    render(<NotificationCard title="Warning!" level="warn" />);
    expect(screen.getByText('Warning!')).toBeTruthy();
  });

  it('renders the message', () => {
    render(
      <NotificationCard
        level="error"
        title="Error"
        message="Database connection failed"
      />,
    );
    expect(screen.getByText('Database connection failed')).toBeTruthy();
  });

  it('renders an error icon by default', () => {
    const { container } = render(<NotificationCard title="Oops" />);
    // MUI icons have data-testid attributes
    expect(container.querySelector('[data-testid="ErrorOutlineIcon"]')).toBeTruthy();
  });
});
