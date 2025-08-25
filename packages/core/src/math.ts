import { isNumber, isString } from '@react-universal/utils';
import { isWeb } from '@tamagui/constants';
import { parseRem } from './utils/parseRem';

type Operand = string | number | { toString: () => string };

const operators = {
  '+': (a: number, b: number): number => a + b,
  '-': (a: number, b: number): number => a - b,
  '/': (a: number, b: number): number => a / b,
  '*': (a: number, b: number): number => a * b,
};

type Operator = keyof typeof operators;

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

export function calc(...valuesAndOperators: (Operand | Operator)[]): string | number {
  if (isWeb) {
    let result = 'calc(';
    for (const value of valuesAndOperators) {
      if (isString(value) && value in operators) {
        result += ` ${value} `; // spaces are significant
      } else {
        result += parsePx(value);
      }
    }
    return `${result})`;
  }

  let result = 0;
  let operator: ((a: number, b: number) => number) | undefined;

  for (const value of valuesAndOperators) {
    if (isString(value) && value in operators) {
      operator = operators[value as Operator];
    } else if (operator) {
      result = operator(result, parseRem(value));
      operator = undefined;
    } else {
      result = parseRem(value);
    }
  }

  return result;
}
