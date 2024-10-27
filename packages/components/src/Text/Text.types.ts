import type {
  AccessibilityProps,
  LayoutEvent,
  PlatformMethods,
  RNStyle,
  StyleProp,
  SxProps,
} from '@react-universal/core';
import type {
  AccessibilityProps as RNAccessibilityProps,
  TextProps as RNTextProps,
} from 'react-native';

export interface TextMethods extends PlatformMethods {}

export type TextStyle = Omit<RNStyle, 'objectFit'>;

export interface TextProps
  extends Omit<
      RNTextProps,
      keyof RNAccessibilityProps | 'nativeID' | 'onLayout' | 'selectable' | 'style'
    >,
    AccessibilityProps {
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
  onClick?: NonNullable<RNTextProps['onPress']>;
  /**
   * Callback invoked on mount and layout changes.
   */
  onLayout?: (event: LayoutEvent) => void;
  style?: StyleProp<TextStyle>;
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type TextType = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<TextProps> & React.RefAttributes<HTMLElement & TextMethods>
>;

export type TextOwnerState = Pick<TextProps, 'numberOfLines' | 'role'> & {
  hasTextAncestor: boolean;
  pressable: boolean;
};
