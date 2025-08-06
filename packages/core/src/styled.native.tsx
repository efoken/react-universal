import type { AnyObject } from '@react-universal/utils';
import { isArray, isFunction, isString, noop } from '@react-universal/utils';
import { useRef } from 'react';
import { UnistylesShadowRegistry } from 'react-native-unistyles';
import { createElement } from './createElement';
import { useStyles } from './hooks/useStyles';
import type { CreateStyledComponent, StyledOptions } from './styled.types';
import type { StyleInterpolation, StyleProp } from './types';
import { passRef } from './utils/passRef';

export function defaultShouldForwardProp(prop: string) {
  return prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';
}

function maybeWarnAboutMultipleUnistyles(style: AnyObject, displayName = 'Unknown') {
  if (process.env.NODE_ENV !== 'production' && isArray(style)) {
    const unistylesKeys = Object.keys(style).filter((key) => key.startsWith('unistyles_'));

    if (unistylesKeys.length > 1) {
      console.warn(
        `React Universal: We detected style object with ${unistylesKeys.length} Unistyles styles. This might cause no updates or unpredictable behavior. Please check style prop for "${displayName}" and use array syntax instead of object syntax.`,
      );
    }
  }
}

export function styled<T extends React.ComponentClass<React.ComponentProps<T>>>(
  component: T,
  options?: StyledOptions,
): CreateStyledComponent<
  React.ComponentProps<T> & {
    as?: React.ElementType;
    ref?: React.Ref<InstanceType<T>>;
  }
>;

export function styled<T extends React.ComponentType<React.ComponentProps<T>>>(
  component: T,
  options?: StyledOptions,
): CreateStyledComponent<React.ComponentProps<T> & { as?: React.ElementType }>;

export function styled<T extends keyof React.JSX.IntrinsicElements>(
  component: T,
  options?: StyledOptions,
): CreateStyledComponent<React.JSX.IntrinsicElements[T] & { as?: React.ElementType }>;

export function styled<T extends React.ComponentType<React.ComponentProps<T>>>(
  component: T,
  { name, shouldForwardProp = defaultShouldForwardProp, skipSx = false, slot }: StyledOptions = {},
) {
  const shouldUseAs = !shouldForwardProp('as');

  return (styles: StyleInterpolation<AnyObject>, id: number) => {
    const Styled: React.FC<
      React.ComponentProps<T> & {
        as?: React.ElementType;
        ref?: React.Ref<T>;
        style?: StyleProp<AnyObject>;
      }
    > = ({ ref, style, ...props }) => {
      const Component = shouldUseAs ? (props.as ?? component) : component;

      const _style = useStyles(styles, { ...props, id, skipSx });

      const newProps: AnyObject = {};

      for (const prop of Object.keys(props)) {
        if (shouldUseAs && prop === 'as') {
          continue;
        }
        if (shouldForwardProp(prop)) {
          newProps[prop] = props[prop as keyof typeof props];
        }
      }

      const scrollViewRef = useRef<any>(null);

      // newProps.ref = ref;
      newProps.ref = (node: T) => {
        maybeWarnAboutMultipleUnistyles(_style, component.displayName);

        // https://github.com/facebook/react-native/issues/51878
        // Tested with ScrollView, Animated ScrollView and Reanimated ScrollView
        if (component.displayName === 'ScrollView') {
          if (node != null) {
            scrollViewRef.current = node as any;
          } else {
            // @ts-expect-error: `remove` is hidden from types
            UnistylesShadowRegistry.remove(scrollViewRef.current);
            scrollViewRef.current = null;
            return noop;
          }
        }

        return passRef(
          node,
          ref as React.Ref<T>,
          () => {
            // @ts-expect-error: `add` is hidden from types
            UnistylesShadowRegistry.add(node, _style);
          },
          () => {
            // @ts-expect-error: `remove` is hidden from types
            UnistylesShadowRegistry.remove(node);
          },
        );
      };
      newProps.style = isFunction(style) ? (state: any) => [_style, style(state)] : [_style, style];

      return createElement(Component, newProps);
    };

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
