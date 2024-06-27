import type { Role as RNRole } from 'react-native';

export function normalizeRole(
  role?: 'code' | 'label' | 'listbox' | 'paragraph' | 'textbox' | RNRole,
): RNRole | undefined {
  return role === 'code' ||
    role === 'label' ||
    role === 'listbox' ||
    role === 'paragraph' ||
    role === 'textbox'
    ? undefined
    : role;
}
