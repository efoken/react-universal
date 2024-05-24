import { isNumber } from '@universal-ui/utils';
import type { BreakpointValue } from '../breakpoints';
import { handleBreakpoints } from '../breakpoints';
import type { Theme, ThemeValue } from '../theme/defaultTheme';
import type { RNStyle, SimpleStyleFunction } from '../types';

type LayoutProp<
  T,
  K extends keyof Theme | undefined = undefined,
> = BreakpointValue<K extends string ? T | ThemeValue<Theme[K]> : T>;

export interface LayoutProps {
  w?: LayoutProp<RNStyle['width']>;
  maxW?: LayoutProp<RNStyle['maxWidth']>;
  minW?: LayoutProp<RNStyle['minWidth']>;
  width?: LayoutProp<RNStyle['width']>;
  maxWidth?: LayoutProp<RNStyle['maxWidth'], 'breakpoints'>;
  minWidth?: LayoutProp<RNStyle['minWidth']>;
  h?: LayoutProp<RNStyle['height']>;
  maxH?: LayoutProp<RNStyle['maxHeight']>;
  minH?: LayoutProp<RNStyle['minHeight']>;
  height?: LayoutProp<RNStyle['height']>;
  maxHeight?: LayoutProp<RNStyle['maxHeight']>;
  minHeight?: LayoutProp<RNStyle['minHeight']>;
  /** @platform web */
  boxSizing?: LayoutProp<React.CSSProperties['boxSizing']>;
  display?: LayoutProp<RNStyle['display']>;
  aspectRatio?: LayoutProp<RNStyle['aspectRatio']>;
  overflow?: LayoutProp<RNStyle['overflow']>;
  /** @platform web */
  overflowX?: LayoutProp<React.CSSProperties['overflowX']>;
  /** @platform web */
  overflowY?: LayoutProp<React.CSSProperties['overflowY']>;
  /** @platform web */
  overscroll?: LayoutProp<React.CSSProperties['overscrollBehavior']>;
  /** @platform web */
  overscrollBehavior?: LayoutProp<React.CSSProperties['overscrollBehavior']>;
  /** @platform web */
  visibility?: LayoutProp<React.CSSProperties['visibility']>;
}

export function sizingTransform(value: string | number) {
  return isNumber(value) && value <= 1 && value !== 0
    ? `${value * 100}%`
    : value;
}

export const maxW: SimpleStyleFunction<'maxW'> = (props) => {
  if (props.maxW != null) {
    const styleFromPropValue = (propValue: string | number) => ({
      maxWidth:
        // @ts-expect-error: It's fine as we check if `propValue` exists in breakpoints.
        props.theme.breakpoints[propValue] ?? sizingTransform(propValue),
    });
    return handleBreakpoints(props, props.maxW, styleFromPropValue);
  }
  return undefined;
};

maxW.filterProps = ['maxW'];

export const maxWidth: SimpleStyleFunction<'maxWidth'> = (props) => {
  if (props.maxWidth != null) {
    const styleFromPropValue = (propValue: string | number) => ({
      maxWidth:
        // @ts-expect-error: It's fine as we check if `propValue` exists in breakpoints.
        props.theme.breakpoints[propValue] ?? sizingTransform(propValue),
    });
    return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
  }
  return undefined;
};

maxWidth.filterProps = ['maxW'];
