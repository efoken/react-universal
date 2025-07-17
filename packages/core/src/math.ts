import { isNumber } from '@react-universal/utils';
import { isWeb } from '@tamagui/constants';
import { parseRem } from './utils/parseRem';

type Operand = string | number | { toString: () => string };

function parsePx(value: Operand) {
  return isNumber(value) ? `${value}px` : value.toString();
}

export function max(...operands: Operand[]) {
  return isWeb
    ? `max(${operands.map((o) => parsePx(o)).join(',')})`
    : Math.max(...operands.map((o) => parseRem(o)));
}

export function min(...operands: Operand[]) {
  return isWeb
    ? `min(${operands.map((o) => parsePx(o)).join(',')})`
    : Math.min(...operands.map((o) => parseRem(o)));
}

export function clamp(min: Operand, value: Operand, max: Operand) {
  return isWeb
    ? `clamp(${parsePx(min)},${parsePx(value)},${parsePx(max)})`
    : Math.min(Math.max(parseRem(value), parseRem(min)), parseRem(max));
}
