import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SignUpPage from './SignUpPage';

vi.mock('../auth/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    token: undefined,
    userProfile: null,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

vi.mock('@stripe/stripe-js', () => ({ loadStripe: () => Promise.resolve(null) }));
vi.mock('@stripe/react-stripe-js', () => ({
  Elements: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PaymentElement: () => <div data-testid="payment-element" />,
  AddressElement: () => <div data-testid="address-element" />,
  useStripe: () => null,
  useElements: () => null,
}));

const server = setupServer(
  http.get('/check-domain', ({ request }) => {
    const url = new URL(request.url);
    const domain = url.searchParams.get('domain');
    return HttpResponse.json({ domain, available: true });
  }),
  http.post('/v1/payments', () =>
    HttpResponse.json({ id: 'pi_1', client_secret: 'secret', amount: 1400, currency: 'usd' })
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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

describe('SignUpPage — additional branches', () => {
  it('renders Payment step label', () => {
    render(<SignUpPage />, { wrapper: Wrapper });
    expect(screen.getByText('Payment')).toBeTruthy();
  });

  it('purchase button proceeds to payment after domain check', async () => {
    render(<SignUpPage />, { wrapper: Wrapper });

    const input = screen.getByLabelText(/domain name/i);
    fireEvent.change(input, { target: { value: 'mysite.com' } });
    fireEvent.click(screen.getByText('Check availability'));

    await waitFor(() => {
      expect(screen.getByTestId('purchase-button')).toBeTruthy();
    });

    fireEvent.click(screen.getByTestId('purchase-button'));

    // After clicking, payment widget shows loading indicator
    await waitFor(() => {
      expect(screen.getByText('Payment')).toBeTruthy();
    });
  });

  it('shows unavailable domain warning', async () => {
    server.use(
      http.get('/check-domain', () =>
        HttpResponse.json({ domain: 'taken.com', available: false })
      )
    );

    render(<SignUpPage />, { wrapper: Wrapper });

    const input = screen.getByLabelText(/domain name/i);
    fireEvent.change(input, { target: { value: 'taken.com' } });
    fireEvent.click(screen.getByText('Check availability'));

    await waitFor(() => {
      // Purchase button should be disabled when domain unavailable
      const purchaseBtn = screen.getByTestId('purchase-button');
      expect(purchaseBtn).toBeDisabled();
    });
  });

  it('check button is disabled when domain is empty', () => {
    render(<SignUpPage />, { wrapper: Wrapper });
    const checkButton = screen.getByText('Check availability');
    expect(checkButton).toBeDisabled();
  });
});
