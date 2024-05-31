import { isArray, isNumber } from '@universal-ui/utils';

const emptyStyle = {};

const standardProps: Record<string, string> = {
  borderBottomEndRadius: 'borderEndEndRadius',
  borderBottomStartRadius: 'borderEndStartRadius',
  borderEndColor: 'borderInlineEndColor',
  borderEndStyle: 'borderInlineEndStyle',
  borderEndWidth: 'borderInlineEndWidth',
  borderStartColor: 'borderInlineStartColor',
  borderStartStyle: 'borderInlineStartStyle',
  borderStartWidth: 'borderInlineStartWidth',
  borderTopEndRadius: 'borderStartEndRadius',
  borderTopStartRadius: 'borderStartStartRadius',
  // end: 'insetInlineEnd',
  // marginEnd: 'marginInlineEnd',
  // marginHorizontal: 'marginInline',
  // marginStart: 'marginInlineStart',
  // marginVertical: 'marginBlock',
  // paddingEnd: 'paddingInlineEnd',
  // paddingHorizontal: 'paddingInline',
  // paddingStart: 'paddingInlineStart',
  // paddingVertical: 'paddingBlock',
  // start: 'insetInlineStart',
};

const ignoredProps: Record<string, boolean> = {
  elevation: true,
  includeFontPadding: true,
};

export function preprocess<T extends Record<string, any>>(style: T = emptyStyle as T): T {
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

  for (const originalProp of Object.keys(style)) {
    if (
      // Ignore some React Native styles
      ignoredProps[originalProp] != null ||
      originalProp === 'textShadowColor' ||
      originalProp === 'textShadowOffset' ||
      originalProp === 'textShadowRadius'
    ) {
      continue;
    }

    const originalValue = style[originalProp];
    const prop = standardProps[originalProp] || originalProp;
    let value = originalValue;

    if (
      !Object.prototype.hasOwnProperty.call(style, originalProp) ||
      (prop !== originalProp && style[prop] != null)
    ) {
      continue;
    }

    if (prop === 'aspectRatio' && isNumber(value)) {
      nextStyle[prop] = value.toString();
    } else if (prop === 'fontVariant') {
      if (isArray(value) && value.length > 0) {
        value = value.join(' ');
      }
      nextStyle[prop] = value;
    } else {
      // @ts-expect-error: Force assignment
      nextStyle[prop] = value;
    }
  }

  return nextStyle as any;
}
