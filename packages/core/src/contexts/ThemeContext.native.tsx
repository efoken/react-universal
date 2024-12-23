import { useEffect } from 'react';
import { UnistylesProvider, UnistylesRegistry, useStyles } from 'react-native-unistyles';
import { StyleRuntime } from '../StyleRuntime';
import { fontPlugin, remPlugin } from '../stylePlugins';
import { defaultTheme } from '../theme/defaultTheme';
import { extractTheme } from '../theme/extractTheme';
import type { UniversalProviderProps } from './ThemeContext.types';

export const UniversalProvider: React.FC<UniversalProviderProps> = ({
  children,
  theme = defaultTheme,
}) => {
  UnistylesRegistry.addThemes({
    light: extractTheme(theme, 'light'),
    dark: extractTheme(theme, 'dark'),
  })
    .addBreakpoints(theme.breakpoints ?? defaultTheme.breakpoints)
    .addConfig({
      experimentalCSSMediaQueries: false,
      initialTheme: 'light',
      // @ts-expect-error: Plugin `runtime` types differ on purpose
      plugins: [remPlugin(theme), fontPlugin(theme)],
    });

  useEffect(() => {
    // @ts-expect-error
    StyleRuntime.updateTheme('light', () => extractTheme(theme, 'light'));
    // @ts-expect-error
    StyleRuntime.updateTheme('dark', () => extractTheme(theme, 'dark'));
  }, [theme]);

  return <UnistylesProvider>{children}</UnistylesProvider>;
};

export function useTheme() {
  return useStyles().theme;
}
