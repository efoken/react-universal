import type { Role as RNRole } from 'react-native';
import type { AccessibilityRole } from './types';

export function normalizeRole(role?: AccessibilityRole): RNRole | undefined {
  return role === 'blockquote' ||
    role === 'code' ||
    role === 'deletion' ||
    role === 'emphasis' ||
    role === 'insertion' ||
    role === 'listbox' ||
    role === 'paragraph' ||
    role === 'strong' ||
    role === 'textbox'
    ? undefined
    : role;
}
