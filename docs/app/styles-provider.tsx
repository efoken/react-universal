'use client';

import type { Theme } from '@universal-ui/core';
import { ThemeProvider } from '@universal-ui/core';

export function StylesProvider({
  children,
  theme,
}: Readonly<{
  children: React.ReactNode;
  theme?: Theme;
}>) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
