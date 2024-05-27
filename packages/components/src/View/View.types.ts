import type { ResponderConfig } from '@tamagui/react-native-use-responder-events/types/ResponderSystem';
import type {
  LayoutEvent,
  RNStyle,
  StyleProp,
  SxProps,
} from '@universal-ui/core';
import type {
  NativeMethods,
  Role as RNRole,
  TextStyle as RNTextStyle,
  ViewProps as RNViewProps,
} from 'react-native';

export interface ViewMethods extends NativeMethods {}

export type ViewStyle = Omit<RNStyle, keyof RNTextStyle>;

export interface ViewProps
  extends Omit<
      RNViewProps,
      | 'accessibilityActions'
      | 'accessibilityElementsHidden'
      | 'accessibilityLabel'
      | 'accessibilityLabelledBy'
      | 'accessibilityLiveRegion'
      | 'accessibilityRole'
      | 'accessibilityState'
      | 'accessibilityValue'
      | 'accessibilityViewIsModal'
      | 'focusable'
      | 'importantForAccessibility'
      | 'onLayout'
      | 'pointerEvents'
      | 'role'
      | 'style'
    >,
    Pick<
      ResponderConfig,
      | 'onScrollShouldSetResponder'
      | 'onScrollShouldSetResponderCapture'
      | 'onSelectionChangeShouldSetResponder'
      | 'onSelectionChangeShouldSetResponderCapture'
    > {
  as?: React.ElementType;
  dir?: 'ltr' | 'rtl' | 'auto';
  href?: string;
  hrefAttrs?: {
    download?: any;
    rel?: string;
    target?: React.HTMLAttributeAnchorTarget;
  };
  lang?: Intl.UnicodeBCP47LocaleIdentifier;
  /**
   * Callback invoked on mount and layout changes.
   */
  onLayout?: (event: LayoutEvent) => void;
  role?: 'listbox' | 'paragraph' | RNRole;
  style?: StyleProp<ViewStyle>;
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type ViewOwnerState = Pick<ViewProps, 'role'> & {
  hasTextAncestor: boolean;
};
