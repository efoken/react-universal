'use client';

import { mergeDeep } from '@universal-ui/utils';
import { useEffect } from 'react';
import {
  UnistylesRegistry,
  UnistylesRuntime,
  UnistylesThemes,
  useStyles,
} from 'react-native-unistyles';
import { Theme, defaultTheme } from './defaultTheme';
import { fontWeightPlugin, remPlugin } from './stylePlugins';

export interface ThemeProviderProps {
  children?: React.ReactNode;
  options?: {
    initialTheme: keyof UnistylesThemes;
  };
  theme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  options,
  theme,
}) => {
  UnistylesRegistry.addThemes({
    light: mergeDeep(defaultTheme, theme),
    dark: mergeDeep(defaultTheme, theme),
  })
    .addBreakpoints(theme?.breakpoints ?? defaultTheme.breakpoints)
    .addConfig({
      experimentalCSSMediaQueries: false,
      initialTheme: options?.initialTheme ?? 'light',
      plugins: [remPlugin, fontWeightPlugin],
    });

  useEffect(() => {
    if (theme) {
      UnistylesRuntime.updateTheme('light', () => theme);
    }
  }, [theme]);

  return children;
};

export function useTheme() {
  return useStyles().theme;
}
