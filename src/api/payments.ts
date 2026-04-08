import { request } from './client';

export interface DomainAvailability {
  domain: string;
  available: boolean;
}

export interface PaymentIntent {
  id: string;
  client_secret: string;
  amount: number;
  currency: string;
}

export interface PaymentPayload {
  amount: number;
  currency: string;
}

export function getDomainAvailability(
  domain: string,
  token?: string
): Promise<DomainAvailability> {
  return request<DomainAvailability>(`/check-domain?domain=${encodeURIComponent(domain)}`, {
    token,
  });
}

export function newPaymentSecret(
  payment: PaymentPayload,
  token?: string
): Promise<PaymentIntent> {
  return request<PaymentIntent>('/v1/payments', {
    method: 'POST',
    body: payment,
    token,
  });
}
