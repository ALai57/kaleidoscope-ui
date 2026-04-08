import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SignUpPage from './SignUpPage';

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('../auth/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    token: undefined,
    userProfile: null,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

// Mock Stripe to avoid loading the actual SDK
vi.mock('@stripe/stripe-js', () => ({
  loadStripe: () => Promise.resolve(null),
}));

vi.mock('@stripe/react-stripe-js', () => ({
  Elements: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PaymentElement: () => <div data-testid="payment-element" />,
  AddressElement: () => <div data-testid="address-element" />,
  useStripe: () => null,
  useElements: () => null,
}));

// const mockDomainAvailability is unused — domain check is done via API mock

const server = setupServer(
  http.get('/check-domain', ({ request }) => {
    const url = new URL(request.url);
    const domain = url.searchParams.get('domain');
    return HttpResponse.json({ domain, available: true });
  }),
  http.post('/v1/payments', () =>
    HttpResponse.json({
      id: 'pi_123',
      client_secret: 'secret_abc',
      amount: 1400,
      currency: 'usd',
    })
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// ── Helpers ────────────────────────────────────────────────────────────────

const theme = createTheme();

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <ThemeProvider theme={theme}>
        <MemoryRouter>{children}</MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('SignUpPage', () => {
  it('renders domain selection step', () => {
    render(<SignUpPage />, { wrapper: Wrapper });
    expect(screen.getByText('Select a domain name')).toBeTruthy();
  });

  it('shows domain availability after check', async () => {
    render(<SignUpPage />, { wrapper: Wrapper });

    const input = screen.getByLabelText(/domain name/i);
    fireEvent.change(input, { target: { value: 'mycoolsite.com' } });

    const checkButton = screen.getByText('Check availability');
    fireEvent.click(checkButton);

    await waitFor(() => {
      expect(screen.getByTestId('purchase-button')).toBeTruthy();
    });
  });
});
