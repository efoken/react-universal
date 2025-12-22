import type {
  AccessibilityProps,
  LayoutEvent,
  ResponderConfig,
  RNStyle,
  StyleProp,
  SxProps,
} from '@react-universal/core';
import type { AnyObject } from '@react-universal/utils';
import type {
  AccessibilityProps as RNAccessibilityProps,
  TextProps as RNTextProps,
} from 'react-native';

export type TextStyle = Omit<RNStyle, 'objectFit'>;

export interface TextProps
  extends Omit<
      RNTextProps,
      | keyof RNAccessibilityProps
      | 'nativeID'
      | 'onLayout'
      | 'onResponderGrant'
      | 'onResponderMove'
      | 'onResponderRelease'
      | 'onResponderTerminate'
      | 'selectable'
      | 'style'
    >,
    AccessibilityProps,
    Pick<
      ResponderConfig,
      'onResponderGrant' | 'onResponderMove' | 'onResponderRelease' | 'onResponderTerminate'
    > {
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
  /** @platform web */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /** @platform web */
  onClickCapture?: (event: React.MouseEvent<HTMLElement>) => void;
  /** @platform web */
  onContextMenu?: (event: React.MouseEvent<HTMLElement>) => void;
  /** @platform web */
  onContextMenuCapture?: (event: React.MouseEvent<HTMLElement>) => void;
  /** @platform web */
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  /** @platform web */
  onKeyDownCapture?: (event: React.KeyboardEvent<HTMLElement>) => void;
  /** @platform web */
  onKeyUp?: (event: React.KeyboardEvent<HTMLElement>) => void;
  /** @platform web */
  onKeyUpCapture?: (event: React.KeyboardEvent<HTMLElement>) => void;
  /**
   * Callback invoked on mount and layout changes.
   */
  onLayout?: (event: LayoutEvent) => void;
  onMoveShouldSetResponder?: () => boolean;
  onResponderTerminationRequest?: () => boolean;
  onStartShouldSetResponder?: () => boolean;
  style?: StyleProp<TextStyle>;
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type TextOwnerState = Pick<TextProps, 'numberOfLines'> & {
  hasTextAncestor: boolean;
  pressable: boolean;
};
