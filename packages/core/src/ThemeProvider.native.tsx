import { useEffect } from 'react';
import { UnistylesRegistry, useStyles } from 'react-native-unistyles';
import { StyleRuntime } from './StyleRuntime';
import type { ThemeProviderProps } from './ThemeProvider.types';
import { fontWeightPlugin, remPlugin } from './stylePlugins';
import { defaultTheme } from './theme/defaultTheme';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  options = {},
  theme = defaultTheme,
}) => {
  UnistylesRegistry.addThemes({
    light: theme,
    dark: theme,
  })
    .addBreakpoints(theme.breakpoints ?? defaultTheme.breakpoints)
    .addConfig({
      experimentalCSSMediaQueries: false,
      initialTheme: options.initialTheme ?? 'light',
      plugins: [remPlugin(theme), fontWeightPlugin(theme)],
    });

  useEffect(() => {
    StyleRuntime.updateTheme('light', () => theme);
    StyleRuntime.updateTheme('dark', () => theme);
  }, [theme]);

  return children;
};

export function useTheme() {
  return useStyles().theme;
}
