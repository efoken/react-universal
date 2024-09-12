import { isArray, isFunction, isObject } from '@react-universal/utils';
import type { StyleInterpolation, StyleValues } from './types';

let styles: StyleValues[];

function handleInterpolation(this: any, interpolation: StyleInterpolation<any>, index: number) {
  if (isFunction(interpolation)) {
    if (this == null) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          [
            'React Universal: Interpolating functions in css calls is not allowed.',
            'If you want to have a css call based on props, create a function that returns a css call like this:',
            'const dynamicStyle = (props) => css({ color: props.color })',
            'It can be called directly with props or interpolated in a styled call like this:',
            'const SomeComponent = styled.View(dynamicStyle)',
          ].join('\n'),
        );
      }
    } else {
      handleInterpolation.call(this, interpolation(this), index);
    }
    return;
  }
  if (interpolation == null || typeof interpolation === 'boolean') {
    return;
  }
  if (isObject(interpolation)) {
    styles.push(interpolation as StyleValues);
  }
  if (isArray(interpolation)) {
    for (const [i, style] of interpolation.entries()) {
      handleInterpolation.call(this, style, i);
    }
  }
}

export function css(this: any, ...args: StyleInterpolation<any>[]) {
  styles = [];
  for (const [i, arg] of args.entries()) {
    handleInterpolation.call(this, arg, i);
  }
  return Object.assign({}, ...styles) as StyleValues;
}
