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
import { isString, normalizeEvent, pick } from '@react-universal/utils';
import { useComposedRefs } from '@tamagui/compose-refs';
import { useCallback, useContext, useRef } from 'react';
import type { TextMethods, TextOwnerState, TextProps } from './Text.types';
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
  variants: [
    {
      props: { hasTextAncestor: true },
      style: {
        fontFamily: 'inherit',
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

export const Text: React.FC<TextProps & { ref?: React.Ref<HTMLElement & TextMethods> }> = ({
  as: _as,
  dir,
  hrefAttrs,
  numberOfLines,
  onClick,
  onLayout,
  onPress,
  style,
  ...props
}) => {
  const hasTextAncestor = useContext(TextAncestorContext);
  const hostRef = useRef<HTMLElement>(null);

  useElementLayout(hostRef, onLayout);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (onClick != null) {
        onClick(event);
      } else if (onPress != null) {
        event.stopPropagation();
        onPress(normalizeEvent(event));
      }
    },
    [onClick, onPress],
  );

  let component: 'a' | 'div' | 'span' = hasTextAncestor ? 'span' : 'div';

  const langDirection = props.lang == null ? undefined : getLocaleDirection(props.lang);
  const componentDirection = dir ?? langDirection;

  const supportedProps = pickProps(props);
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
  const handleRef = useComposedRefs(hostRef, platformMethodsRef, props.ref);

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
};

Text.displayName = 'Text';
