'use client';

import { useEffect, useState } from 'react';

export function MswProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function init() {
      if (process.env.NEXT_PUBLIC_MSW_ENABLED === 'true') {
        const { initMocks } = await import('./index');
        await initMocks();
      }
      setIsReady(true);
    }
    init();
  }, []);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}
