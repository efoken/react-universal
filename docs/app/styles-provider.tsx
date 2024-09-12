'use client';

import type { Theme } from '@react-universal/core';
import { ThemeProvider } from '@react-universal/core';

export function StylesProvider({
  children,
  theme,
}: Readonly<{
  children: React.ReactNode;
  theme?: Theme;
}>) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
