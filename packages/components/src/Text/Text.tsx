'use client';

import type { ForwardedProps } from '@react-universal/core';
import {
  forwardedProps,
  getLocaleDirection,
  styled,
  useElementLayout,
  useOwnerState,
  usePressEvents,
  useResponderEvents,
} from '@react-universal/core';
import { composeEventHandlers, isString, pick } from '@react-universal/utils';
import { useComposedRefs } from '@tamagui/compose-refs';
import { use, useRef } from 'react';
import type { TextOwnerState, TextProps, TextStyle } from './Text.types';
import { TextAncestorContext } from './TextAncestorContext';

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
    htmlFor: true,
    lang: true,
  });
}

const TextRoot = styled<any>('div', {
  name: 'Text',
  slot: 'Root',
})<{ ownerState: TextOwnerState }>(({ theme }) => ({
  backgroundColor: 'transparent',
  fontFamily: theme.fonts.body,
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  variants: {
    hasTextAncestor: {
      true: {
        fontFamily: 'inherit',
        whiteSpace: 'inherit',
      },
    },
    pressable: {
      true: {
        cursor: 'pointer',
      },
    },
    numberOfLines: {
      1: {
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
      },
    },
  },
}));

const textNumberOfLinesStyle: TextStyle = {
  display: '-webkit-box' as any,
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 'var(--number-of-lines)',
};

export const Text: React.FC<TextProps & { ref?: React.Ref<HTMLElement> }> = ({
  as: _as,
  dir,
  disabled = false,
  hrefAttrs,
  numberOfLines,
  onClick,
  onContextMenu,
  onKeyDown,
  onLayout,
  onLongPress,
  onMoveShouldSetResponder,
  onPress,
  onPressIn,
  onPressOut,
  onResponderGrant,
  onResponderMove,
  onResponderRelease,
  onResponderTerminate,
  onResponderTerminationRequest,
  onStartShouldSetResponder,
  style,
  ...props
}) => {
  const hasTextAncestor = use(TextAncestorContext);
  const hostRef = useRef<HTMLElement>(null);

  const pressEventHandlers = usePressEvents(hostRef, {
    disabled,
    onLongPress,
    onPress,
    onPressIn,
    onPressOut,
  });

  useElementLayout(hostRef, onLayout);
  useResponderEvents(hostRef, {
    onMoveShouldSetResponder,
    onResponderGrant: composeEventHandlers(pressEventHandlers.onResponderGrant, onResponderGrant),
    onResponderMove: composeEventHandlers(pressEventHandlers.onResponderMove, onResponderMove),
    onResponderRelease: composeEventHandlers(
      pressEventHandlers.onResponderRelease,
      onResponderRelease,
    ),
    onResponderTerminate: composeEventHandlers(
      pressEventHandlers.onResponderTerminate,
      onResponderTerminate,
    ),
    onResponderTerminationRequest: composeEventHandlers(
      pressEventHandlers.onResponderTerminationRequest,
      onResponderTerminationRequest,
    ),
    onStartShouldSetResponder: composeEventHandlers(
      pressEventHandlers.onStartShouldSetResponder,
      onStartShouldSetResponder,
    ),
  });

  let component: 'a' | 'div' | 'span' = hasTextAncestor ? 'span' : 'div';

  const langDirection = props.lang == null ? undefined : getLocaleDirection(props.lang);
  const componentDirection = dir ?? langDirection;

  const supportedProps = pickProps(props);
  supportedProps.dir = componentDirection;
  // 'auto' by default allows browsers to infer writing direction (root elements only)
  if (!hasTextAncestor) {
    supportedProps.dir = componentDirection ?? 'auto';
  }

  supportedProps.onClick = composeEventHandlers(pressEventHandlers.onClick, onClick);
  supportedProps.onContextMenu = composeEventHandlers(
    pressEventHandlers.onContextMenu,
    onContextMenu,
  );
  supportedProps.onKeyDown = composeEventHandlers(pressEventHandlers.onKeyDown, onKeyDown);

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

  const handleRef = useComposedRefs(hostRef, props.ref);

  supportedProps.ref = handleRef;

  const ownerState = useOwnerState({
    hasTextAncestor,
    numberOfLines,
    pressable: onClick != null || onPress != null || onLongPress != null,
  });

  const element = (
    <TextRoot
      as={_as ?? component}
      ownerState={ownerState}
      style={[
        { '--number-of-lines': numberOfLines },
        numberOfLines != null && numberOfLines > 1 && textNumberOfLinesStyle,
        style,
      ]}
      {...supportedProps}
    />
  );

  return hasTextAncestor ? (
    element
  ) : (
    <TextAncestorContext.Provider value>{element}</TextAncestorContext.Provider>
  );
};

Text.displayName = 'Text';
