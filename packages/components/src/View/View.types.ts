import type {
  AccessibilityProps,
  LayoutEvent,
  RNStyle,
  ResponderConfig,
  StyleProp,
  SxProps,
} from '@universal-ui/core';
import type {
  NativeMethods,
  AccessibilityProps as RNAccessibilityProps,
  ViewProps as RNViewProps,
} from 'react-native';

export interface ViewMethods extends Omit<NativeMethods, 'refs' | 'setNativeProps'> {}

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
      | keyof ResponderConfig
      | 'focusable'
      | 'nativeID'
      | 'onLayout'
      | 'pointerEvents'
      | 'style'
    >,
    AccessibilityProps,
    ResponderConfig {
  as?: React.ElementType;
  dataSet?: Record<string, any>;
  dir?: 'ltr' | 'rtl' | 'auto';
  href?: string;
  hrefAttrs?: {
    download?: any;
    rel?: string;
    target?: React.HTMLAttributeAnchorTarget;
  };
  lang?: Intl.UnicodeBCP47LocaleIdentifier;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  onKeyDownCapture?: (event: React.KeyboardEvent<HTMLElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLElement>) => void;
  onKeyUpCapture?: (event: React.KeyboardEvent<HTMLElement>) => void;
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

export type ViewType = React.FC<ViewProps & React.RefAttributes<ViewMethods>> & ViewMethods;

export type ViewOwnerState = Pick<ViewProps, 'role'> & {
  hasTextAncestor: boolean;
};
