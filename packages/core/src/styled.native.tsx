import { isFunction, isString } from '@universal-ui/utils';
import { forwardRef } from 'react';
import type { StyleProp } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { StyleSheet } from './StyleSheet';
import { createElement } from './createElement';
import { css } from './css';
import { styleFunctionSx } from './styleFunctionSx';
import type { CreateStyledComponent, StyledOptions } from './styled.types';
import type { Theme } from './theme/defaultTheme';
import type { AnyProps, StyleInterpolation } from './types';

export function defaultShouldForwardProp(prop: string) {
  return (
    prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as'
  );
}

export function styled<T extends React.ComponentClass<React.ComponentProps<T>>>(
  component: T,
  options?: StyledOptions,
): CreateStyledComponent<
  T,
  React.ComponentProps<T> & {
    as?: React.ElementType;
    ref?: React.LegacyRef<InstanceType<T>>;
  }
>;

export function styled<T extends React.ComponentType<React.ComponentProps<T>>>(
  component: T,
  options?: StyledOptions,
): CreateStyledComponent<
  T,
  React.ComponentProps<T> & { as?: React.ElementType }
>;

export function styled<T extends keyof React.JSX.IntrinsicElements>(
  component: T,
  options?: StyledOptions,
): CreateStyledComponent<
  T,
  React.JSX.IntrinsicElements[T] & { as?: React.ElementType }
>;

export function styled<T extends React.ComponentType<React.ComponentProps<T>>>(
  component: T,
  {
    label,
    shouldForwardProp = defaultShouldForwardProp,
    skipSx = false,
  }: StyledOptions = {},
) {
  const shouldUseAs = !shouldForwardProp('as');

  return (
    styles: StyleInterpolation<React.ComponentProps<T> & { theme: Theme }>,
  ) => {
    const Styled = forwardRef<
      T,
      React.ComponentProps<T> & {
        as?: React.ElementType;
        style?: StyleProp<Record<string, any>>;
      }
    >(({ style, ...props }, ref) => {
      const Component = shouldUseAs ? props.as ?? component : component;

      const { styles: _styles } = useStyles(
        StyleSheet.create((theme, runtime) => ({
          style: css.call(
            { ...props, runtime, theme },
            styles,
            !skipSx && styleFunctionSx({ ...props, theme }),
          ),
        })),
        // @ts-expect-error: Just use props as variants
        props,
      );

      const newProps: AnyProps = {};

      for (const prop of Object.keys(props)) {
        if (shouldUseAs && prop === 'as') {
          continue;
        }
        if (shouldForwardProp(prop)) {
          newProps[prop] = props[prop as keyof typeof props];
        }
      }

      newProps.ref = ref;
      newProps.style = isFunction(style)
        ? (state: any) => [_styles.style, style(state)]
        : [_styles.style, style];

      return createElement(Component, newProps);
    });

    Styled.displayName =
      label ??
      `Styled(${
        isString(component)
          ? component
          : component.displayName ?? component.name ?? 'Component'
      })`;

    return Styled;
  };
}
