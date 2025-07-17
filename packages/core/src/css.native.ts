import type { AnyObject } from '@react-universal/utils';
import { isString, runIfFunction } from '@react-universal/utils';
import { StyleSheet } from 'react-native';
import type { UnistylesValues } from 'react-native-unistyles';
import { createStyleSheet as createUnistylesStyleSheet } from 'react-native-unistyles';
import type { StyleMiniRuntime } from './StyleRuntime';
import type { Theme } from './theme';
import type { RNStyle, RNStyleWeb, StyleProp, StyleValues } from './types';
import { parseRem } from './utils/parseRem';

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
  'borderCurve',
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
  'elevation',
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
  'includeFontPadding',
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

function parseStyle<T extends AnyObject>(
  style: T,
  theme: Theme,
): Omit<T, keyof UnistylesValues> & UnistylesValues {
  const nextStyle = {} as Omit<T, keyof UnistylesValues> & UnistylesValues;

  for (let [styleProp, styleValue] of Object.entries(style)) {
    if (process.env.NODE_ENV !== 'production' && !isAllowedStyleProp(styleProp)) {
      console.warn(`React Universal: unsupported style property "${styleProp}"`);
    }

    if (isString(styleValue) && /^\d+(\.\d+)?(em|rem|px)?$/.test(styleValue)) {
      styleValue = parseRem(styleValue);
    }

    switch (styleProp) {
      // Layout
      case 'blockSize': {
        nextStyle.height = style.height ?? styleValue;
        break;
      }
      case 'inlineSize': {
        nextStyle.width = style.width ?? styleValue;
        break;
      }
      case 'maxBlockSize': {
        nextStyle.maxHeight = style.maxHeight ?? styleValue;
        break;
      }
      case 'maxInlineSize': {
        nextStyle.maxWidth = style.maxWidth ?? styleValue;
        break;
      }
      case 'minBlockSize': {
        nextStyle.minHeight = style.minHeight ?? styleValue;
        break;
      }
      case 'minInlineSize': {
        nextStyle.minWidth = style.minWidth ?? styleValue;
        break;
      }
      // Borders
      case 'borderBlockStyle': {
        // @ts-expect-error: It's currently missing in React Native
        nextStyle.borderBottomStyle = style.borderBottomStyle ?? styleValue;
        // @ts-expect-error: It's currently missing in React Native
        nextStyle.borderTopStyle = style.borderTopStyle ?? styleValue;
        break;
      }
      case 'borderBlockEndStyle': {
        // @ts-expect-error: It's currently missing in React Native
        nextStyle.borderBottomStyle = style.borderBottomStyle ?? styleValue;
        break;
      }
      case 'borderBlockEndWidth': {
        nextStyle.borderBottomWidth = style.borderBottomWidth ?? styleValue;
        break;
      }
      case 'borderBlockStartStyle': {
        // @ts-expect-error: It's currently missing in React Native
        nextStyle.borderTopStyle = style.borderTopStyle ?? styleValue;
        break;
      }
      case 'borderBlockStartWidth': {
        nextStyle.borderTopWidth = style.borderTopWidth ?? styleValue;
        break;
      }
      case 'borderBlockWidth': {
        nextStyle.borderBottomWidth = style.borderBottomWidth ?? styleValue;
        nextStyle.borderTopWidth = style.borderTopWidth ?? styleValue;
        break;
      }
      case 'borderInlineColor': {
        nextStyle.borderEndColor = style.borderEndColor ?? styleValue;
        nextStyle.borderStartColor = style.borderStartColor ?? styleValue;
        break;
      }
      case 'borderInlineStyle': {
        // @ts-expect-error: It's currently missing in React Native
        nextStyle.borderEndStyle = style.borderEndStyle ?? styleValue;
        // @ts-expect-error: It's currently missing in React Native
        nextStyle.borderStartStyle = style.borderStartStyle ?? styleValue;
        break;
      }
      case 'borderInlineEndColor': {
        nextStyle.borderEndColor = style.borderEndColor ?? styleValue;
        break;
      }
      case 'borderInlineEndStyle': {
        // @ts-expect-error: It's currently missing in React Native
        nextStyle.borderEndStyle = style.borderEndStyle ?? styleValue;
        break;
      }
      case 'borderInlineEndWidth': {
        nextStyle.borderEndWidth = style.borderEndWidth ?? styleValue;
        break;
      }
      case 'borderInlineStartColor': {
        nextStyle.borderStartColor = style.borderStartColor ?? styleValue;
        break;
      }
      case 'borderInlineStartStyle': {
        // @ts-expect-error: It's currently missing in React Native
        nextStyle.borderStartStyle = style.borderStartStyle ?? styleValue;
        break;
      }
      case 'borderInlineStartWidth': {
        nextStyle.borderStartWidth = style.borderStartWidth ?? styleValue;
        break;
      }
      case 'borderInlineWidth': {
        nextStyle.borderEndWidth = style.borderEndWidth ?? styleValue;
        nextStyle.borderStartWidth = style.borderStartWidth ?? styleValue;
        break;
      }
      // Flex
      case 'placeContent': {
        nextStyle.alignContent = styleValue;
        nextStyle.justifyContent = styleValue;
        break;
      }
      case 'fontWeight': {
        for (const [fontWeight, fontFamilies] of Object.entries(theme.fonts.body.weights)) {
          if (String(styleValue) === fontWeight) {
            nextStyle.fontFamily = fontFamilies.normal;
            break;
          }
        }
        break;
      }
      default: {
        // @ts-expect-error: Force assignment
        nextStyle[styleProp] = styleValue;
      }
    }
  }

  return nextStyle;
}

type CSS = {
  props<T extends AnyObject>(style: StyleProp<T>): { className?: string; style: T };
  create<T extends AnyObject<StyleValues>>(
    stylesheet: T | ((theme: Theme, runtime: StyleMiniRuntime) => T),
  ): (theme: Theme, runtime: StyleMiniRuntime) => Record<keyof T, AnyObject>;
};

export const css = {
  props<T extends AnyObject>(style: StyleProp<T>): { className?: string; style: T } {
    return { style: StyleSheet.flatten(style) };
  },

  create<T extends AnyObject<StyleValues>>(
    stylesheet: T | ((theme: Theme, runtime: StyleMiniRuntime) => T),
    id: number,
  ) {
    return createUnistylesStyleSheet((theme, runtime) => {
      // @ts-expect-error
      const _stylesheet = runIfFunction(stylesheet, theme, {
        ...runtime,
        breakpoints: theme.breakpoints,
      });

      return Object.fromEntries(
        // @ts-expect-error
        Object.entries(_stylesheet).map(([name, style]) => [name, parseStyle(style, theme)]),
      ) as Record<keyof T, AnyObject>;
      // @ts-expect-error: this argument is hidden in Unistyles type definition
    }, id) as unknown;
  },
} as CSS;
