import type { AnyObject } from '@react-universal/utils';
import { isFunction, runIfFunction } from '@react-universal/utils';
import type { CompoundVariant, StyleInterpolation, StyleValues, StyleVariants } from '../types';

const emptyObject = {};

function processVariants(
  props: { ownerState?: AnyObject; [key: string]: any },
  variants: StyleVariants<AnyObject> = emptyObject,
  compoundVariants: CompoundVariant<AnyObject>[] = [],
  results: any[] = [],
) {
  const mergedState: AnyObject = { ...props, ...props.ownerState, ownerState: props.ownerState };

  for (const key in variants) {
    const value = mergedState[key];

    if (variants[key] != null && value in variants[key]) {
      const style = variants[key][value];
      results.push(runIfFunction(style, mergedState));
    }
  }

  compoundLoop: for (const compound of compoundVariants) {
    const { styles, ...conditions } = compound;

    for (const key in conditions) {
      if (mergedState[key] !== conditions[key]) {
        continue compoundLoop;
      }
    }

    results.push(runIfFunction(styles, mergedState));
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

  if (resolvedStyle?.variants != null || resolvedStyle?.compoundVariants != null) {
    const { variants, compoundVariants, ...otherStyles } = resolvedStyle;
    return processVariants(props, variants, compoundVariants, [otherStyles]);
  }

  return resolvedStyle;
}
