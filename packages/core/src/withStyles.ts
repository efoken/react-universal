import type { AnyObject } from '@react-universal/utils';
import type { StyleRuntime } from './StyleRuntime';
import type { Theme } from './theme';

type Mappings<P = AnyObject> = (
  theme: Theme,
  runtime: StyleRuntime,
) => Omit<Partial<P>, 'style' | 'contentContainerStyle'> & { key?: string };

export const withStyles = <
  C extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>,
  P extends React.ComponentProps<C>,
>(
  Component: C,
  // biome-ignore lint/correctness/noUnusedFunctionParameters: only used for Native
  mappings?: Mappings<P>,
) => {
  return Component as React.FC<
    Partial<React.PropsWithoutRef<P>> & {
      ref?: React.Ref<React.ComponentRef<C>>;
      uniProps?: Mappings<P>;
    }
  >;
};
