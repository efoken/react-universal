import { useEffect } from 'react';
import { experimental_LayoutConformance as RNLayoutConformance } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { StyleRuntime } from '../StyleRuntime';
import { defaultTheme } from '../theme/defaultTheme';
import { extractTheme } from '../theme/extractTheme';
import type { UniversalProviderProps } from './ThemeContext.types';

export const UniversalProvider: React.FC<UniversalProviderProps> = ({
  children,
  theme = defaultTheme,
}) => {
  StyleSheet.configure({
    breakpoints: theme.breakpoints ?? defaultTheme.breakpoints,
    settings: {
      initialTheme: 'light',
    },
    themes: {
      // @ts-expect-error
      light: extractTheme(theme, 'light'),
      // @ts-expect-error
      dark: extractTheme(theme, 'dark'),
    },
  });

  useEffect(() => {
    StyleRuntime.updateTheme('light', () => extractTheme(theme, 'light'));
    StyleRuntime.updateTheme('dark', () => extractTheme(theme, 'dark'));
  }, [theme]);

  return <RNLayoutConformance mode="strict">{children}</RNLayoutConformance>;
};

export function useTheme() {
  return useUnistyles().theme;
}
