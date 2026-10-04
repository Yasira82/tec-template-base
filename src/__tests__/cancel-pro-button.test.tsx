/**
 * <CancelProButton /> — shown only when there is something HERE to cancel.
 *
 * It read only commerce's raw `isActive`, but this template's own route answers
 * the resolver's ProState (`pro`) — so in every app built from the template the
 * button never rendered, even for a Pro bought in that very app.
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { CancelProButton } from '@/components/pro/CancelProButton';

const answer = (body: unknown) => {
  const f = vi.fn(async () => ({ ok: true, json: async () => body }) as unknown as Response);
  vi.stubGlobal('fetch', f);
  return f;
};
const shown = async (body: unknown) => {
  const f = answer(body);
  const { container } = render(<CancelProButton />);
  await waitFor(() => expect(f).toHaveBeenCalled());
  // The decision lands a few promise turns after the fetch — wait for it, briefly.
  return waitFor(() => { if (!container.querySelector('button')) throw new Error('not yet'); }, { timeout: 300 })
    .then(() => true, () => false);
};

afterEach(() => { vi.unstubAllGlobals(); document.body.innerHTML = ''; });

describe('CancelProButton', () => {
  it('shows for a Pro bought in this app — the template route\'s own shape', async () => {
    expect(await shown({ pro: true, plan: 'PRO', isExpired: false, daysRemaining: 20, legacy: false, gift: false })).toBe(true);
  });

  it('shows for the raw commerce envelope too (apps that forward it)', async () => {
    expect(await shown({ success: true, data: { subscription: { plan: 'PRO', isActive: true, legacy: false } } })).toBe(true);
  });

  it('hides for the Founding gift — nothing of this app\'s to cancel', async () => {
    expect(await shown({ pro: true, plan: 'PRO', legacy: true, gift: true })).toBe(false);
  });

  it('shows for an ADMIN\'s gift — commerce reads it legacy:false so the admin can test FREE', async () => {
    expect(await shown({ pro: true, plan: 'PRO', legacy: false, gift: true })).toBe(true);
  });

  it('hides on FREE and on the Testnet host', async () => {
    expect(await shown({ pro: false, plan: 'FREE', legacy: false })).toBe(false);
    expect(await shown({ pro: false, plan: 'FREE', testnet: true })).toBe(false);
  });
});
