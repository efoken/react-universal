import { handleBreakpoints, type BreakpointValue } from '../breakpoints';
import type { Theme, ThemeValue } from '../theme/defaultTheme';
import type { RNStyle, SimpleStyleFunction } from '../types';
import type { SpacingValue } from './spacing';
import { createUnaryUnit, getValue } from './spacing';

type FlexboxProp<T, K extends keyof Theme | undefined = undefined> = BreakpointValue<
  K extends string ? T | ThemeValue<Theme[K]> : T
>;

export interface FlexboxPropsWeb {
  /** @platform web */
  justifyItems?: FlexboxProp<React.CSSProperties['justifyItems']>;
  /** @platform web */
  justifySelf?: FlexboxProp<React.CSSProperties['justifySelf']>;
  /** @platform web */
  order?: FlexboxProp<React.CSSProperties['order']>;
}

export interface FlexboxProps extends FlexboxPropsWeb {
  alignContent?: FlexboxProp<RNStyle['alignContent']>;
  alignItems?: FlexboxProp<RNStyle['alignItems']>;
  alignSelf?: FlexboxProp<RNStyle['alignSelf']>;
  columnGap?: FlexboxProp<RNStyle['columnGap'], 'space'>;
  flex?: FlexboxProp<RNStyle['flex']>;
  flexBasis?: FlexboxProp<RNStyle['flexBasis']>;
  flexDir?: FlexboxProp<RNStyle['flexDirection']>;
  flexDirection?: FlexboxProp<RNStyle['flexDirection']>;
  flexGrow?: FlexboxProp<RNStyle['flexGrow']>;
  flexShrink?: FlexboxProp<RNStyle['flexShrink']>;
  flexWrap?: FlexboxProp<RNStyle['flexWrap']>;
  gap?: FlexboxProp<RNStyle['gap'], 'space'>;
  justifyContent?: FlexboxProp<RNStyle['justifyContent']>;
  rowGap?: FlexboxProp<RNStyle['rowGap'], 'space'>;
}

export const gap: SimpleStyleFunction<'gap'> = (props) => {
  if (props.gap != null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'gap');
    const styleFromPropValue = (propValue: SpacingValue) => ({
      gap: getValue(transformer, propValue),
    });
    return handleBreakpoints(props, props.gap, styleFromPropValue);
  }
};

gap.filterProps = ['gap'];

export const columnGap: SimpleStyleFunction<'columnGap'> = (props) => {
  if (props.columnGap != null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'columnGap');
    const styleFromPropValue = (propValue: SpacingValue) => ({
      columnGap: getValue(transformer, propValue),
    });
    return handleBreakpoints(props, props.columnGap, styleFromPropValue);
  }
};

columnGap.filterProps = ['columnGap'];

export const rowGap: SimpleStyleFunction<'rowGap'> = (props) => {
  if (props.rowGap != null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'rowGap');
    const styleFromPropValue = (propValue: SpacingValue) => ({
      rowGap: getValue(transformer, propValue),
    });
    return handleBreakpoints(props, props.rowGap, styleFromPropValue);
  }
};

rowGap.filterProps = ['rowGap'];
