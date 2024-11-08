import type { AnyObject } from '@react-universal/utils';
import { isArray, isFunction } from '@react-universal/utils';
import type { StyleInterpolation, StyleValues, StyleVariant } from '../types';

function processVariants(
  props: { ownerState?: AnyObject; [key: string]: any },
  variants: StyleVariant<AnyObject>[] = [],
  results: any[] = [],
) {
  let mergedState: AnyObject; // We might not need it, initialized lazily

  // eslint-disable-next-line no-labels
  variantLoop: for (const variant of variants) {
    if (isFunction(variant.props)) {
      mergedState ??= { ...props, ...props.ownerState, ownerState: props.ownerState };
      if (!variant.props(mergedState)) {
        continue;
      }
    } else {
      for (const key in variant.props) {
        if (props[key] !== variant.props[key] && props.ownerState?.[key] !== variant.props[key]) {
          // eslint-disable-next-line no-labels
          continue variantLoop;
        }
      }
    }

    if (isFunction(variant.style)) {
      mergedState ??= { ...props, ...props.ownerState, ownerState: props.ownerState };
      results.push(variant.style(mergedState));
    } else {
      results.push(variant.style);
    }
  }

  return results;
}

export function processStyles<P extends AnyObject>(
  props: P,
  styles?: StyleInterpolation<P>,
): StyleValues | null | undefined | (StyleValues | null | undefined)[] {
  const resolvedStyle = isFunction(styles)
    ? styles(props)
    : typeof styles === 'boolean'
      ? undefined
      : styles;

  if (isArray(resolvedStyle)) {
    return resolvedStyle.flatMap((subStyle) => processStyles(props, subStyle));
  }

  if (isArray(resolvedStyle?.variants)) {
    const { variants, ...otherStyles } = resolvedStyle;
    // @ts-expect-error: Something wrong with type of props inside `variants`
    return processVariants(props, resolvedStyle.variants, [otherStyles]);
  }

  return resolvedStyle;
}
