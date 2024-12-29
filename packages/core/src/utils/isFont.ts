import { isObject } from '@react-universal/utils';
import type { AnyObject } from '@react-universal/utils';
import type { ThemeFont } from '../theme';

export function isFont(obj: AnyObject): obj is ThemeFont {
  return isObject(obj) && 'family' in obj && 'weights' in obj;
}
