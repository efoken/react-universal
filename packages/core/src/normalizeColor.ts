import normalizeCssColor from '@react-native/normalize-colors';
import { isString } from '@universal-ui/utils';

function isWebColor(
  color: string,
): color is 'currentcolor' | 'inherit' | `var(${string})` {
  return (
    color.toLowerCase() === 'currentcolor' ||
    color === 'inherit' ||
    color.startsWith('var(')
  );
}

function processColor(color?: string | number) {
  if (color == null) {
    return undefined;
  }
  // Convert number and hex
  const colorInt = normalizeCssColor(color);
  if (colorInt == null) {
    return undefined;
  }
  // eslint-disable-next-line no-bitwise
  return ((colorInt << 24) | (colorInt >>> 8)) >>> 0;
}

export function normalizeColor(color?: number | string, opacity = 1) {
  if (color == null) {
    return undefined;
  }
  if (isString(color) && isWebColor(color)) {
    return color;
  }
  const colorInt = processColor(color);
  if (colorInt != null) {
    // eslint-disable-next-line no-bitwise
    const r = (colorInt >> 16) & 255;
    // eslint-disable-next-line no-bitwise
    const g = (colorInt >> 8) & 255;
    // eslint-disable-next-line no-bitwise
    const b = colorInt & 255;
    // eslint-disable-next-line no-bitwise
    const a = ((colorInt >> 24) & 255) / 255;
    const alpha = (a * opacity).toFixed(2);
    return `rgba(${r},${g},${b},${alpha})`;
  }
}
