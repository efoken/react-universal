import type {
  AccessibilityProps as RNAccessibilityProps,
  Role as RNRole,
} from 'react-native';

export interface AccessibilityProps
  extends Omit<
    RNAccessibilityProps,
    | 'accessibilityActions'
    | 'accessibilityElementsHidden'
    | 'accessibilityLabel'
    | 'accessibilityLabelledBy'
    | 'accessibilityLiveRegion'
    | 'accessibilityRole'
    | 'accessibilityState'
    | 'accessibilityValue'
    | 'accessibilityViewIsModal'
    | 'importantForAccessibility'
    | 'role'
  > {
  'aria-level'?: number;
  role?: 'label' | 'listbox' | 'paragraph' | RNRole;
}
