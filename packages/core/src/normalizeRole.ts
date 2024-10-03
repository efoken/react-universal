import type { Role as RNRole } from 'react-native';
import type { AccessibilityRole } from './types';

export function normalizeRole(role?: AccessibilityRole): RNRole | undefined {
  return role === 'code' ||
    role === 'label' ||
    role === 'listbox' ||
    role === 'paragraph' ||
    role === 'textbox'
    ? undefined
    : role;
}
