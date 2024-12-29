import type { AnyObject } from '@react-universal/utils';
import type {
  AccessibilityProps as RNAccessibilityProps,
  ImageStyle as RNImageStyle,
  Role as RNRole,
  TextStyle as RNTextStyle,
  TransformsStyle as RNTransformsStyle,
  ViewStyle as RNViewStyle,
} from 'react-native';
import type { StyleRuntime } from './StyleRuntime';
import type { Breakpoint } from './breakpoints';
import type { Theme } from './theme/defaultTheme';

export type { DistributiveOmit } from '@emotion/react';

export type ColorMode = 'light' | 'dark';

export interface RNStyleWeb {
  /** @platform web */
  backdropFilter?: React.CSSProperties['backdropFilter'];
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
  justifySelf?: React.CSSProperties['justifySelf'];
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
  /** @platform web */
  [key: `--${string}`]: any;
  /** @platform web */
  '&:active'?: RNStyle;
  /** @platform web */
  '&:focus'?: RNStyle;
  /** @platform web */
  '&:hover'?: RNStyle;
}

export interface RNStyle
  extends Omit<
      RNImageStyle & RNTextStyle & RNViewStyle,
      | keyof RNTransformsStyle
      | 'borderBottomEndRadius'
      | 'borderBottomStartRadius'
      | 'borderBottomWidth'
      | 'borderEndColor'
      | 'borderEndWidth'
      | 'borderLeftWidth'
      | 'borderRightWidth'
      | 'borderStartColor'
      | 'borderStartWidth'
      | 'borderTopEndRadius'
      | 'borderTopStartRadius'
      | 'borderTopWidth'
      | 'bottom'
      | 'columnGap'
      | 'display'
      | 'end'
      | 'flexBasis'
      | 'fontSize'
      | 'gap'
      | 'height'
      | 'inset'
      | 'insetBlock'
      | 'insetBlockEnd'
      | 'insetBlockStart'
      | 'insetInline'
      | 'insetInlineEnd'
      | 'insetInlineStart'
      | 'left'
      | 'letterSpacing'
      | 'margin'
      | 'marginBlock'
      | 'marginBlockEnd'
      | 'marginBlockStart'
      | 'marginBottom'
      | 'marginEnd'
      | 'marginHorizontal'
      | 'marginInline'
      | 'marginInlineEnd'
      | 'marginInlineStart'
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
      | 'paddingBlock'
      | 'paddingBlockEnd'
      | 'paddingBlockStart'
      | 'paddingInline'
      | 'paddingInlineEnd'
      | 'paddingInlineStart'
      | 'textShadowOffset'
      | 'textShadowRadius'
      | 'tintColor'
      | 'top'
      | 'width'
      | 'writingDirection'
    >,
    RNStyleWeb {
  blockSize?: NonNullable<RNViewStyle['height']> | (string & {});
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
  display?: RNViewStyle['display'] | 'block' | 'grid';
  filter?: string;
  flexBasis?: NonNullable<RNViewStyle['flexBasis']> | (string & {});
  fontSize?: NonNullable<RNTextStyle['fontSize']> | (string & {});
  gap?: string | number;
  height?: NonNullable<RNViewStyle['height']> | (string & {});
  inlineSize?: NonNullable<RNViewStyle['width']> | (string & {});
  inset?: NonNullable<RNViewStyle['inset']> | (string & {});
  insetBlock?: NonNullable<RNViewStyle['insetBlock']> | (string & {});
  insetBlockEnd?: NonNullable<RNViewStyle['insetBlockEnd']> | (string & {});
  insetBlockStart?: NonNullable<RNViewStyle['insetBlockStart']> | (string & {});
  insetInline?: NonNullable<RNViewStyle['insetInline']> | (string & {});
  insetInlineEnd?: NonNullable<RNViewStyle['insetInlineEnd']> | (string & {});
  insetInlineStart?: NonNullable<RNViewStyle['insetInlineStart']> | (string & {});
  left?: NonNullable<RNViewStyle['left']> | (string & {});
  letterSpacing?: NonNullable<RNTextStyle['letterSpacing']> | (string & {});
  margin?: NonNullable<RNViewStyle['margin']> | (string & {});
  marginBlock?: NonNullable<RNViewStyle['marginBlock']> | (string & {});
  marginBlockEnd?: NonNullable<RNViewStyle['marginBlockEnd']> | (string & {});
  marginBlockStart?: NonNullable<RNViewStyle['marginBlockStart']> | (string & {});
  marginBottom?: NonNullable<RNViewStyle['marginBottom']> | (string & {});
  marginInline?: NonNullable<RNViewStyle['marginInline']> | (string & {});
  marginInlineEnd?: NonNullable<RNViewStyle['marginInlineEnd']> | (string & {});
  marginInlineStart?: NonNullable<RNViewStyle['marginInlineStart']> | (string & {});
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
  paddingBlock?: NonNullable<RNViewStyle['paddingBlock']> | (string & {});
  paddingBlockEnd?: NonNullable<RNViewStyle['paddingBlockEnd']> | (string & {});
  paddingBlockStart?: NonNullable<RNViewStyle['paddingBlockStart']> | (string & {});
  paddingBottom?: NonNullable<RNViewStyle['paddingBottom']> | (string & {});
  paddingInline?: NonNullable<RNViewStyle['paddingInline']> | (string & {});
  paddingInlineEnd?: NonNullable<RNViewStyle['paddingInlineEnd']> | (string & {});
  paddingInlineStart?: NonNullable<RNViewStyle['paddingInlineStart']> | (string & {});
  paddingLeft?: NonNullable<RNViewStyle['paddingLeft']> | (string & {});
  paddingRight?: NonNullable<RNViewStyle['paddingRight']> | (string & {});
  paddingTop?: NonNullable<RNViewStyle['paddingTop']> | (string & {});
  placeContent?: Exclude<NonNullable<RNViewStyle['alignContent']>, 'stretch'>;
  position?: RNViewStyle['position'] | 'fixed' | 'sticky';
  right?: NonNullable<RNViewStyle['right']> | (string & {});
  rowGap?: string | number;
  top?: NonNullable<RNViewStyle['top']> | (string & {});
  transform?: string;
  transformOrigin?: string;
  width?: NonNullable<RNViewStyle['width']> | (string & {});
}

