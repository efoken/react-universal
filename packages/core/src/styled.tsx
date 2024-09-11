'use client';

import { withEmotionCache } from '@emotion/react';
import { serializeStyles } from '@emotion/serialize';
import type { EmotionCache, SerializedStyles } from '@emotion/utils';
import { getRegisteredStyles, insertStyles, registerStyles } from '@emotion/utils';
import { isServer } from '@tamagui/constants';
import { isFunction, isString } from '@universal-ui/utils';
import { useMemo } from 'react';
import { StyleRuntime } from './StyleRuntime';
import { StyleSheet } from './StyleSheet';
import { useTheme } from './contexts/ThemeContext';
import { createElement } from './createElement';
import { css } from './css';
import { useInsertionEffectAlwaysWithSyncFallback } from './hooks/useInsertionEffectAlwaysWithSyncFallback';
import { styleFunctionSx } from './styleFunctionSx';
import type { CreateStyledComponent, StyledOptions } from './styled.types';
import type { AnyProps, RNStyle, StyleInterpolation, StyleProp } from './types';

export function defaultShouldForwardProp(prop: string) {
  return prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';
}

const Insertion: React.FC<{
  cache: EmotionCache;
  serialized: SerializedStyles;
  stringTag: boolean;
}> = ({ cache, serialized, stringTag }) => {
  registerStyles(cache, serialized, stringTag);

  const rules = useInsertionEffectAlwaysWithSyncFallback(() =>
    insertStyles(cache, serialized, stringTag),
  );

  if (isServer && rules != null) {
    let serializedNames = serialized.name;
    let { next } = serialized;
    while (next !== undefined) {
      serializedNames += ` ${next.name}`;
      next = next.next;
    }
    return (
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: rules }}
        data-emotion={`${cache.key} ${serializedNames}`}
        nonce={cache.sheet.nonce}
      />
    );
  }
  return null;
};

export function styled<T extends React.ComponentClass<React.ComponentProps<T>>>(
  component: T,
  options?: StyledOptions,
): CreateStyledComponent<
  React.ComponentProps<T> & {
    as?: React.ElementType;
    ref?: React.LegacyRef<InstanceType<T>>;
  }
>;

export function styled<T extends React.ComponentType<React.ComponentProps<T>>>(
  component: T,
  options?: StyledOptions,
): CreateStyledComponent<React.ComponentProps<T> & { as?: React.ElementType }>;

export function styled<T extends keyof React.JSX.IntrinsicElements>(
  component: T,
  options?: StyledOptions,
): CreateStyledComponent<
  Omit<React.JSX.IntrinsicElements[T], 'style'> & {
    as?: React.ElementType;
    style?: StyleProp<RNStyle>;
  }
>;

export function styled<T extends React.ComponentType<React.ComponentProps<T>>>(
  component: T,
  { name, shouldForwardProp = defaultShouldForwardProp, skipSx = false, slot }: StyledOptions = {},
) {
  const shouldUseAs = !shouldForwardProp('as');

  return (...styles: StyleInterpolation<AnyProps>[]) => {
    const Styled = withEmotionCache<
      React.ComponentProps<T> & {
        as?: React.ElementType;
        dir?: 'ltr' | 'rtl';
        lang?: Intl.UnicodeBCP47LocaleIdentifier;
        style?: StyleProp<Record<string, any>>;
      },
      T
    >(({ style, ...props }, cache, ref) => {
      const Component = shouldUseAs ? (props.as ?? component) : component;

      const theme = useTheme();

      const classInterpolations: string[] = [];
      let { className } = useMemo(() => StyleSheet.props(style), [style]);
      if (className != null) {
        className = getRegisteredStyles(cache.registered, classInterpolations, className);
      }

      const serialized = serializeStyles(
        [
          StyleSheet.create((currentTheme, runtime) => ({
            styles: css.call(
              { ...props, runtime, theme: currentTheme },
              styles,
              !skipSx && styleFunctionSx({ ...props, theme: currentTheme }),
            ),
          }))(theme, StyleRuntime).styles,
          classInterpolations,
        ],
        cache.registered,
        props,
      );
      const _style = {
        $$css: true,
        className: `${cache.key}-${serialized.name}`,
      };

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
      newProps.style = isFunction(style) ? (state: any) => [_style, style(state)] : [_style, style];

      return (
        <>
          <Insertion cache={cache} serialized={serialized} stringTag={isString(Component)} />
          {createElement(Component, newProps)}
        </>
      );
    });

    Styled.displayName =
      name == null
        ? `Styled(${
            isString(component)
              ? component
              : (component.displayName ?? component.name ?? 'Component')
          })`
        : `${name}${slot ?? ''}`;

    return Styled;
  };
}
