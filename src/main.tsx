import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ThemeProvider, useColorScheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './auth/AuthProvider';
import { useAuth } from './auth/useAuth';
import { makeTheme } from './theme';
import { normalizeThemeConfig } from './theme/config';
import { useThemeStore } from './store/themeStore';
import { getThemes } from './api/themes';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { DarkModeToggle } from './components/layout/DarkModeToggle';
import App from './App';

const queryClient = new QueryClient();

const authConfig = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  audience: import.meta.env.VITE_AUTH0_AUDIENCE,
};

/**
 * Loads the persisted theme (source of truth = themes API) once the user is
 * authenticated and reconciles it into the store + color mode. The store is
 * already hydrated from localStorage for instant paint; this overrides it with
 * the server value when available.
 */
const ThemeBootstrap: React.FC = () => {
  const { token, isAuthenticated } = useAuth();
  const setThemeParams = useThemeStore((s) => s.setThemeParams);
  const { setMode } = useColorScheme();

  const { data } = useQuery({
    queryKey: ['themes'],
    queryFn: () => getThemes(token),
    enabled: isAuthenticated,
  });

  // Apply the persisted config only once, when it first arrives — later
  // refetches must not clobber the user's in-session edits (e.g. a manual
  // dark-mode toggle).
  const applied = React.useRef(false);
  React.useEffect(() => {
    if (applied.current) return;
    const record = data?.[0];
    if (!record) return;
    applied.current = true;
    const config = normalizeThemeConfig(record.config);
    setThemeParams(config.seed);
    setMode(config.mode);
  }, [data, setThemeParams, setMode]);

  return null;
};

/** Builds the live MUI theme reactively from the store, so theme-picker edits
 *  take effect app-wide immediately. */
const ThemedApp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const themeParams = useThemeStore((s) => s.themeParams);
  const theme = React.useMemo(() => makeTheme(themeParams), [themeParams]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeBootstrap />
      <DarkModeToggle />
      {children}
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider authConfig={authConfig}>
        <ThemedApp>
          <Suspense fallback={<LoadingScreen />}>
            <App />
          </Suspense>
        </ThemedApp>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
