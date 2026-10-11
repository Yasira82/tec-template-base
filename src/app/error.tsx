'use client';

// A screen that broke says so, in the person's language, and offers a way out —
// try again, or go home. Never a blank page, never a stack trace (E1). The error is
// reported, not swallowed (C-96).

import Link from 'next/link';
import { useEffect } from 'react';
import { reportError } from '@/lib/observability/reportError';
import { StateScreen, useStateStrings, primaryButton, secondaryLink } from '@/components/states/StateScreen';

export default function ErrorScreen({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { s, dir, lang } = useStateStrings();
  useEffect(() => { reportError(error, { boundary: 'app/error', digest: error.digest }); }, [error]);
  return (
    <StateScreen icon="⚠️" title={s.errorTitle} body={s.errorBody} dir={dir} lang={lang}>
      <button type="button" onClick={() => reset()} style={primaryButton}>{s.retry}</button>
      <div><Link href="/" style={secondaryLink}>{s.goHome}</Link></div>
    </StateScreen>
  );
}
