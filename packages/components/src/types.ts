import type { AccessibilityProps as RNAccessibilityProps, Role as RNRole } from 'react-native';

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
  role?: 'label' | 'listbox' | 'paragraph' | RNRole;
}
