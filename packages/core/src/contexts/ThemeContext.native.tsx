import { useEffect } from 'react';
import { experimental_LayoutConformance as RNLayoutConformance } from 'react-native';
import { UnistylesProvider, UnistylesRegistry, useStyles } from 'react-native-unistyles';
import { StyleRuntime } from '../StyleRuntime';
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
