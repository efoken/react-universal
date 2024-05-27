import type { BreakpointValue } from '../breakpoints';
import type { Theme, ThemeValue } from '../theme/defaultTheme';

type GridProp<
  T,
  K extends keyof Theme | undefined = undefined,
> = BreakpointValue<
  K extends string ? NonNullable<T> | ThemeValue<Theme[K]> : NonNullable<T>
>;

export interface GridProps {
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
