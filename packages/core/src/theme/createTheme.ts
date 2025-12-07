import type { AnyObject, DeepPartial } from '@react-universal/utils';
import { mergeDeep } from '@react-universal/utils';
import type { Theme } from '../defineConfig';
import { defaultTheme } from './defaultTheme';

export function createTheme(theme: DeepPartial<Theme> = {}) {
  return mergeDeep<AnyObject>(defaultTheme, theme) as Theme;
}
