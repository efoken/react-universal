import type {
  AccessibilityProps as RNAccessibilityProps,
  ImageStyle as RNImageStyle,
  Role as RNRole,
  TextStyle as RNTextStyle,
  TransformsStyle as RNTransformsStyle,
  ViewStyle as RNViewStyle,
} from 'react-native';
import type { Breakpoint } from './breakpoints';
import type { Theme } from './theme/defaultTheme';

export type { DistributiveOmit } from '@emotion/react';

export type AnyProps<T = any> = Record<string, T>;

export type ColorMode = 'light' | 'dark';

export interface RNStyleWeb {
  /** @platform web */
  backgroundClip?: React.CSSProperties['backgroundClip'];
  /** @platform web */
  backgroundImage?: React.CSSProperties['backgroundImage'];
  /** @platform web */
  boxSizing?: React.CSSProperties['boxSizing'];
  /** @platform web */
  caretColor?: React.CSSProperties['caretColor'];
  /** @platform web */
  caretShape?: React.CSSProperties['caretShape'];
  /** @platform web */
  overflowX?: React.CSSProperties['overflowX'];
  /** @platform web */
  overflowY?: React.CSSProperties['overflowY'];
  /** @platform web */
  overscrollBehavior?: React.CSSProperties['overscrollBehavior'];
  /** @platform web */
  overscrollBehaviorX?: React.CSSProperties['overscrollBehaviorX'];
  /** @platform web */
  overscrollBehaviorY?: React.CSSProperties['overscrollBehaviorY'];
  /** @platform web */
  scrollbarColor?: React.CSSProperties['scrollbarColor'];
  /** @platform web */
  scrollbarGutter?: React.CSSProperties['scrollbarGutter'];
  /** @platform web */
  scrollbarWidth?: React.CSSProperties['scrollbarWidth'];
  /** @platform web */
  scrollSnapAlign?: React.CSSProperties['scrollSnapAlign'];
  /** @platform web */
  scrollSnapMarginBottom?: React.CSSProperties['scrollSnapMarginBottom'];
  /** @platform web */
  scrollSnapMarginLeft?: React.CSSProperties['scrollSnapMarginLeft'];
  /** @platform web */
  scrollSnapMarginRight?: React.CSSProperties['scrollSnapMarginRight'];
  /** @platform web */
  scrollSnapMarginTop?: React.CSSProperties['scrollSnapMarginTop'];
  /** @platform web */
  scrollSnapStop?: React.CSSProperties['scrollSnapStop'];
  /** @platform web */
  scrollSnapType?: React.CSSProperties['scrollSnapType'];
  /** @platform web */
  textOverflow?: React.CSSProperties['textOverflow'];
  /** @platform web */
  textWrap?: React.CSSProperties['textWrap'];
  /** @platform web */
  touchAction?: React.CSSProperties['touchAction'];
  /** @platform web */
  visibility?: React.CSSProperties['visibility'];
  /** @platform web */
  whiteSpace?: React.CSSProperties['whiteSpace'];
  /** @platform web */
  wordWrap?: React.CSSProperties['wordWrap'];
}

