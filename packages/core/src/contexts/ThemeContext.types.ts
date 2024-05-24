import type { Theme } from '../theme/defaultTheme';

export interface ThemeProviderProps {
  children?: React.ReactNode;
  theme?: Theme;
}
