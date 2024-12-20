import { useEffect } from 'react';
import { UnistylesRegistry, useStyles } from 'react-native-unistyles';
import { StyleRuntime } from '../StyleRuntime';
import { fontPlugin, remPlugin } from '../stylePlugins';
import { defaultTheme } from '../theme/defaultTheme';
import type { ThemeProviderProps } from './ThemeContext.types';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme = defaultTheme }) => {
  UnistylesRegistry.addThemes({
    default: theme,
  })
    .addBreakpoints(theme.breakpoints ?? defaultTheme.breakpoints)
    .addConfig({
      experimentalCSSMediaQueries: false,
      initialTheme: 'default',
      // @ts-expect-error: Plugin `runtime` types differ on purpose
      plugins: [remPlugin(theme), fontPlugin(theme)],
    });

  useEffect(() => {
    StyleRuntime.updateTheme('default', () => theme);
  }, [theme]);

  return children;
};

export function useTheme() {
  return useStyles().theme;
}
