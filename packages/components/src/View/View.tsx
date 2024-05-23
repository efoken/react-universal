'use client';

import { useResponderEvents } from '@tamagui/react-native-use-responder-events';
import type { AnyProps } from '@universal-ui/core';
import {
  forwardRef,
  forwardedProps,
  getLocaleDirection,
  styled,
  useElementLayout,
  useForkRef,
  useOwnerState,
  usePlatformMethods,
} from '@universal-ui/core';
import { isString, pick } from '@universal-ui/utils';
import { Children, useContext, useRef } from 'react';
import type { NativeMethods } from 'react-native';
import { TextAncestorContext } from '../Text/TextAncestorContext';
import type { ViewOwnerState, ViewProps } from './View.types';

function pickProps<T extends AnyProps>(props: T) {
  return pick(props, {
    ...forwardedProps.defaultProps,
    ...forwardedProps.accessibilityProps,
    ...forwardedProps.clickProps,
    ...forwardedProps.focusProps,
    ...forwardedProps.keyboardProps,
    ...forwardedProps.mouseProps,
    ...forwardedProps.touchProps,
    ...forwardedProps.styleProps,
    href: true,
    lang: true,
    onScroll: true,
    onWheel: true,
    pointerEvents: true,
  });
}

const ViewRoot = styled('div', {
  label: 'ViewRoot',
})<{ ownerState: ViewOwnerState }>(({ ownerState }) => ({
  alignItems: 'stretch',
  backgroundColor: 'transparent',
  borderColor: '#000',
  borderStyle: 'solid',
  borderWidth: 0,
  boxSizing: 'border-box',
  display: ownerState.hasTextAncestor ? ('inline-flex' as any) : 'flex',
  flexBasis: 'auto',
  flexDirection: 'column',
  flexShrink: 0,
  listStyleType: 'none',
  margin: 0,
  minHeight: 0,
  minWidth: 0,
  padding: 0,
  textDecorationLine: 'none',
}));

export const View = forwardRef<any, ViewProps>(
  (
    {
      as: asProp,
      hrefAttrs,
      onLayout,
      onMoveShouldSetResponder,
      onMoveShouldSetResponderCapture,
      onResponderEnd,
      onResponderGrant,
      onResponderMove,
      onResponderReject,
      onResponderRelease,
      onResponderStart,
      onResponderTerminate,
      onResponderTerminationRequest,
      onScrollShouldSetResponder,
      onScrollShouldSetResponderCapture,
      onSelectionChangeShouldSetResponder,
      onSelectionChangeShouldSetResponderCapture,
      onStartShouldSetResponder,
      onStartShouldSetResponderCapture,
      ...props
    },
    ref,
  ) => {
    if (process.env.NODE_ENV !== 'production') {
      for (const item of Children.toArray(props.children)) {
        if (isString(item)) {
          console.error(
            `Unexpected text node: ${item}. A text node cannot be a child of a <View>.`,
          );
        }
      }
    }

    const hasTextAncestor = useContext(TextAncestorContext);
    const hostRef = useRef<HTMLElement>(null);

    useElementLayout(hostRef, onLayout);
    useResponderEvents(hostRef, {
      onMoveShouldSetResponder,
      onMoveShouldSetResponderCapture,
      onResponderEnd,
      onResponderGrant,
      onResponderMove,
      onResponderReject,
      onResponderRelease,
      onResponderStart,
      onResponderTerminate,
      onResponderTerminationRequest,
      onScrollShouldSetResponder,
      onScrollShouldSetResponderCapture,
      onSelectionChangeShouldSetResponder,
      onSelectionChangeShouldSetResponderCapture,
      onStartShouldSetResponder,
      onStartShouldSetResponderCapture,
    } as any);

    let component: 'a' | 'div' = 'div';

    const langDirection =
      props.lang == null ? null : getLocaleDirection(props.lang);
    const componentDirection = props.dir ?? langDirection;

    const supportedProps: AnyProps = pickProps(props);
    supportedProps.dir = componentDirection;

    if (props.href != null) {
      component = 'a';
      if (hrefAttrs != null) {
        const { download, rel, target } = hrefAttrs;
        if (download != null) {
          supportedProps.download = download;
        }
        if (rel != null) {
          supportedProps.rel = rel;
        }
        if (isString(target)) {
          supportedProps.target = target.startsWith('_')
            ? target
            : `_${target}`;
        }
      }
    }

    const platformMethodsRef = usePlatformMethods(hostRef);
    const handleRef = useForkRef(hostRef, platformMethodsRef, ref);

    supportedProps.ref = handleRef;

    const ownerState = useOwnerState({
      hasTextAncestor,
      role: props.role,
    });

    return (
      <ViewRoot
        as={asProp ?? component}
        ownerState={ownerState}
        {...supportedProps}
      />
    );
  },
) as unknown as React.ComponentType<
  ViewProps & React.RefAttributes<NativeMethods>
> &
  NativeMethods;

View.displayName = 'View';
