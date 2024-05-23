'use client';

import { createContext, useContext, useMemo } from 'react';

const LocaleContext = createContext<{
  direction: 'ltr' | 'rtl';
  locale: Intl.UnicodeBCP47LocaleIdentifier;
}>({
  direction: 'ltr',
  locale: 'en-US',
});

const rtlScripts = new Set([
  'Arab',
  'Syrc',
  'Samr',
  'Mand',
  'Thaa',
  'Mend',
  'Nkoo',
  'Adlm',
  'Rohg',
  'Hebr',
]);

const cache = new Map<Intl.UnicodeBCP47LocaleIdentifier, boolean>();

function isLocaleRTL(locale: Intl.UnicodeBCP47LocaleIdentifier) {
  let isRtl = cache.get(locale);

  if (isRtl != null) {
    return isRtl;
  }

  const { script } = new Intl.Locale(locale).maximize();
  isRtl = rtlScripts.has(script!);

  cache.set(locale, isRtl);
  return isRtl;
}

export function getLocaleDirection(locale: Intl.UnicodeBCP47LocaleIdentifier) {
  return isLocaleRTL(locale) ? 'rtl' : 'ltr';
}

export interface LocaleProviderProps {
  children: React.ReactNode;
  direction?: 'ltr' | 'rtl';
  locale?: Intl.UnicodeBCP47LocaleIdentifier;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({
  children,
  direction,
  locale,
}) => {
  const needsContext = direction != null || locale != null;

  const context = useMemo(
    () => ({
      direction: locale ? getLocaleDirection(locale) : direction!,
      locale: locale ?? 'en-US',
    }),
    [direction, locale],
  );

  return needsContext ? (
    <LocaleContext.Provider value={context}>{children}</LocaleContext.Provider>
  ) : (
    children
  );
};

export function useLocale() {
  return useContext(LocaleContext);
}
