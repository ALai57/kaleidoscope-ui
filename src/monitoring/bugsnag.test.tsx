import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';

const startMock = vi.fn();
const createErrorBoundaryMock = vi.fn();
const getPluginMock = vi.fn(() => ({ createErrorBoundary: createErrorBoundaryMock }));

vi.mock('@bugsnag/js', () => ({
  default: { start: startMock, getPlugin: getPluginMock },
}));
vi.mock('@bugsnag/plugin-react', () => ({
  default: class BugsnagPluginReact {},
}));

const FakeBoundary: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div data-testid="real-boundary">{children}</div>
);

describe('bugsnag monitoring', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    createErrorBoundaryMock.mockReturnValue(FakeBoundary);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('does not start Bugsnag when the API key is blank, and renders children unwrapped', async () => {
    vi.stubEnv('VITE_BUGSNAG_API_KEY', '');
    const mod = await import('./bugsnag');
    mod.startBugsnag();

    expect(startMock).not.toHaveBeenCalled();

    render(
      <mod.BugsnagErrorBoundary>
        <span>child content</span>
      </mod.BugsnagErrorBoundary>
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
    expect(screen.queryByTestId('real-boundary')).not.toBeInTheDocument();
  });

  it('starts Bugsnag with release metadata and uses the real boundary when a key is present', async () => {
    vi.stubEnv('VITE_BUGSNAG_API_KEY', 'test-key');
    const mod = await import('./bugsnag');
    mod.startBugsnag();

    expect(startMock).toHaveBeenCalledWith(
      expect.objectContaining({
        apiKey: 'test-key',
        releaseStage: expect.any(String),
        appVersion: expect.any(String),
        plugins: expect.any(Array),
      })
    );
    expect(createErrorBoundaryMock).toHaveBeenCalled();

    render(
      <mod.BugsnagErrorBoundary>
        <span>child content</span>
      </mod.BugsnagErrorBoundary>
    );
    expect(screen.getByTestId('real-boundary')).toBeInTheDocument();
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});
