import {
  get,
  isArray,
  isNumber,
  isObject,
  isString,
  memoize,
  mergeDeep,
  noop,
} from '@universal-ui/utils';
import type { BreakpointValue } from '../breakpoints';
import { handleBreakpoints } from '../breakpoints';
import type { Theme, ThemeValue } from '../theme/defaultTheme';
import type { AnyProps, RNStyle, SimpleStyleFunction } from '../types';

const PROPERTIES: Record<string, string> = {
  m: 'margin',
  p: 'padding',
};

const DIRECTIONS: Record<string, string | string[]> = {
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  s: 'Start',
  e: 'End',
  x: ['Left', 'Right'],
  y: ['Top', 'Bottom'],
};

const ALIASES: Record<string, string> = {
  marginX: 'mx',
  marginY: 'my',
  paddingX: 'px',
  paddingY: 'py',
};

const getCssProperties = memoize((prop: string) => {
  // It's not a shorthand notation.
  if (prop.length > 2) {
    if (ALIASES[prop]) {
      // eslint-disable-next-line no-param-reassign
      prop = ALIASES[prop];
    } else {
      return [prop];
    }
  }

  const property = PROPERTIES[prop[0]];
  const direction = DIRECTIONS[prop[1]] ?? '';

  return isArray(direction) ? direction.map((d) => property + d) : [property + direction];
});

export type SpacingValue = string | number;

export function createUnaryUnit<T extends number | any[] | Record<string, any>>(
  theme: { space: T },
  themeKey: string,
  defaultSpace: T | number,
  propName: string,
): T extends number
  ? <U extends string | number>(abs: U) => U
  : T extends any[]
    ? <K extends number>(abs: K | string) => T[K] | string
    : T extends Record<string, any>
      ? <K extends keyof T>(abs: K | number) => T[K] | number
      : () => undefined {
  const themeSpace = get(theme, themeKey, defaultSpace) as T;

  if (isNumber(themeSpace)) {
    // @ts-expect-error: Return type is explicitly specified above.
    return (abs: string | number) => {
      if (isString(abs)) {
        return abs;
      }
      if (process.env.NODE_ENV !== 'production' && !isNumber(abs)) {
        console.error(
          `universal-ui: Expected ${propName} argument to be a number or a string, got ${abs as string}.`,
        );
      }
      return themeSpace * abs;
    };
  }

  if (isArray(themeSpace)) {
    // @ts-expect-error: Return type is explicitly specified above.
    return <K extends number>(abs: K | string) => {
      if (isString(abs)) {
        return abs;
      }
      if (process.env.NODE_ENV !== 'production') {
        if (!Number.isInteger(abs)) {
          console.error(
            `universal-ui: The \`theme.${themeKey}\` array type cannot be combined with non integer values.` +
              `You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`,
          );
        } else if (abs > themeSpace.length - 1) {
          console.error(
            [
              `universal-ui: The value provided (${abs}) overflows.`,
              `The supported values are: ${JSON.stringify(themeSpace)}.`,
              `${abs} > ${themeSpace.length - 1}, you need to add the missing values.`,
            ].join('\n'),
          );
        }
      }
      return themeSpace[abs];
    };
  }

  if (isObject(themeSpace)) {
    // @ts-expect-error: Return type is explicitly specified above.
    return (abs: string | number) => themeSpace[abs] ?? abs;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(
      [
        `universal-ui: The \`theme.${themeKey}\` value (${themeSpace as string}) is invalid.`,
        'It should be a number, an array or an object.',
      ].join('\n'),
    );
  }

  // @ts-expect-error: Return type is explicitly specified above.
  return noop;
}

export function createUnarySpacing<T extends number | any[] | Record<string, any>>(theme: {
  space: T;
}) {
  return createUnaryUnit(theme, 'space', 8, 'space');
}

export function getValue<T extends SpacingValue>(transformer: (abs: any) => any, propValue: T) {
  if (isString(propValue) || propValue == null) {
    return propValue;
  }

  const transformed = transformer(Math.abs(propValue));

  // @ts-expect-error: According to the line above `propValue` only be number.
  if (propValue >= 0) {
    return transformed;
  }

  if (isNumber(transformed)) {
    return -transformed;
  }

  return `-${transformed}`;
}

export function getStyleFromPropValue(
  cssProperties: string[],
  transformer: (abs: SpacingValue) => SpacingValue,
) {
  return (propValue: SpacingValue) =>
    cssProperties.reduce<Record<string, SpacingValue>>((acc, cssProperty) => {
      acc[cssProperty] = getValue(transformer, propValue);
      return acc;
    }, {});
}

function resolveCssProperty(
  props: { theme: Theme } & AnyProps,
  keys: string[],
  prop: string,
  transformer: (abs: any) => any,
): any;

function resolveCssProperty(
  props: { theme: Theme } & AnyProps,
  keys: string[],
  prop: string,
  transformer: (abs: SpacingValue) => SpacingValue,
) {
  // Using a hash computation over an array iteration could be faster, but with
  // only 28 items, it's doesn't worth the bundle size.
  if (!keys.includes(prop)) {
    return;
  }

  const cssProperties = getCssProperties(prop);
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);

  return handleBreakpoints(props, props[prop], styleFromPropValue);
}

