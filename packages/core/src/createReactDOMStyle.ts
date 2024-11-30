import { isArray, isString } from '@react-universal/utils';
import { normalizeColor } from './normalizeColor';
import type { RNStyle } from './types';

// https://css-tricks.com/snippets/css/system-font-stack/
const FONT_SYSTEM = 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';

const FONT_MONOSPACE = 'monospace,monospace';

const ignoredProps: Partial<Record<keyof RNStyle, true>> = {
  elevation: true,
  borderCurve: true,
  includeFontPadding: true,
};

const shortFormProps: Partial<Record<keyof RNStyle, (keyof React.CSSProperties)[]>> = {
  borderBlockColor: ['borderBlockEndColor', 'borderBlockStartColor'],
  borderBlockStyle: ['borderBlockEndStyle', 'borderBlockStartStyle'],
  borderBlockWidth: ['borderBlockEndWidth', 'borderBlockStartWidth'],
  borderColor: ['borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor'],
  borderInlineColor: ['borderInlineEndColor', 'borderInlineStartColor'],
  borderInlineStyle: ['borderInlineEndStyle', 'borderInlineStartStyle'],
  borderInlineWidth: ['borderInlineEndWidth', 'borderInlineStartWidth'],
  borderRadius: [
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'borderTopLeftRadius',
    'borderTopRightRadius',
  ],
  borderStyle: ['borderBottomStyle', 'borderLeftStyle', 'borderRightStyle', 'borderTopStyle'],
  borderWidth: ['borderBottomWidth', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth'],
  inset: ['insetBlockEnd', 'insetBlockStart', 'insetInlineEnd', 'insetInlineStart'],
  insetBlock: ['insetBlockEnd', 'insetBlockStart'],
  insetInline: ['insetInlineEnd', 'insetInlineStart'],
  marginBlock: ['marginBlockEnd', 'marginBlockStart'],
  marginInline: ['marginInlineEnd', 'marginInlineStart'],
  paddingBlock: ['paddingBlockEnd', 'paddingBlockStart'],
  paddingInline: ['paddingInlineEnd', 'paddingInlineStart'],
  overflow: ['overflowX', 'overflowY'],
  overscrollBehavior: ['overscrollBehaviorX', 'overscrollBehaviorY'],
};

const colorProps: Partial<Record<Extract<keyof RNStyle, 'color' | `${string}Color`>, true>> = {
  backgroundColor: true,
  borderBlockColor: true,
  borderBlockEndColor: true,
  borderBlockStartColor: true,
  borderBottomColor: true,
  borderColor: true,
  borderInlineColor: true,
  borderInlineEndColor: true,
  borderInlineStartColor: true,
  borderLeftColor: true,
  borderRightColor: true,
  borderTopColor: true,
  caretColor: true,
  color: true,
  scrollbarColor: true,
  textDecorationColor: true,
};

function normalizeValueWithProperty(value: any, prop?: string) {
  if (prop != null && prop in colorProps) {
    return normalizeColor(value);
  }
  return value;
}

export function createReactDOMStyle(style: RNStyle) {
  if (!style) {
    return {};
  }

  const nextStyle: React.CSSProperties = {};

  // Convert text shadow styles
  // if (
  //   (options.textShadow === true,
  //   style.textShadowColor != null ||
  //     style.textShadowOffset != null ||
  //     style.textShadowRadius != null)
  // ) {
  //   console.warn(
  //     'textShadowStyles',
  //     `"textShadow*" style props are deprecated. Use "textShadow".`,
  //   );
  //   const textShadowValue = createTextShadowValue(style);
  //   if (textShadowValue != null && nextStyle.textShadow == null) {
  //     const { textShadow } = style;
  //     const value = textShadow
  //       ? `${textShadow}, ${textShadowValue}`
  //       : textShadowValue;
  //     nextStyle.textShadow = value;
  //   }
  // }

  for (const prop of Object.keys(style) as (keyof RNStyle)[]) {
    if (!Object.hasOwn(style, prop)) {
      continue;
    }

    // Ignore some React Native styles
    if (prop in ignoredProps) {
      continue;
    }

    const value = style[prop];

    // Ignore everything with a null value
    if (value == null) {
      continue;
    }

    switch (prop) {
      case 'flex': {
        if (value === -1) {
          nextStyle.flexGrow = 0;
          nextStyle.flexShrink = 1;
          nextStyle.flexBasis = 'auto';
        } else {
          nextStyle.flex = value;
        }
        break;
      }
      case 'fontFamily': {
        if (isString(value) && value.includes('System')) {
          const stack = value.split(/,\s*/);
          stack[stack.indexOf('System')] = FONT_SYSTEM;
          nextStyle[prop] = stack.join(',');
        } else if (value === 'monospace') {
          nextStyle[prop] = FONT_MONOSPACE;
        } else {
          nextStyle[prop] = value;
        }
        break;
      }
      case 'fontVariant': {
        nextStyle[prop] = isArray(value) && value.length > 0 ? value.join(' ') : value;
        break;
      }
      default: {
        const nextValue = normalizeValueWithProperty(style[prop], prop);
        const longFormProps = shortFormProps[prop];
        if (longFormProps) {
          for (const longFormProp of longFormProps) {
            // The value of any longform property in the original styles takes
            // precedence over the shortform's value.
            if (style[longFormProp as keyof RNStyle] == null) {
              nextStyle[longFormProp] = nextValue;
            }
          }
        } else {
          // @ts-expect-error: Force assignment
          nextStyle[prop] = nextValue;
        }
      }
    }
  }

  return nextStyle;
}
