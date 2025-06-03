import { useEffect } from 'react';
import { experimental_LayoutConformance as RNLayoutConformance } from 'react-native';
import { UnistylesProvider, UnistylesRegistry, useStyles } from 'react-native-unistyles';
import { StyleRuntime } from '../StyleRuntime';
import { fontPlugin, polyfillPlugin, remPlugin } from '../stylePlugins';
import { defaultTheme } from '../theme/defaultTheme';
import { extractTheme } from '../theme/extractTheme';
import type { UniversalProviderProps } from './ThemeContext.types';

export const UniversalProvider: React.FC<UniversalProviderProps> = ({
  children,
  theme = defaultTheme,
}) => {
  UnistylesRegistry.addThemes({
    // @ts-expect-error
    light: extractTheme(theme, 'light'),
    // @ts-expect-error
    dark: extractTheme(theme, 'dark'),
  })
    .addBreakpoints(theme.breakpoints ?? defaultTheme.breakpoints)
    .addConfig({
      experimentalCSSMediaQueries: false,
      initialTheme: 'light',
      // @ts-expect-error: Plugin `runtime` types differ on purpose
      plugins: [remPlugin(theme), fontPlugin(theme), polyfillPlugin(theme)],
    });

  useEffect(() => {
    StyleRuntime.updateTheme('light', () => extractTheme(theme, 'light'));
    StyleRuntime.updateTheme('dark', () => extractTheme(theme, 'dark'));
  }, [theme]);

  return (
    <RNLayoutConformance mode="strict">
      <UnistylesProvider>{children}</UnistylesProvider>
    </RNLayoutConformance>
  );
};

export function useTheme() {
  return useStyles().theme;
}
