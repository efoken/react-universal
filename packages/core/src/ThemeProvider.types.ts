import type { UnistylesThemes } from 'react-native-unistyles';
import type { Theme } from './theme/defaultTheme';

export interface ThemeProviderProps {
  children?: React.ReactNode;
  options?: {
    initialTheme?: keyof UnistylesThemes;
  };
  theme?: Theme;
}
