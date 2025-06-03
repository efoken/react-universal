import type { AnyObject } from '@react-universal/utils';
import { isString } from '@react-universal/utils';
import type {
  ImageStyle as RNImageStyle,
  TextStyle as RNTextStyle,
  ViewStyle as RNViewStyle,
} from 'react-native';
import type { StyleRuntime } from './StyleRuntime';
import type { Theme } from './theme';
import type { RNStyle, RNStyleWeb } from './types';
import { parseRem } from './utils/parseRem';

type StylePlugin = (theme: Theme) => {
  name: string;
  onParsedStyle?: (
    styleKey: string,
    style: AnyObject,
    runtime: typeof StyleRuntime,
  ) => RNImageStyle & RNTextStyle & RNViewStyle;
};

export const remPlugin: StylePlugin = () => ({
  name: 'remPlugin',
  onParsedStyle: (_key, acc) => {
    for (const [key, value] of Object.entries(acc)) {
      if (isString(value) && /^\d+(\.\d+)?(em|rem|px)?$/.test(value)) {
        acc[key] = parseRem(value);
      }
    }
    return acc;
  },
});

export const fontPlugin: StylePlugin = (theme) => ({
  name: 'fontPlugin',
  onParsedStyle: (_key, acc) => {
    if ('fontWeight' in acc) {
      for (const [fontWeight, fontFamilies] of Object.entries(theme.fonts.body.weights)) {
        if (String(acc.fontWeight) === fontWeight) {
          acc.fontFamily = fontFamilies.normal;
          break;
        }
      }
    }
    return acc;
  },
});

const allowedStyleProps = new Set<string>([
  'alignContent',
  'alignItems',
  'alignSelf',
  // 'animationDelay',
  // 'animationDuration',
  'aspectRatio',
  'backfaceVisibility',
  'backgroundColor',
  'blockSize',
  'borderBlockColor',
  'borderBlockEndColor',
  'borderBlockEndStyle',
  'borderBlockEndWidth',
  'borderBlockStartColor',
  'borderBlockStartStyle',
  'borderBlockStartWidth',
  'borderBlockStyle',
  'borderBlockWidth',
  'borderBottomColor',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomStyle',
  'borderBottomWidth',
  'borderColor',
  'borderEndEndRadius',
  'borderEndStartRadius',
  'borderInlineColor',
  'borderInlineEndColor',
  'borderInlineEndStyle',
  'borderInlineEndWidth',
  'borderInlineStartColor',
  'borderInlineStartStyle',
  'borderInlineStartWidth',
  'borderInlineStyle',
  'borderInlineWidth',
  'borderLeftColor',
  'borderLeftStyle',
  'borderLeftWidth',
  'borderRadius',
  'borderRightColor',
  'borderRightStyle',
  'borderRightWidth',
  'borderStartEndRadius',
  'borderStartStartRadius',
  'borderStyle',
  'borderTopColor',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopStyle',
  'borderTopWidth',
  'borderWidth',
  'bottom',
  'boxShadow',
  'boxSizing',
  // 'caretColor',
  'color',
  'columnGap',
  'cursor',
  // 'cursorColor',
  'direction',
  'display',
  'filter',
  'flex',
  'flexBasis',
  'flexDirection',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'gap',
  'height',
  'inlineSize',
  'inset',
  'insetBlock',
  'insetBlockEnd',
  'insetBlockStart',
  'insetInline',
  'insetInlineEnd',
  'insetInlineStart',
  'isolation',
  'justifyContent',
  'left',
  'letterSpacing',
  // 'lineClamp',
  'lineHeight',
  'margin',
  'marginBlock',
  'marginBlockEnd',
  'marginBlockStart',
  'marginBottom',
  'marginInline',
  'marginInlineEnd',
  'marginInlineStart',
  'marginLeft',
  'marginRight',
  'marginTop',
  'maxBlockSize',
  'maxHeight',
  'maxInlineSize',
  'maxWidth',
  'minBlockSize',
  'minHeight',
  'minInlineSize',
  'minWidth',
  'mixBlendMode',
  'objectFit',
  'opacity',
  'outlineColor',
  'outlineOffset',
  'outlineStyle',
  'outlineWidth',
  'overflow',
  'padding',
  'paddingBlock',
  'paddingBlockEnd',
  'paddingBlockStart',
  'paddingBottom',
  'paddingInline',
  'paddingInlineEnd',
  'paddingInlineStart',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'placeContent',
  'pointerEvents',
  'position',
  'right',
  'rowGap',
  'textAlign',
  'textDecorationColor',
  'textDecorationLine',
  'textDecorationStyle',
  // 'textShadow',
  'textTransform',
  'top',
  'transform',
  'transformOrigin',
  // 'transitionDelay',
  // 'transitionDuration',
  // 'transitionProperty',
  // 'transitionTimingFunction',
  'userSelect',
  'verticalAlign',
  // 'visibility',
  'width',
  'zIndex',
] satisfies Exclude<keyof RNStyle, keyof RNStyleWeb>[]);

