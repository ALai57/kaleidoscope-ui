import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';

// Test the HashRedirect behavior in isolation
const HashRedirect: React.FC = () => {
  React.useEffect(() => {
    if (window.location.hash.startsWith('#/')) {
      window.location.replace(window.location.hash.slice(1));
    }
  }, []);
  return null;
};

describe('HashRedirect', () => {
  let mockReplace: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockReplace = vi.fn();
    // jsdom's window.location.replace is not configurable via spyOn
    // Use delete + Object.defineProperty pattern
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any).location;
    Object.defineProperty(window, 'location', {
      value: {
        hash: '',
        replace: mockReplace,
        href: 'http://localhost/',
        origin: 'http://localhost',
        pathname: '/',
        search: '',
        protocol: 'http:',
        host: 'localhost',
      },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls window.location.replace with the hash path when hash starts with #/', () => {
    window.location.hash = '#/groups';

    render(<HashRedirect />);

    expect(mockReplace).toHaveBeenCalledWith('/groups');
  });

  it('does not redirect when hash does not start with #/', () => {
    window.location.hash = '#section-1';

    render(<HashRedirect />);

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('does not redirect when hash is empty', () => {
    window.location.hash = '';

    render(<HashRedirect />);

    expect(mockReplace).not.toHaveBeenCalled();
  });
});
