import { isNumber } from '@universal-ui/utils';
import type { BreakpointValue } from '../breakpoints';
import { handleBreakpoints } from '../breakpoints';
import type { Theme, ThemeValue } from '../theme/defaultTheme';
import type { RNStyle, SimpleStyleFunction } from '../types';

type LayoutProp<T, K extends keyof Theme | undefined = undefined> = BreakpointValue<
  K extends string ? T | ThemeValue<Theme[K]> : T
>;

export interface LayoutPropsWeb {
  /** @platform web */
  boxSizing?: LayoutProp<RNStyle['boxSizing']>;
  /** @platform web */
  overflowX?: LayoutProp<RNStyle['overflowX']>;
  /** @platform web */
  overflowY?: LayoutProp<RNStyle['overflowY']>;
  /** @platform web */
  overscroll?: LayoutProp<RNStyle['overscrollBehavior']>;
  /** @platform web */
  overscrollBehavior?: LayoutProp<RNStyle['overscrollBehavior']>;
  /** @platform web */
  overscrollBehaviorX?: LayoutProp<RNStyle['overscrollBehaviorX']>;
  /** @platform web */
  overscrollBehaviorY?: LayoutProp<RNStyle['overscrollBehaviorY']>;
  /** @platform web */
  overscrollX?: LayoutProp<RNStyle['overscrollBehaviorX']>;
  /** @platform web */
  overscrollY?: LayoutProp<RNStyle['overscrollBehaviorY']>;
  /** @platform web */
  visibility?: LayoutProp<RNStyle['visibility']>;
}

export interface LayoutProps extends LayoutPropsWeb {
  aspectRatio?: LayoutProp<RNStyle['aspectRatio']>;
  blockSize?: LayoutProp<RNStyle['blockSize']>;
  display?: LayoutProp<RNStyle['display']>;
  h?: LayoutProp<RNStyle['height']>;
  height?: LayoutProp<RNStyle['height']>;
  inlineSize?: LayoutProp<RNStyle['inlineSize']>;
  maxBlockSize?: LayoutProp<RNStyle['maxBlockSize']>;
  maxH?: LayoutProp<RNStyle['maxHeight']>;
  maxHeight?: LayoutProp<RNStyle['maxHeight']>;
  maxInlineSize?: LayoutProp<RNStyle['maxInlineSize']>;
  maxW?: LayoutProp<RNStyle['maxWidth'], 'breakpoints'>;
  maxWidth?: LayoutProp<RNStyle['maxWidth'], 'breakpoints'>;
  minBlockSize?: LayoutProp<RNStyle['minBlockSize']>;
  minH?: LayoutProp<RNStyle['minHeight']>;
  minHeight?: LayoutProp<RNStyle['minHeight']>;
  minInlineSize?: LayoutProp<RNStyle['minInlineSize']>;
  minW?: LayoutProp<RNStyle['minWidth']>;
  minWidth?: LayoutProp<RNStyle['minWidth']>;
  overflow?: LayoutProp<RNStyle['overflow']>;
  w?: LayoutProp<RNStyle['width']>;
  width?: LayoutProp<RNStyle['width']>;
}

export function sizingTransform(value: string | number) {
  return isNumber(value) && value <= 1 && value !== 0 ? `${value * 100}%` : value;
}

export const maxInlineSize: SimpleStyleFunction<'maxInlineSize'> = (props) => {
  if (props.maxInlineSize != null) {
    const styleFromPropValue = (propValue: string | number) => ({
      maxInlineSize:
        // @ts-expect-error: It's fine as we check if `propValue` exists in breakpoints.
        props.theme.breakpoints[propValue] ?? sizingTransform(propValue),
    });
    return handleBreakpoints(props, props.maxInlineSize, styleFromPropValue);
  }
};

maxInlineSize.filterProps = ['maxInlineSize'];

export const maxW: SimpleStyleFunction<'maxW'> = (props) => {
  if (props.maxW != null) {
    const styleFromPropValue = (propValue: string | number) => ({
      maxWidth:
        // @ts-expect-error: It's fine as we check if `propValue` exists in breakpoints.
        props.theme.breakpoints[propValue] ?? sizingTransform(propValue),
    });
    return handleBreakpoints(props, props.maxW, styleFromPropValue);
  }
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
};

maxWidth.filterProps = ['maxWidth'];
