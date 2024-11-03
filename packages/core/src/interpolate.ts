import type { AnyObject } from '@react-universal/utils';
import { isArray, isFunction, isObject } from '@react-universal/utils';

let objs: AnyObject[];

type Interpolation<T extends AnyObject, P extends AnyObject> =
  | null
  | undefined
  | boolean
  | T
  | Interpolation<T, P>[]
  | ((props: P) => Interpolation<T, P>);

function handleInterpolation<T extends AnyObject, P extends AnyObject>(
  this: P | void,
  interpolation: Interpolation<T, P>,
  index: number,
) {
  if (isFunction(interpolation)) {
    if (this != null) {
      handleInterpolation.call(this, interpolation(this), index);
    }
    return;
  }
  if (interpolation == null || typeof interpolation === 'boolean') {
    return;
  }
  if (isArray(interpolation)) {
    for (const [i, style] of interpolation.entries()) {
      handleInterpolation.call(this, style, i);
    }
  } else if (isObject(interpolation)) {
    objs.push(interpolation);
  }
}

export function interpolate<T extends AnyObject, P extends AnyObject>(
  this: P | void,
  ...args: Interpolation<T, P>[]
) {
  objs = [];
  for (const [i, arg] of args.entries()) {
    handleInterpolation.call(this, arg, i);
  }
  return Object.assign({}, ...objs) as T;
}