export interface RNStyle
  extends Omit<
      RNImageStyle & RNTextStyle & RNViewStyle,
      | keyof RNTransformsStyle
      | 'borderBottomWidth'
      | 'borderEndColor'
      | 'borderEndWidth'
      | 'borderLeftWidth'
      | 'borderRightWidth'
      | 'borderStartColor'
      | 'borderStartWidth'
      | 'borderTopWidth'
      | 'bottom'
      | 'columnGap'
      | 'end'
      | 'flexBasis'
      | 'fontSize'
      | 'gap'
      | 'height'
      | 'left'
      | 'margin'
      | 'marginBottom'
      | 'marginEnd'
      | 'marginHorizontal'
      | 'marginLeft'
      | 'marginRight'
      | 'marginStart'
      | 'marginTop'
      | 'marginVertical'
      | 'maxHeight'
      | 'maxWidth'
      | 'minHeight'
      | 'minWidth'
      | 'overlayColor'
      | 'padding'
      | 'paddingBottom'
      | 'paddingEnd'
      | 'paddingHorizontal'
      | 'paddingLeft'
      | 'paddingRight'
      | 'paddingStart'
      | 'paddingTop'
      | 'paddingVertical'
      | 'position'
      | 'resizeMode'
      | 'right'
      | 'rowGap'
      | 'shadowColor'
      | 'shadowOffset'
      | 'shadowOpacity'
      | 'shadowRadius'
      | 'start'
      | 'textAlignVertical'
      | 'textShadowColor'
      | 'textShadowOffset'
      | 'textShadowRadius'
      | 'tintColor'
      | 'top'
      | 'width'
      | 'writingDirection'
    >,
    RNStyleWeb {
  blockSize?: NonNullable<RNViewStyle['height']> | (string & {});
  borderBlockColor?: NonNullable<RNViewStyle['borderColor']>;
  borderBlockEndStyle?: NonNullable<RNViewStyle['borderStyle']>;
  borderBlockEndWidth?: string | number;
  borderBlockStartStyle?: NonNullable<RNViewStyle['borderStyle']>;
  borderBlockStartWidth?: string | number;
  borderBlockStyle?: NonNullable<RNViewStyle['borderStyle']>;
  borderBlockWidth?: string | number;
  borderBottomStyle?: NonNullable<RNViewStyle['borderStyle']>;
  borderBottomWidth?: string | number;
  borderInlineColor?: NonNullable<RNViewStyle['borderColor']>;
  borderInlineEndColor?: NonNullable<RNViewStyle['borderEndColor']>;
  borderInlineEndStyle?: NonNullable<RNViewStyle['borderStyle']>;
  borderInlineEndWidth?: string | number;
  borderInlineStartColor?: NonNullable<RNViewStyle['borderStartColor']>;
  borderInlineStartStyle?: NonNullable<RNViewStyle['borderStyle']>;
  borderInlineStartWidth?: string | number;
  borderInlineStyle?: NonNullable<RNViewStyle['borderStyle']>;
  borderInlineWidth?: string | number;
  borderLeftStyle?: NonNullable<RNViewStyle['borderStyle']>;
  borderLeftWidth?: string | number;
  borderRightStyle?: NonNullable<RNViewStyle['borderStyle']>;
  borderRightWidth?: string | number;
  borderTopStyle?: NonNullable<RNViewStyle['borderStyle']>;
  borderTopWidth?: string | number;
  bottom?: NonNullable<RNViewStyle['bottom']> | (string & {});
  boxShadow?: string;
  columnGap?: string | number;
  flexBasis?: NonNullable<RNViewStyle['flexBasis']> | (string & {});
  fontSize?: NonNullable<RNTextStyle['fontSize']> | (string & {});
  gap?: string | number;
  height?: NonNullable<RNViewStyle['height']> | (string & {});
  inlineSize?: NonNullable<RNViewStyle['width']> | (string & {});
  inset?: NonNullable<RNViewStyle['top']> | (string & {});
  insetBlock?: NonNullable<RNViewStyle['top']> | (string & {});
  insetBlockEnd?: NonNullable<RNViewStyle['bottom']> | (string & {});
  insetBlockStart?: NonNullable<RNViewStyle['top']> | (string & {});
  insetInline?: NonNullable<RNViewStyle['start']> | (string & {});
  insetInlineEnd?: NonNullable<RNViewStyle['end']> | (string & {});
  insetInlineStart?: NonNullable<RNViewStyle['start']> | (string & {});
  left?: NonNullable<RNViewStyle['left']> | (string & {});
  margin?: NonNullable<RNViewStyle['margin']> | (string & {});
  marginBlock?: NonNullable<RNViewStyle['marginVertical']> | (string & {});
  marginBlockEnd?: NonNullable<RNViewStyle['marginBottom']> | (string & {});
  marginBlockStart?: NonNullable<RNViewStyle['marginTop']> | (string & {});
  marginBottom?: NonNullable<RNViewStyle['marginBottom']> | (string & {});
  marginInline?: NonNullable<RNViewStyle['marginHorizontal']> | (string & {});
  marginInlineEnd?: NonNullable<RNViewStyle['marginEnd']> | (string & {});
  marginInlineStart?: NonNullable<RNViewStyle['marginStart']> | (string & {});
  marginLeft?: NonNullable<RNViewStyle['marginLeft']> | (string & {});
  marginRight?: NonNullable<RNViewStyle['marginRight']> | (string & {});
  marginTop?: NonNullable<RNViewStyle['marginTop']> | (string & {});
  maxBlockSize?: NonNullable<RNViewStyle['maxHeight']> | (string & {});
  maxHeight?: NonNullable<RNViewStyle['maxHeight']> | (string & {});
  maxInlineSize?: NonNullable<RNViewStyle['maxWidth']> | (string & {});
  maxWidth?: NonNullable<RNViewStyle['maxWidth']> | (string & {});
  minBlockSize?: NonNullable<RNViewStyle['maxWidth']> | (string & {});
  minHeight?: NonNullable<RNViewStyle['minHeight']> | (string & {});
  minInlineSize?: NonNullable<RNViewStyle['minWidth']> | (string & {});
  minWidth?: NonNullable<RNViewStyle['minWidth']> | (string & {});
  padding?: NonNullable<RNViewStyle['padding']> | (string & {});
  paddingBlock?: NonNullable<RNViewStyle['paddingVertical']> | (string & {});
  paddingBlockEnd?: NonNullable<RNViewStyle['paddingBottom']> | (string & {});
  paddingBlockStart?: NonNullable<RNViewStyle['paddingTop']> | (string & {});
  paddingBottom?: NonNullable<RNViewStyle['paddingBottom']> | (string & {});
  paddingInline?: NonNullable<RNViewStyle['paddingHorizontal']> | (string & {});
  paddingInlineEnd?: NonNullable<RNViewStyle['paddingEnd']> | (string & {});
  paddingInlineStart?: NonNullable<RNViewStyle['paddingStart']> | (string & {});
  paddingLeft?: NonNullable<RNViewStyle['paddingLeft']> | (string & {});
  paddingRight?: NonNullable<RNViewStyle['paddingRight']> | (string & {});
  paddingTop?: NonNullable<RNViewStyle['paddingTop']> | (string & {});
  placeContent?: Exclude<NonNullable<RNViewStyle['alignContent']>, 'stretch'>;
  position?: NonNullable<RNViewStyle['position']> | 'fixed';
  right?: NonNullable<RNViewStyle['right']> | (string & {});
  rowGap?: string | number;
  top?: NonNullable<RNViewStyle['top']> | (string & {});
  transform?: string;
  transformOrigin?: string;
  WebkitOverflowScrolling?: React.CSSProperties['WebkitOverflowScrolling'];
  width?: NonNullable<RNViewStyle['width']> | (string & {});
}

