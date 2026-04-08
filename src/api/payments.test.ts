import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { getDomainAvailability, newPaymentSecret } from './payments';

const server = setupServer(
  http.get('/check-domain', () => HttpResponse.json({ domain: 'example.com', available: true })),
  http.post('/v1/payments', () =>
    HttpResponse.json({ id: 'pi_1', client_secret: 'secret', amount: 1000, currency: 'usd' })
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getDomainAvailability', () => {
  it('checks domain availability', async () => {
    const result = await getDomainAvailability('example.com');
    expect(result.available).toBe(true);
  });
});

describe('newPaymentSecret', () => {
  it('creates a payment intent', async () => {
    const intent = await newPaymentSecret({ amount: 1000, currency: 'usd' });
    expect(intent.id).toBe('pi_1');
  });
});
