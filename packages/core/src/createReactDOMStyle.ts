import type { AnyObject } from '@react-universal/utils';
import { isString } from '@react-universal/utils';
import { normalizeColor } from './normalizeColor';

// https://css-tricks.com/snippets/css/system-font-stack/
const FONT_SYSTEM = 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';

const FONT_MONOSPACE = 'monospace,monospace';

const shortFormProps: AnyObject<string[]> = {
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
  insetBlock: ['insetBlockEnd', 'insetBlockStart'],
  insetInline: ['insetInlineEnd', 'insetInlineStart'],
  marginBlock: ['marginBlockEnd', 'marginBlockStart'],
  marginInline: ['marginInlineEnd', 'marginInlineStart'],
  paddingBlock: ['paddingBlockEnd', 'paddingBlockStart'],
  paddingInline: ['paddingInlineEnd', 'paddingInlineStart'],
  overflow: ['overflowX', 'overflowY'],
  overscrollBehavior: ['overscrollBehaviorX', 'overscrollBehaviorY'],
};

const colorProps: AnyObject<boolean> = {
  backgroundColor: true,
  borderBlockColor: true,
  borderBottomColor: true,
  borderColor: true,
  borderInlineColor: true,
  borderInlineEndColor: true,
  borderInlineStartColor: true,
  borderLeftColor: true,
  borderRightColor: true,
  borderTopColor: true,
  color: true,
  textDecorationColor: true,
  textShadowColor: true,
};

function normalizeValueWithProperty(value: any, prop?: string) {
  if (prop != null && prop in colorProps) {
    return normalizeColor(value);
  }
  return value;
}

export function createReactDOMStyle(style: AnyObject): AnyObject {
  if (!style) {
    return {};
  }

  const nextStyle: React.CSSProperties = {};

  for (const prop of Object.keys(style)) {
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
      default: {
        const nextValue = normalizeValueWithProperty(style[prop], prop);
        const longFormProps = shortFormProps[prop];
        if (longFormProps) {
          for (const longForm of longFormProps) {
            // The value of any longform property in the original styles takes
            // precedence over the shortform's value.
            if (style[longForm] == null) {
              // @ts-expect-error: Force assignment
              nextStyle[longForm] = nextValue;
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
