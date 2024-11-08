import { isArray } from '@react-universal/utils';
import type { RNStyle } from './types';

export function preprocess(style: RNStyle = {}) {
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
    // Ignore some React Native styles
    if (prop === 'borderCurve' || prop === 'elevation' || prop === 'includeFontPadding') {
      continue;
    }

    const originalValue = style[prop];
    let value: any = originalValue;

    if (!Object.hasOwn(style, prop)) {
      continue;
    }

    if (prop === 'fontVariant') {
      if (isArray(value) && value.length > 0) {
        value = value.join(' ');
      }
      nextStyle[prop] = value;
    } else {
      // @ts-expect-error: Force assignment
      nextStyle[prop] = value;
    }
  }

  return nextStyle;
}
