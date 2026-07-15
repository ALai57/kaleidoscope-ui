import React from 'react';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';

/**
 * Error reporting via Bugsnag. Reporting is opt-in on the presence of
 * `VITE_BUGSNAG_API_KEY`: it is blank locally and in dev, so `startBugsnag()`
 * is a no-op there and nothing is sent. When a key is configured (prod), the
 * app tree is wrapped in Bugsnag's React error boundary.
 */

type ErrorBoundaryProps = {
  children?: React.ReactNode;
  FallbackComponent?: React.ComponentType<{
    error: Error;
    info: React.ErrorInfo;
    clearError: () => void;
  }>;
};

const Passthrough: React.FC<ErrorBoundaryProps> = ({ children }) => <>{children}</>;

let ErrorBoundary: React.ComponentType<ErrorBoundaryProps> = Passthrough;

export function startBugsnag(): void {
  const apiKey = import.meta.env.VITE_BUGSNAG_API_KEY;
  if (!apiKey) return;

  Bugsnag.start({
    apiKey,
    plugins: [new BugsnagPluginReact()],
    // Prefer the explicit per-environment stage from the loaded .env file;
    // fall back to Vite's build mode when it isn't set.
    releaseStage: import.meta.env.VITE_RELEASE_STAGE || import.meta.env.MODE,
    appVersion: __APP_VERSION__,
  });

  const plugin = Bugsnag.getPlugin('react');
  if (plugin) ErrorBoundary = plugin.createErrorBoundary(React);
}

/**
 * Wraps its children in Bugsnag's error boundary once `startBugsnag()` has run
 * with a configured key; otherwise renders children unwrapped.
 */
export const BugsnagErrorBoundary: React.FC<ErrorBoundaryProps> = (props) => (
  <ErrorBoundary {...props} />
);
