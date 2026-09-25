import { describe, it, expect, beforeEach } from 'vitest';
import { redirectToHubPayment } from '@/lib/pi-payment';

// The Hub reads the Mode-1 product from `product_id`. This template sent only `item`,
// so every app cloned from it reached payment-service with no product, and commerce
// never activated the Pro the user paid for. Both names are sent now.
describe('redirectToHubPayment — the product reaches the Hub', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: { origin: 'https://app.tecosystem.app', href: '' }, writable: true,
    });
  });

  it('sends product_id — the documented name — and item for older Hubs', () => {
    redirectToHubPayment({ amount: 15, itemId: 'app_pro_monthly', memo: 'Pro' });
    const q = new URL(window.location.href).searchParams;
    expect(q.get('product_id')).toBe('app_pro_monthly');
    expect(q.get('item')).toBe('app_pro_monthly');
    expect(q.get('pay')).toBe('1');
  });
});