function style(props: AnyProps & { theme: Theme }, keys: string[]) {
  const transformer = createUnarySpacing(props.theme);

  return Object.keys(props)
    .map((prop) => resolveCssProperty(props, keys, prop, transformer))
    .reduce<Record<string, any>>((acc, item) => {
      if (!item) {
        return acc;
      }
      return mergeDeep(acc, item, { clone: false });
    }, {});
}

type SpacingProp<T> = BreakpointValue<
  T | ThemeValue<Theme['space'] extends number ? {} : Theme['space']>
>;

export interface MarginProps {
  m?: SpacingProp<RNStyle['margin']>;
  margin?: SpacingProp<RNStyle['margin']>;
  marginBlock?: SpacingProp<RNStyle['marginBlock']>;
  marginBlockEnd?: SpacingProp<RNStyle['marginBlockEnd']>;
  marginBlockStart?: SpacingProp<RNStyle['marginBlockStart']>;
  marginBottom?: SpacingProp<RNStyle['marginBottom']>;
  marginEnd?: SpacingProp<RNStyle['marginInlineEnd']>;
  marginInline?: SpacingProp<RNStyle['marginInline']>;
  marginInlineEnd?: SpacingProp<RNStyle['marginInlineEnd']>;
  marginInlineStart?: SpacingProp<RNStyle['marginInlineStart']>;
  marginLeft?: SpacingProp<RNStyle['marginLeft']>;
  marginRight?: SpacingProp<RNStyle['marginRight']>;
  marginStart?: SpacingProp<RNStyle['marginInlineStart']>;
  marginTop?: SpacingProp<RNStyle['marginTop']>;
  marginX?: SpacingProp<RNStyle['marginInline']>;
  marginY?: SpacingProp<RNStyle['marginBlock']>;
  mb?: SpacingProp<RNStyle['marginBottom']>;
  me?: SpacingProp<RNStyle['marginInlineEnd']>;
  ml?: SpacingProp<RNStyle['marginLeft']>;
  mr?: SpacingProp<RNStyle['marginRight']>;
  ms?: SpacingProp<RNStyle['marginInlineStart']>;
  mt?: SpacingProp<RNStyle['marginTop']>;
  mx?: SpacingProp<RNStyle['marginInline']>;
  my?: SpacingProp<RNStyle['marginBlock']>;
}

export const marginKeys: (keyof MarginProps)[] = [
  'm',
  'margin',
  'marginBlock',
  'marginBlockEnd',
  'marginBlockStart',
  'marginBottom',
  'marginEnd',
  'marginInline',
  'marginInlineEnd',
  'marginInlineStart',
  'marginLeft',
  'marginRight',
  'marginStart',
  'marginTop',
  'marginX',
  'marginY',
  'mb',
  'me',
  'ml',
  'mr',
  'ms',
  'mt',
  'mx',
  'my',
];

export const margin: SimpleStyleFunction<keyof MarginProps> = (props) => style(props, marginKeys);

margin.filterProps = marginKeys;

export interface PaddingProps {
  p?: SpacingProp<RNStyle['padding']>;
  padding?: SpacingProp<RNStyle['padding']>;
  paddingBlock?: SpacingProp<RNStyle['paddingBlock']>;
  paddingBlockEnd?: SpacingProp<RNStyle['paddingBlockEnd']>;
  paddingBlockStart?: SpacingProp<RNStyle['paddingBlockStart']>;
  paddingBottom?: SpacingProp<RNStyle['paddingBottom']>;
  paddingEnd?: SpacingProp<RNStyle['paddingInlineEnd']>;
  paddingInline?: SpacingProp<RNStyle['paddingInline']>;
  paddingInlineEnd?: SpacingProp<RNStyle['paddingInlineEnd']>;
  paddingInlineStart?: SpacingProp<RNStyle['paddingInlineStart']>;
  paddingLeft?: SpacingProp<RNStyle['paddingLeft']>;
  paddingRight?: SpacingProp<RNStyle['paddingRight']>;
  paddingStart?: SpacingProp<RNStyle['paddingInlineStart']>;
  paddingTop?: SpacingProp<RNStyle['paddingTop']>;
  paddingX?: SpacingProp<RNStyle['paddingInline']>;
  paddingY?: SpacingProp<RNStyle['paddingBlock']>;
  pb?: SpacingProp<RNStyle['paddingBottom']>;
  pe?: SpacingProp<RNStyle['paddingInlineEnd']>;
  pl?: SpacingProp<RNStyle['paddingLeft']>;
  pr?: SpacingProp<RNStyle['paddingRight']>;
  ps?: SpacingProp<RNStyle['paddingInlineStart']>;
  pt?: SpacingProp<RNStyle['paddingTop']>;
  px?: SpacingProp<RNStyle['paddingInline']>;
  py?: SpacingProp<RNStyle['paddingBlock']>;
}

export const paddingKeys: (keyof PaddingProps)[] = [
  'p',
  'padding',
  'paddingBlock',
  'paddingBlockEnd',
  'paddingBlockStart',
  'paddingBottom',
  'paddingEnd',
  'paddingInline',
  'paddingInlineEnd',
  'paddingInlineStart',
  'paddingLeft',
  'paddingRight',
  'paddingStart',
  'paddingTop',
  'paddingX',
  'paddingY',
  'pb',
  'pe',
  'pl',
  'pr',
  'ps',
  'pt',
  'px',
  'py',
];

export const padding: SimpleStyleFunction<keyof PaddingProps> = (props) =>
  style(props, paddingKeys);

padding.filterProps = paddingKeys;
