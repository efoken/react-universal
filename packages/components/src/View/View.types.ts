import type { ResponderConfig } from '@tamagui/react-native-use-responder-events/types/ResponderSystem';
import type {
  LayoutEvent,
  RNStyle,
  StyleProp,
  SxProps,
} from '@universal-ui/core';
import type {
  NativeMethods,
  AccessibilityProps as RNAccessibilityProps,
  ViewProps as RNViewProps,
} from 'react-native';
import type { AccessibilityProps } from '../types';

export interface ViewMethods extends NativeMethods {}

export type ViewStyle = Omit<
  RNStyle,
  | 'color'
  | 'fontFamily'
  | 'fontSize'
  | 'fontStyle'
  | 'fontWeight'
  | 'letterSpacing'
  | 'lineHeight'
  | 'textAlign'
  | 'textDecorationColor'
  | 'textDecorationLine'
  | 'textDecorationStyle'
  | 'textTransform'
  | 'userSelect'
>;

export interface ViewProps
  extends Omit<
      RNViewProps,
      | keyof RNAccessibilityProps
      | 'focusable'
      | 'nativeID'
      | 'onLayout'
      | 'pointerEvents'
      | 'style'
    >,
    AccessibilityProps,
    Partial<
      Pick<
        ResponderConfig,
        | 'onScrollShouldSetResponder'
        | 'onScrollShouldSetResponderCapture'
        | 'onSelectionChangeShouldSetResponder'
        | 'onSelectionChangeShouldSetResponderCapture'
      >
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
