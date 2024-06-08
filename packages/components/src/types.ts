import type { AccessibilityProps as RNAccessibilityProps, Role as RNRole } from 'react-native';

export type AccessibilityRole = 'label' | 'listbox' | 'paragraph' | 'textbox' | RNRole;

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
    >,
    Omit<React.AriaAttributes, keyof RNAccessibilityProps> {
  'aria-atomic'?: boolean;
  'aria-multiline'?: boolean;
  'aria-multiselectable'?: boolean;
  'aria-readonly'?: boolean;
  'aria-required'?: boolean;
  role?: AccessibilityRole;
}
