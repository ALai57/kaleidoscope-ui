import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { KeycloakProvider } from './auth/KeycloakProvider';
import { makeTheme, BASE_THEME } from './theme';
import { LoadingScreen } from './components/layout/LoadingScreen';
import App from './App';

const queryClient = new QueryClient();
const theme = makeTheme(BASE_THEME);

const authConfig = {
  url: import.meta.env.VITE_AUTH_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
};

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <KeycloakProvider authConfig={authConfig}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<LoadingScreen />}>
            <App />
          </Suspense>
        </ThemeProvider>
      </KeycloakProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
