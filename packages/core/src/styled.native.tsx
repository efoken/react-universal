import type { AnyObject } from '@react-universal/utils';
import { isFunction, isObject, isString } from '@react-universal/utils';
import {
  Image as RNImage,
  Pressable as RNPressable,
  ScrollView as RNScrollView,
  Text as RNText,
  TextInput as RNTextInput,
  View as RNView,
} from 'react-native';
import { Image as UnistylesImage } from 'react-native-unistyles/components/native/Image';
import { Pressable as UnistylesPressable } from 'react-native-unistyles/components/native/Pressable';
import { ScrollView as UnistylesScrollView } from 'react-native-unistyles/components/native/ScrollView';
import { Text as UnistylesText } from 'react-native-unistyles/components/native/Text';
import { TextInput as UnistylesTextInput } from 'react-native-unistyles/components/native/TextInput';
import { View as UnistylesView } from 'react-native-unistyles/components/native/View';
import { createElement } from './createElement';
import { useStyles } from './hooks/useStyles';
import type { CreateStyledComponent, StyledOptions } from './styled.types';
import type { StyleInterpolation, StyleProp } from './types';

export function defaultShouldForwardProp(prop: string) {
  return prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';
}

const componentsMap = new Map<React.ComponentType<any>, React.ComponentType<any>>([
  [RNImage, UnistylesImage],
  [RNPressable, UnistylesPressable],
  [RNScrollView, UnistylesScrollView],
  [RNText, UnistylesText],
  [RNTextInput, UnistylesTextInput],
  [RNView, UnistylesView],
]);

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
      const _component = shouldUseAs ? (props.as ?? component) : component;

      const Component = isObject(_component)
        ? (componentsMap.get(_component) ?? _component)
        : _component;

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

      newProps.ref = ref;
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
