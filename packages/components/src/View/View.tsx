'use client';

import type { ForwardedProps } from '@react-universal/core';
import {
  forwardedProps,
  getLocaleDirection,
  styled,
  useElementLayout,
  useOwnerState,
  usePlatformMethods,
  useResponderEvents,
} from '@react-universal/core';
import { isString, pick } from '@react-universal/utils';
import { useComposedRefs } from '@tamagui/compose-refs';
import { Children, useContext, useRef } from 'react';
import { TextAncestorContext } from '../Text/TextAncestorContext';
import type { ViewMethods, ViewOwnerState, ViewProps } from './View.types';

function pickProps<T extends { ref?: React.Ref<any> }>(
  props: T,
): ForwardedProps<NonNullable<T['ref']> extends React.Ref<infer T> ? T : HTMLElement> {
  // @ts-expect-error
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
  });
}

const ViewRoot = styled<any>('div', {
  name: 'View',
  slot: 'Root',
})<{ ownerState: ViewOwnerState }>({
  alignItems: 'stretch',
  backgroundColor: 'transparent',
  display: 'flex',
  flexBasis: 'auto',
  flexDirection: 'column',
  flexShrink: 0,
  minHeight: 0,
  minWidth: 0,
  variants: [
    {
      props: { hasTextAncestor: true },
      style: {
        display: 'inline-flex' as any,
      },
    },
  ],
});

export const View: React.FC<ViewProps & React.RefAttributes<HTMLElement & ViewMethods>> = ({
  as: _as,
  dir,
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
}) => {
  if (process.env.NODE_ENV !== 'production') {
    for (const item of Children.toArray(props.children)) {
      if (isString(item)) {
        console.error(
          `React Universal: Unexpected text node: ${item}. A text node cannot be a child of a <View>.`,
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
  });

  let component: 'a' | 'div' = 'div';

  const langDirection = props.lang == null ? undefined : getLocaleDirection(props.lang);
  const componentDirection = dir ?? langDirection;

  const supportedProps = pickProps(props);
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
        supportedProps.target = target.startsWith('_') ? target : `_${target}`;
      }
    }
  }

  const platformMethodsRef = usePlatformMethods(hostRef);
  const handleRef = useComposedRefs(hostRef, platformMethodsRef, props.ref);

  supportedProps.ref = handleRef;

  const ownerState = useOwnerState({
    hasTextAncestor,
    role: props.role,
  });

  return <ViewRoot as={_as ?? component} ownerState={ownerState} {...supportedProps} />;
};

View.displayName = 'View';
