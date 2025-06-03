import type {
  AccessibilityProps,
  LayoutEvent,
  PlatformMethods,
  ResponderConfig,
  ResponderEvent,
  RNStyle,
  StyleProp,
  SxProps,
} from '@react-universal/core';
import type { AnyObject } from '@react-universal/utils';
import type {
  AccessibilityProps as RNAccessibilityProps,
  ViewProps as RNViewProps,
} from 'react-native';

export interface ViewMethods extends PlatformMethods {}

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
      | 'onTouchCancel'
      | 'onTouchEnd'
      | 'onTouchEndCapture'
      | 'onTouchMove'
      | 'onTouchStart'
      | 'pointerEvents'
      | 'style'
    >,
    AccessibilityProps,
    ResponderConfig {
  as?: React.ElementType;
  dataSet?: AnyObject;
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
  onTouchCancel?: (event: ResponderEvent) => void;
  onTouchEnd?: (event: ResponderEvent) => void;
  onTouchEndCapture?: (event: ResponderEvent) => void;
  onTouchMove?: (event: ResponderEvent) => void;
  onTouchStart?: (event: ResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type ViewType = React.FC<
  React.PropsWithoutRef<ViewProps> & React.RefAttributes<HTMLElement & ViewMethods>
>;

export type ViewOwnerState = Pick<ViewProps, 'role'> & {
  hasTextAncestor: boolean;
};
