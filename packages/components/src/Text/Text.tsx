'use client';

import type { AnyProps } from '@universal-ui/core';
import {
  forwardedProps,
  getLocaleDirection,
  styled,
  useElementLayout,
  useForkRef,
  useOwnerState,
  usePlatformMethods,
} from '@universal-ui/core';
import { isString, pick } from '@universal-ui/utils';
import { forwardRef, useCallback, useContext, useRef } from 'react';
import type { GestureResponderEvent, NativeMethods } from 'react-native';
import type { TextOwnerState, TextProps } from './Text.types';
import { TextAncestorContext } from './TextAncestorContext';

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
    pointerEvents: true,
  });
}

const TextRoot = styled('div', {
  name: 'Text',
  slot: 'Root',
})<{ ownerState: TextOwnerState }>(
  ({ ownerState, theme }) => ({
    backgroundColor: 'transparent',
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 0,
    boxSizing: 'border-box',
    color: '#000',
    fontFamily: theme.fonts.body.family,
    fontStyle: 'normal',
    fontWeight: 'normal',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    textAlign: 'start' as any,
    textDecorationLine: 'none',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    ...(ownerState.hasTextAncestor && {
      color: 'inherit',
      fontFamily: 'inherit' as any,
      fontSize: 'inherit' as any,
      fontStyle: 'inherit' as any,
      fontWeight: 'inherit' as any,
      textAlign: 'inherit' as any,
      whiteSpace: 'inherit',
    }),
    ...(ownerState.pressable && {
      cursor: 'pointer',
    }),
  }),
  ({ ownerState }) =>
    ownerState.numberOfLines != null && {
      ...(ownerState.numberOfLines === 1 && {
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
      }),
      ...(ownerState.numberOfLines > 1 && {
        display: '-webkit-box' as any,
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: ownerState.numberOfLines,
      }),
    },
);

export const Text = forwardRef<any, TextProps>(
  (
    {
      as: asProp,
      hrefAttrs,
      numberOfLines,
      onClick,
      onLayout,
      onPress,
      ...props
    },
    ref,
  ) => {
    const hasTextAncestor = useContext(TextAncestorContext);
    const hostRef = useRef<HTMLElement>(null);

    useElementLayout(hostRef, onLayout);

    const handleClick = useCallback(
      (event: GestureResponderEvent) => {
        if (onClick != null) {
          onClick(event);
        } else if (onPress != null) {
          event.stopPropagation();
          onPress(event);
        }
      },
      [onClick, onPress],
    );

    let component: 'a' | 'div' | 'span' = hasTextAncestor ? 'span' : 'div';

    const langDirection =
      props.lang == null ? undefined : getLocaleDirection(props.lang);
    const componentDirection = props.dir ?? langDirection;

    const supportedProps: AnyProps = pickProps(props);
    supportedProps.dir = componentDirection;
    // 'auto' by default allows browsers to infer writing direction (root elements only)
    if (!hasTextAncestor) {
      supportedProps.dir = componentDirection ?? 'auto';
    }

    if (onClick != null || onPress != null) {
      supportedProps.onClick = handleClick;
    }

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
      numberOfLines,
      pressable: onClick != null || onPress != null,
      role: props.role,
    });

    const element = (
      <TextRoot
        as={asProp ?? component}
        ownerState={ownerState}
        {...supportedProps}
      />
    );

    return hasTextAncestor ? (
      element
    ) : (
      <TextAncestorContext.Provider value>
        {element}
      </TextAncestorContext.Provider>
    );
  },
) as unknown as React.FunctionComponent<
  TextProps & React.RefAttributes<NativeMethods>
> &
  NativeMethods;

Text.displayName = 'Text';
