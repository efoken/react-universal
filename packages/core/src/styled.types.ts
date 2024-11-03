import type { AnyObject } from '@react-universal/utils';
import type { StyleRuntime } from './StyleRuntime';
import type { Theme } from './theme/defaultTheme';
import type { OverridableComponent, StyleInterpolation } from './types';

export interface StyledOptions {
  name?: Capitalize<string>;
  shouldForwardProp?: (prop: string) => boolean;
  skipSx?: boolean;
  slot?: Capitalize<string>;
}

export type StyledComponent<
  P extends AnyObject,
  T extends React.ElementType,
> = OverridableComponent<Omit<P, keyof React.ComponentProps<T>>, T>;

export type CreateStyledComponent<P extends AnyObject> = <
  AdditionalProps extends AnyObject = NonNullable<unknown>,
>(
  ...styles: StyleInterpolation<
    P & AdditionalProps & { runtime: typeof StyleRuntime; theme: Theme }
  >[]
) => React.FC<P & AdditionalProps>;
