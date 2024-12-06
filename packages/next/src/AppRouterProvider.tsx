'use client';

import createCache from '@emotion/cache';
import type { Options } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import type { Theme } from '@react-universal/core';
import { ThemeProvider } from '@react-universal/core';
import { isString } from '@react-universal/utils';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';

export interface AppRouterProdivderProps {
  children: React.ReactNode;
  /**
   * These are the options passed to `createCache()` from
   * `import createCache from '@emotion/cache'`.
   */
  options?: Partial<Options> & {
    /**
     * If `true`, the generated styles are wrapped within `@layer 🌌`. This is
     * useful if you want to override the React Universal's generated styles
     * with a different styling solution, like Tailwind CSS, plain CSS etc.
     */
    enableCssLayer?: boolean;
  };
  theme?: Theme;
}

export const AppRouterProdivder: React.FC<AppRouterProdivderProps> = ({
  children,
  options,
  theme,
}) => {
  const [registry] = useState(() => {
    const cache = createCache({ ...options, key: options?.key ?? 'u' });
    cache.compat = true;

    const _insert = cache.insert;
    let inserted: { name: string; global: boolean }[] = [];

    cache.insert = (...args) => {
      if (options?.enableCssLayer) {
        args[1].styles = `@layer 🌌 {${args[1].styles}}`;
      }
      const [selector, serialized] = args;
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({
          name: serialized.name,
          global: !selector,
        });
      }
      return _insert(...args);
    };

    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };

    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const inserted = registry.flush();
    if (inserted.length === 0) {
      return null;
    }
    let styles = '';
    let dataEmotion = registry.cache.key;

    const globals: {
      name: string;
      style: string;
    }[] = [];

    for (const { name, global } of inserted) {
      const style = registry.cache.inserted[name];

      if (isString(style)) {
        if (global) {
          globals.push({ name, style });
        } else {
          styles += style;
          dataEmotion += ` ${name}`;
        }
      }
    }

    return (
      <>
        {globals.map(({ name, style }) => (
          <style
            key={name}
            data-emotion={`${registry.cache.key}-global ${name}`}
            nonce={options?.nonce}
            // biome-ignore lint/security/noDangerouslySetInnerHtml:
            dangerouslySetInnerHTML={{ __html: style }}
          />
        ))}
        {styles && (
          <style
            data-emotion={dataEmotion}
            nonce={options?.nonce}
            // biome-ignore lint/security/noDangerouslySetInnerHtml:
            dangerouslySetInnerHTML={{ __html: styles }}
          />
        )}
      </>
    );
  });

  return (
    <CacheProvider value={registry.cache}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
};
