import { mergeDeep } from '@universal-ui/utils';
import { defaultTheme, type Theme } from './defaultTheme';

interface PartialTheme
  extends Partial<Omit<Theme, 'breakpoints' | 'colors' | 'fonts' | 'space'>> {
  breakpoints?: Partial<Theme['breakpoints']>;
  colors?: Partial<Theme['colors']>;
  fonts?: Partial<Theme['fonts']>;
  space?: Partial<Theme['space']>;
}

export function createTheme(theme: PartialTheme = {}) {
  return mergeDeep<Theme>(defaultTheme, theme);
}
