import normalizeCssColor from '@react-native/normalize-colors';
import { isString } from '@react-universal/utils';

type VarColor = `var(${string})` | `rgba(var(${string}),${string})`;

function isWebColor(color: string): color is 'currentcolor' | 'inherit' | VarColor {
  return (
    color.toLowerCase() === 'currentcolor' ||
    color === 'inherit' ||
    color.startsWith('var(') ||
    color.startsWith('rgba(var(')
  );
}

function processColor(color?: string | number) {
  if (color == null) {
    return;
  }
  // Convert number and hex
  const colorInt = normalizeCssColor(color);
  if (colorInt == null) {
    return;
  }
  return ((colorInt << 24) | (colorInt >>> 8)) >>> 0;
}

export function normalizeColor(color?: number | string, opacity = 1) {
  if (color == null) {
    return;
  }
  if (isString(color) && isWebColor(color)) {
    return color;
  }
  const colorInt = processColor(color);
  if (colorInt != null) {
    const r = (colorInt >> 16) & 255;
    const g = (colorInt >> 8) & 255;
    const b = colorInt & 255;
    const a = ((colorInt >> 24) & 255) / 255;
    const alpha = (a * opacity).toFixed(2);
    return `rgba(${r},${g},${b},${alpha})`;
  }
}
