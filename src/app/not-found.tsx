'use client';

// A link that leads nowhere lands here — in the person's language, with the way home (E1).

import Link from 'next/link';
import { StateScreen, useStateStrings, primaryButton } from '@/components/states/StateScreen';

export default function NotFound() {
  const { s, dir, lang } = useStateStrings();
  return (
    <StateScreen icon="🔍" title={s.notFoundTitle} body={s.notFoundBody} dir={dir} lang={lang}>
      <Link href="/" style={{ ...primaryButton, display: 'block', textDecoration: 'none', lineHeight: '20px' }}>{s.goHome}</Link>
    </StateScreen>
  );
}
