/**
 * Help & feedback (App Excellence Standard E12): the questions answered, a way to say
 * anything else that reaches the fleet's inbox labelled with THIS app, and the person
 * never left guessing why a message was refused.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { NextRequest } from 'next/server';
import { APP_SOURCE } from '@/lib/app-source';
import { en } from '@/lib/i18n/en';
import { FeedbackCard } from '@/components/feedback/FeedbackCard';
import HelpPage from '@/app/help/page';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.resetModules(); });

describe('the feedback route', () => {
  beforeEach(() => { process.env.API_GATEWAY_URL = 'https://gw'; });
  const post = (body: unknown, token = 't') => {
    const r = new NextRequest('https://app.tecosystem.app/api/bff/feedback', { method: 'POST', body: JSON.stringify(body), headers: { 'content-type': 'application/json' } });
    if (token) r.cookies.set('tec_access_token', token);
    return r;
  };

  it('labels the message with THIS app — a label the client sent is discarded', async () => {
    const f = vi.fn(async () => new Response(JSON.stringify({ success: true }), { status: 201 }));
    vi.stubGlobal('fetch', f);
    const { POST } = await import('@/app/api/bff/feedback/route');
    const res = await POST(post({ message: 'The pay button is hidden on my phone', page: '/app', app: 'someone-else' }));
    expect(res.status).toBe(201);
    const [url, init] = f.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://gw/api/identity/feedback');
    expect(JSON.parse(String(init.body))).toEqual({ message: 'The pay button is hidden on my phone', page: '/app', app: APP_SOURCE });
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer t');
  });

  it('too short or too long is a 400 and nothing is forwarded; no session is a 401', async () => {
    const f = vi.fn(); vi.stubGlobal('fetch', f);
    const { POST } = await import('@/app/api/bff/feedback/route');
    expect((await POST(post({ message: 'x' }))).status).toBe(400);
    expect((await POST(post({ message: 'a'.repeat(2001) }))).status).toBe(400);
    expect((await POST(post({ message: 'a real message' }, ''))).status).toBe(401);
    expect(f).not.toHaveBeenCalled();
  });
});

describe('the form', () => {
  it('says WHY it refused, instead of a button that silently does nothing', () => {
    render(<FeedbackCard f={en.feedback} />);
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(screen.getByRole('alert').textContent).toBe(en.feedback.tooShort);
  });

  it('sends, thanks, and says what happens next', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('{}', { status: 201 })));
    render(<FeedbackCard f={en.feedback} page="/help" />);
    fireEvent.change(screen.getByLabelText(en.feedback.title), { target: { value: 'Love the new budget card' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    await waitFor(() => expect(screen.getByText(en.feedback.thanks)).toBeTruthy());
    expect(screen.getByText(en.feedback.thanksHint)).toBeTruthy();
  });

  it("the server's own reason is shown (the hourly limit is not something the client can know)", async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ message: 'Too many messages in the last hour' }), { status: 429 })));
    render(<FeedbackCard f={en.feedback} />);
    fireEvent.change(screen.getByLabelText(en.feedback.title), { target: { value: 'one more thing' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    await waitFor(() => expect(screen.getByRole('alert').textContent).toBe('Too many messages in the last hour'));
  });
});

describe('the help page', () => {
  it('answers the questions and holds the form, with privacy and terms one tap away', () => {
    render(<HelpPage />);
    expect(screen.getByRole('heading', { name: en.help.title })).toBeTruthy();
    expect(screen.getByText(en.help.q2)).toBeTruthy();
    expect(screen.getByLabelText(en.feedback.title)).toBeTruthy();
    expect(screen.getByRole('link', { name: en.help.privacy }).getAttribute('href')).toBe('/privacy');
  });

  it('in Arabic on an Arabic phone, right-to-left', async () => {
    Object.defineProperty(navigator, 'languages', { value: ['ar'], configurable: true });
    const { container } = render(<HelpPage />);
    await waitFor(() => expect(container.querySelector('main')?.getAttribute('dir')).toBe('rtl'));
    Object.defineProperty(navigator, 'languages', { value: ['en-US'], configurable: true });
  });
});
