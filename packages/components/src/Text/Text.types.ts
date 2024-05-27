import type {
  LayoutEvent,
  RNStyle,
  StyleProp,
  SxProps,
} from '@universal-ui/core';
import type {
  ImageStyle as RNImageStyle,
  Role as RNRole,
  TextProps as RNTextProps,
} from 'react-native';

export type TextStyle = Omit<RNStyle, keyof RNImageStyle>;

export interface TextProps
  extends Omit<
    RNTextProps,
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
    | 'onLayout'
    | 'role'
    | 'selectable'
    | 'style'
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
  onClick?: NonNullable<RNTextProps['onPress']>;
  /**
   * Callback invoked on mount and layout changes.
   */
  onLayout?: (event: LayoutEvent) => void;
  role?: 'listbox' | 'paragraph' | RNRole;
  style?: StyleProp<TextStyle>;
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type TextOwnerState = Pick<TextProps, 'numberOfLines' | 'role'> & {
  hasTextAncestor: boolean;
  pressable: boolean;
};
