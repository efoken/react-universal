import type { ViewStyle as RNViewStyle } from 'react-native';
import type { BreakpointValue } from '../breakpoints';
import { handleBreakpoints } from '../breakpoints';
import type { Theme, ThemeValue } from '../theme/defaultTheme';
import type { SimpleStyleFunction } from '../types';
import type { SpacingValue } from './spacing';
import { createUnaryUnit, getValue } from './spacing';

type GridProp<
  T,
  K extends keyof Theme | undefined = undefined,
> = BreakpointValue<
  K extends string ? NonNullable<T> | ThemeValue<Theme[K]> : NonNullable<T>
>;

export interface GridProps {
  gap?: GridProp<RNViewStyle['gap'], 'space'>;
  rowGap?: GridProp<RNViewStyle['rowGap'], 'space'>;
  columnGap?: GridProp<RNViewStyle['columnGap'], 'space'>;
  /** @platform web */
  gridColumn?: GridProp<React.CSSProperties['gridColumn']>;
  /** @platform web */
  gridRow?: GridProp<React.CSSProperties['gridRow']>;
  /** @platform web */
  gridAutoFlow?: GridProp<React.CSSProperties['gridAutoFlow']>;
  /** @platform web */
  gridAutoColumns?: GridProp<React.CSSProperties['gridAutoColumns']>;
  /** @platform web */
  gridAutoRows?: GridProp<React.CSSProperties['gridAutoRows']>;
  /** @platform web */
  gridTemplateColumns?: GridProp<React.CSSProperties['gridTemplateColumns']>;
  /** @platform web */
  gridTemplateRows?: GridProp<React.CSSProperties['gridTemplateRows']>;
  /** @platform web */
  gridTemplateAreas?: GridProp<React.CSSProperties['gridTemplateAreas']>;
  /** @platform web */
  gridArea?: GridProp<React.CSSProperties['gridArea']>;
}

export const gap: SimpleStyleFunction<'gap'> = (props) => {
  if (props.gap != null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'gap');
    const styleFromPropValue = (propValue: SpacingValue) => ({
      gap: getValue(transformer, propValue),
    });
    return handleBreakpoints(props, props.gap, styleFromPropValue);
  }
  return undefined;
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
  return undefined;
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
  return undefined;
};

rowGap.filterProps = ['rowGap'];