function isAllowedStyleProp(propName: string) {
  return allowedStyleProps.has(propName);
}

export const polyfillPlugin: StylePlugin = () => ({
  name: 'polyfillPlugin',
  onParsedStyle: (_key, acc) => {
    const flatStyle = { ...acc };
    const nextStyle: RNImageStyle & RNTextStyle & RNViewStyle = {};

    for (const [styleProp, styleValue] of Object.entries(flatStyle)) {
      if (process.env.NODE_ENV !== 'production' && !isAllowedStyleProp(styleProp)) {
        console.warn(`React Universal: unsupported style property "${styleProp}"`);
      }

      switch (styleProp) {
        // Layout
        case 'blockSize': {
          nextStyle.height = flatStyle.height ?? styleValue;
          break;
        }
        case 'inlineSize': {
          nextStyle.width = flatStyle.width ?? styleValue;
          break;
        }
        case 'maxBlockSize': {
          nextStyle.maxHeight = flatStyle.maxHeight ?? styleValue;
          break;
        }
        case 'maxInlineSize': {
          nextStyle.maxWidth = flatStyle.maxWidth ?? styleValue;
          break;
        }
        case 'minBlockSize': {
          nextStyle.minHeight = flatStyle.minHeight ?? styleValue;
          break;
        }
        case 'minInlineSize': {
          nextStyle.minWidth = flatStyle.minWidth ?? styleValue;
          break;
        }
        // Borders
        case 'borderBlockStyle': {
          // @ts-expect-error: It's currently missing in React Native
          nextStyle.borderBottomStyle = flatStyle.borderBottomStyle ?? styleValue;
          // @ts-expect-error: It's currently missing in React Native
          nextStyle.borderTopStyle = flatStyle.borderTopStyle ?? styleValue;
          break;
        }
        case 'borderBlockEndStyle': {
          // @ts-expect-error: It's currently missing in React Native
          nextStyle.borderBottomStyle = flatStyle.borderBottomStyle ?? styleValue;
          break;
        }
        case 'borderBlockEndWidth': {
          nextStyle.borderBottomWidth = flatStyle.borderBottomWidth ?? styleValue;
          break;
        }
        case 'borderBlockStartStyle': {
          // @ts-expect-error: It's currently missing in React Native
          nextStyle.borderTopStyle = flatStyle.borderTopStyle ?? styleValue;
          break;
        }
        case 'borderBlockStartWidth': {
          nextStyle.borderTopWidth = flatStyle.borderTopWidth ?? styleValue;
          break;
        }
        case 'borderBlockWidth': {
          nextStyle.borderBottomWidth = flatStyle.borderBottomWidth ?? styleValue;
          nextStyle.borderTopWidth = flatStyle.borderTopWidth ?? styleValue;
          break;
        }
        case 'borderInlineColor': {
          nextStyle.borderEndColor = flatStyle.borderEndColor ?? styleValue;
          nextStyle.borderStartColor = flatStyle.borderStartColor ?? styleValue;
          break;
        }
        case 'borderInlineStyle': {
          // @ts-expect-error: It's currently missing in React Native
          nextStyle.borderEndStyle = flatStyle.borderEndStyle ?? styleValue;
          // @ts-expect-error: It's currently missing in React Native
          nextStyle.borderStartStyle = flatStyle.borderStartStyle ?? styleValue;
          break;
        }
        case 'borderInlineEndColor': {
          nextStyle.borderEndColor = flatStyle.borderEndColor ?? styleValue;
          break;
        }
        case 'borderInlineEndStyle': {
          // @ts-expect-error: It's currently missing in React Native
          nextStyle.borderEndStyle = flatStyle.borderEndStyle ?? styleValue;
          break;
        }
        case 'borderInlineEndWidth': {
          nextStyle.borderEndWidth = flatStyle.borderEndWidth ?? styleValue;
          break;
        }
        case 'borderInlineStartColor': {
          nextStyle.borderStartColor = flatStyle.borderStartColor ?? styleValue;
          break;
        }
        case 'borderInlineStartStyle': {
          // @ts-expect-error: It's currently missing in React Native
          nextStyle.borderStartStyle = flatStyle.borderStartStyle ?? styleValue;
          break;
        }
        case 'borderInlineStartWidth': {
          nextStyle.borderStartWidth = flatStyle.borderStartWidth ?? styleValue;
          break;
        }
        case 'borderInlineWidth': {
          nextStyle.borderEndWidth = flatStyle.borderEndWidth ?? styleValue;
          nextStyle.borderStartWidth = flatStyle.borderStartWidth ?? styleValue;
          break;
        }
        // Flex
        case 'placeContent': {
          nextStyle.alignContent = styleValue;
          nextStyle.justifyContent = styleValue;
          break;
        }
        default: {
          nextStyle[styleProp as keyof (RNImageStyle & RNTextStyle & RNViewStyle)] = styleValue;
        }
      }
    }
    return flatStyle;
  },
});