export type StyleValues = {
  [K in keyof RNStyle]?: RNStyle[K] | Partial<Record<Breakpoint, RNStyle[K]>>;
};

export type StyleSheet = AnyObject<StyleValues>;

export type StyleSheetWithSuperPowers =
  | ((theme: Theme, runtime: typeof StyleRuntime) => StyleSheet)
  | StyleSheet;

type RecursiveArray<T> = (T | T[] | RecursiveArray<T>)[];

export type StyleProp<T> =
  | T
  | RecursiveArray<T | false | null | undefined>
  | false
  | null
  | undefined;

export interface StyleVariant<P extends AnyObject> {
  props: Partial<P & P['ownerState']> | ((props: P & Partial<P['ownerState']>) => boolean);
  style?: StyleValues | ((props: P & Partial<P['ownerState']>) => StyleValues);
}

export type StyleInterpolation<P extends AnyObject> =
  | null
  | undefined
  | boolean
  | (StyleValues & { variants?: StyleVariant<P>[] })
  | StyleInterpolation<P>[]
  | ((props: P) => StyleValues & { variants?: StyleVariant<P>[] });

export type StyleFunction<P extends AnyObject> = (
  props: P,
) => StyleValues | undefined | (StyleValues | undefined)[];

export type SimpleStyleFunction<K extends string> = StyleFunction<
  { theme: Theme } & Partial<Record<K, any>>
> & { filterProps: string[] };

export type AccessibilityRole =
  | 'blockquote'
  | 'code'
  | 'deletion'
  | 'emphasis'
  | 'insertion'
  | 'listbox'
  | 'paragraph'
  | 'strong'
  | 'textbox'
  | RNRole;

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