type RNStyleKeys = keyof RNStyle;

export type StyleValues = {
  [K in RNStyleKeys]?: RNStyle[K] | { [B in Breakpoint]?: RNStyle[K] };
};

// export type StyleSheet = Record<string, StyleValues>;

type RecursiveArray<T> = (T | T[] | RecursiveArray<T>)[];

export type StyleProp<T> =
  | T
  | RecursiveArray<T | false | null | undefined>
  | false
  | null
  | undefined;

export type StyleInterpolation<P extends AnyProps> =
  | null
  | undefined
  | boolean
  | StyleValues
  | StyleInterpolation<P>[]
  | ((props: P) => StyleInterpolation<P>);

export type StyleFunction<P extends AnyProps> = (
  props: P,
) => StyleValues | undefined | (StyleValues | undefined)[];

export type SimpleStyleFunction<K extends string> = StyleFunction<
  { theme: Theme } & Partial<Record<K, any>>
> & { filterProps: string[] };

export type OverridableProps<P extends AnyProps, T extends React.ElementType> = P &
  Omit<React.ComponentPropsWithRef<T>, keyof P>;

export interface OverridableComponent<P extends AnyProps, C extends React.ElementType> {
  <T extends React.ElementType>(props: { as: T } & OverridableProps<P, T>): React.ReactNode;
  (props: OverridableProps<P, C>): React.ReactNode;
  displayName?: string;
  propTypes?: any;
}

export type AccessibilityRole = 'code' | 'label' | 'listbox' | 'paragraph' | 'textbox' | RNRole;

export interface AccessibilityProps
  extends Omit<
      RNAccessibilityProps,
      | 'accessibilityActions'
      | 'accessibilityElementsHidden'
      | 'accessibilityLabel'
      | 'accessibilityLabelledBy'
      | 'accessibilityLanguage'
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
