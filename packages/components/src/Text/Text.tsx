'use client';

import type { ForwardedProps } from '@react-universal/core';
import {
  forwardedProps,
  getLocaleDirection,
  styled,
  useElementLayout,
  useOwnerState,
  usePlatformMethods,
} from '@react-universal/core';
import type { AnyObject } from '@react-universal/utils';
import { isString, pick } from '@react-universal/utils';
import { useComposedRefs } from '@tamagui/compose-refs';
import { forwardRef, useCallback, useContext, useRef } from 'react';
import type { GestureResponderEvent } from 'react-native';
import type { TextMethods, TextOwnerState, TextProps, TextType } from './Text.types';
import { TextAncestorContext } from './TextAncestorContext';

function pickProps<T extends AnyObject>(props: T) {
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

const TextRoot = styled('div', {
  name: 'Text',
  slot: 'Root',
})<{ ownerState: TextOwnerState }>(({ theme }) => ({
  backgroundColor: 'transparent',
  fontFamily: theme.fonts.body.family,
  textAlign: 'start' as any,
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  variants: [
    {
      props: { hasTextAncestor: true },
      style: {
        fontFamily: 'inherit',
        textAlign: 'inherit' as any,
        whiteSpace: 'inherit',
      },
    },
    {
      props: { pressable: true },
      style: {
        cursor: 'pointer',
      },
    },
    {
      props: { numberOfLines: 1 },
      style: {
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
      },
    },
    {
      props: ({ numberOfLines }) => numberOfLines != null && numberOfLines > 1,
      style: {
        display: '-webkit-box' as any,
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 'var(--number-of-lines)',
      },
    },
  ],
}));

export const Text = forwardRef<HTMLElement & TextMethods, TextProps>(
  (
    { as: _as, dir, hrefAttrs, numberOfLines, onClick, onLayout, onPress, style, ...props },
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

    const langDirection = props.lang == null ? undefined : getLocaleDirection(props.lang);
    const componentDirection = dir ?? langDirection;

    const supportedProps: ForwardedProps<HTMLElement> = pickProps(props);
    supportedProps.dir = componentDirection;
    // 'auto' by default allows browsers to infer writing direction (root elements only)
    if (!hasTextAncestor) {
      supportedProps.dir = componentDirection ?? 'auto';
    }

    if (onClick != null || onPress != null) {
      // @ts-expect-error: `onClick` is currently missing in forwarded props
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
          supportedProps.target = target.startsWith('_') ? target : `_${target}`;
        }
      }
    }

    const platformMethodsRef = usePlatformMethods(hostRef);
    const handleRef = useComposedRefs<HTMLElement>(hostRef, platformMethodsRef, ref);

    supportedProps.ref = handleRef;

    const ownerState = useOwnerState({
      hasTextAncestor,
      numberOfLines,
      pressable: onClick != null || onPress != null,
    });

    const element = (
      <TextRoot
        as={_as ?? component}
        ownerState={ownerState}
        style={[{ '--number-of-lines': numberOfLines }, style]}
        {...supportedProps}
      />
    );

    return hasTextAncestor ? (
      element
    ) : (
      <TextAncestorContext.Provider value>{element}</TextAncestorContext.Provider>
    );
  },
) as TextType;

Text.displayName = 'Text';
