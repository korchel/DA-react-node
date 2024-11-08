import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useMemo } from 'react';

export const EmotionCacheProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cache = useMemo(
    () =>
      createCache({
        key: 'with-tailwind',
        insertionPoint: document.querySelector('title')!,
      }),
    [],
  );
  return <CacheProvider value={cache}>{children}</CacheProvider>;
};
