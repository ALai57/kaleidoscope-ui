import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './auth/AuthProvider';
import { makeTheme, BASE_THEME } from './theme';
import { LoadingScreen } from './components/layout/LoadingScreen';
import App from './App';

const queryClient = new QueryClient();
const theme = makeTheme(BASE_THEME);

const authConfig = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  audience: import.meta.env.VITE_AUTH0_AUDIENCE,
};

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider authConfig={authConfig}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<LoadingScreen />}>
            <App />
          </Suspense>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
