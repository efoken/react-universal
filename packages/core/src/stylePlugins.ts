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
import { parseBoxShadow } from './utils/parseBoxShadow';
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

export const boxShadowPlugin: StylePlugin = () => ({
  name: 'boxShadowPlugin',
  onParsedStyle: (_key, acc) => {
    if ('boxShadow' in acc && isString(acc.boxShadow)) {
      const parsedShadow = parseBoxShadow(acc.boxShadow);
      if (parsedShadow.length > 1) {
        console.warn(
          'React Universal: Unsupported multiple values for style property "boxShadow".',
        );
      }
      const { offsetX, offsetY, blurRadius, color } = parsedShadow[0];
      acc.shadowColor = color;
      acc.shadowOffset = {
        height: parseRem(offsetY),
        width: parseRem(offsetX),
      };
      acc.shadowOpacity = 1;
      acc.shadowRadius = Number.parseFloat(blurRadius.toString());
      delete acc.boxShadow;
    }
    return acc;
  },
});

export const fontPlugin: StylePlugin = (theme) => ({
  name: 'fontPlugin',
  onParsedStyle: (_key, acc) => {
    if ('fontWeight' in acc) {
      switch (String(acc.fontWeight)) {
        case '700':
        case 'bold': {
          acc.fontFamily = theme.fonts.body.weights[700].normal;
          break;
        }
        default: {
          acc.fontFamily = theme.fonts.body.weights[400].normal;
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
  'aspectRatio',
  'backfaceVisibility',
  'backgroundColor',
  'borderBottomColor',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomStyle',
  'borderBottomWidth',
  'borderColor',
  'borderLeftColor',
  'borderLeftStyle',
  'borderLeftWidth',
  'borderRadius',
  'borderRightColor',
  'borderRightStyle',
  'borderRightWidth',
  'borderStyle',
  'borderTopColor',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopStyle',
  'borderTopWidth',
  'borderWidth',
  'bottom',
  'color',
  'columnGap',
  'direction',
  'display',
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
  'justifyContent',
  'left',
  'letterSpacing',
  'lineHeight',
  'margin',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'objectFit',
  'opacity',
  'overflow',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'pointerEvents',
  'position',
  'right',
  'rowGap',
  'textAlign',
  'textDecorationColor',
  'textDecorationLine',
  'textDecorationStyle',
  'textTransform',
  'top',
  'transform',
  'transformOrigin',
  'userSelect',
  'verticalAlign',
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
    const prevStyle = { ...flatStyle };

    for (const [styleProp, styleValue] of Object.entries(flatStyle)) {
      if (!isAllowedStyleProp(styleProp)) {
        switch (styleProp) {
          // Layout
          case 'blockSize': {
            flatStyle.height = flatStyle.height ?? styleValue;
            break;
          }
          case 'inlineSize': {
            flatStyle.width = flatStyle.width ?? styleValue;
            break;
          }
          case 'maxBlockSize': {
            flatStyle.maxHeight = flatStyle.maxHeight ?? styleValue;
            break;
          }
          case 'maxInlineSize': {
            flatStyle.maxWidth = flatStyle.maxWidth ?? styleValue;
            break;
          }
          case 'minBlockSize': {
            flatStyle.minHeight = flatStyle.minHeight ?? styleValue;
            break;
          }
          case 'minInlineSize': {
            flatStyle.minWidth = flatStyle.minWidth ?? styleValue;
            break;
          }
          // Borders
          case 'borderBlockColor': {
            flatStyle.borderBottomColor = flatStyle.borderBottomColor ?? styleValue;
            flatStyle.borderTopColor = flatStyle.borderTopColor ?? styleValue;
            break;
          }
          case 'borderBlockStyle': {
            flatStyle.borderBottomStyle = flatStyle.borderBottomStyle ?? styleValue;
            flatStyle.borderTopStyle = flatStyle.borderTopStyle ?? styleValue;
            break;
          }
          case 'borderBlockEndColor': {
            flatStyle.borderBottomColor = prevStyle.borderBottomColor ?? styleValue;
            break;
          }
          case 'borderBlockEndStyle': {
            flatStyle.borderBottomStyle = prevStyle.borderBottomStyle ?? styleValue;
            break;
          }
          case 'borderBlockEndWidth': {
            flatStyle.borderBottomWidth = prevStyle.borderBottomWidth ?? styleValue;
            break;
          }
          case 'borderBlockStartColor': {
            flatStyle.borderTopColor = prevStyle.borderTopColor ?? styleValue;
            break;
          }
          case 'borderBlockStartStyle': {
            flatStyle.borderTopStyle = prevStyle.borderTopStyle ?? styleValue;
            break;
          }
          case 'borderBlockStartWidth': {
            flatStyle.borderTopWidth = prevStyle.borderTopWidth ?? styleValue;
            break;
          }
          case 'borderBlockWidth': {
            flatStyle.borderBottomWidth = flatStyle.borderBottomWidth ?? styleValue;
            flatStyle.borderTopWidth = flatStyle.borderTopWidth ?? styleValue;
            break;
          }
          case 'borderInlineColor': {
            flatStyle.borderEndColor = styleValue;
            flatStyle.borderStartColor = styleValue;
            break;
          }
          case 'borderInlineStyle': {
            flatStyle.borderEndStyle = styleValue;
            flatStyle.borderStartStyle = styleValue;
            break;
          }
          case 'borderInlineEndColor': {
            flatStyle.borderEndColor = styleValue;
            break;
          }
          case 'borderInlineEndStyle': {
            flatStyle.borderEndStyle = styleValue;
            break;
          }
          case 'borderInlineEndWidth': {
            flatStyle.borderEndWidth = styleValue;
            break;
          }
          case 'borderInlineStartColor': {
            flatStyle.borderStartColor = styleValue;
            break;
          }
          case 'borderInlineStartStyle': {
            flatStyle.borderStartStyle = styleValue;
            break;
          }
          case 'borderInlineStartWidth': {
            flatStyle.borderStartWidth = styleValue;
            break;
          }
          case 'borderInlineWidth': {
            flatStyle.borderEndWidth = styleValue;
            flatStyle.borderStartWidth = styleValue;
            break;
          }
          // Positions
          case 'inset': {
            flatStyle.bottom = flatStyle.bottom ?? styleValue;
            flatStyle.end = flatStyle.end ?? styleValue;
            flatStyle.start = flatStyle.start ?? styleValue;
            flatStyle.top = flatStyle.top ?? styleValue;
            break;
          }
          case 'insetBlock': {
            flatStyle.bottom = flatStyle.bottom ?? styleValue;
            flatStyle.top = flatStyle.top ?? styleValue;
            break;
          }
          case 'insetBlockEnd': {
            flatStyle.bottom = prevStyle.bottom ?? styleValue;
            break;
          }
          case 'insetBlockStart': {
            flatStyle.top = prevStyle.top ?? styleValue;
            break;
          }
          case 'insetInline': {
            flatStyle.end = flatStyle.end ?? styleValue;
            flatStyle.start = flatStyle.start ?? styleValue;
            break;
          }
          case 'insetInlineEnd': {
            flatStyle.end = prevStyle.end ?? styleValue;
            break;
          }
          case 'insetInlineStart': {
            flatStyle.start = prevStyle.start ?? styleValue;
            break;
          }
          // Spacing
          case 'marginBlock': {
            flatStyle.marginVertical = styleValue;
            break;
          }
          case 'marginBlockEnd': {
            flatStyle.marginBottom = flatStyle.marginBottom ?? styleValue;
            break;
          }
          case 'marginBlockStart': {
            flatStyle.marginTop = flatStyle.marginTop ?? styleValue;
            break;
          }
          case 'marginInline': {
            flatStyle.marginHorizontal = styleValue;
            break;
          }
          case 'marginInlineEnd': {
            flatStyle.marginEnd = styleValue;
            break;
          }
          case 'marginInlineStart': {
            flatStyle.marginStart = styleValue;
            break;
          }
          case 'paddingBlock': {
            flatStyle.paddingVertical = styleValue;
            break;
          }
          case 'paddingBlockEnd': {
            flatStyle.paddingBottom = flatStyle.paddingBottom ?? styleValue;
            break;
          }
          case 'paddingBlockStart': {
            flatStyle.paddingTop = flatStyle.paddingTop ?? styleValue;
            break;
          }
          case 'paddingInline': {
            flatStyle.paddingHorizontal = styleValue;
            break;
          }
          case 'paddingInlineEnd': {
            flatStyle.paddingEnd = styleValue;
            break;
          }
          case 'paddingInlineStart': {
            flatStyle.paddingStart = styleValue;
            break;
          }
          // Flex
          case 'placeContent': {
            flatStyle.alignContent = styleValue;
            flatStyle.justifyContent = styleValue;
          }
          // no default
        }
        delete flatStyle[styleProp];
        continue;
      }
    }
    return flatStyle;
  },
});
