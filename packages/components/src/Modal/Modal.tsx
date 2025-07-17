'use client';

import type { ForwardedProps } from '@react-universal/core';
import {
  forwardedProps,
  getLocaleDirection,
  styled,
  useElementLayout,
  useOwnerState,
  useResponderEvents,
} from '@react-universal/core';
import { pick } from '@react-universal/utils';
import { useComposedRefs } from '@tamagui/compose-refs';
import { useEffect, useRef } from 'react';
import type { ModalMethods, ModalOwnerState, ModalProps } from './Modal.types';

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
    lang: true,
    onScroll: true,
    onWheel: true,
  });
}

const ModalRoot = styled('dialog', {
  name: 'Modal',
  slot: 'Root',
})<{ ownerState: ModalOwnerState }>({
  backgroundColor: 'transparent',
  flexDirection: 'column',
  height: '100%',
  inset: 0,
  maxHeight: 'none',
  maxWidth: 'none',
  width: '100%',
  variants: {
    hideBackdrop: {
      true: {
        '&::backdrop': {
          display: 'none',
        },
      },
      false: {
        '&::backdrop': {
          backgroundColor: 'var(--backdrop-color, rgba(0, 0, 0, 0.5))',
          display: 'block',
        },
      },
    },
  },
});

export const Modal: React.FC<
  ModalProps & { ref?: React.Ref<HTMLDialogElement & ModalMethods> }
> = ({
  backdropColor,
  dir,
  hideBackdrop = false,
  onClose,
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
  open,
  role,
  style,
  ...props
}) => {
  const hostRef = useRef<HTMLDialogElement>(null);

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

  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
  };

  const handleClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === hostRef.current && hostRef.current.open && !hideBackdrop) {
      onClose?.(event, 'backdropPress');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape' && hostRef.current?.open) {
      onClose?.(event, 'escapeKeyDown');
      event.stopPropagation();
    }
  };

  const langDirection = props.lang == null ? undefined : getLocaleDirection(props.lang);
  const componentDirection = dir ?? langDirection;

  const supportedProps = pickProps(props);
  supportedProps['aria-live'] = 'polite';
  supportedProps['aria-modal'] = role === 'dialog' || role === 'alertdialog' ? true : undefined;
  supportedProps.dir = componentDirection;
  supportedProps.onCancel = handleCancel;
  // @ts-expect-error: `onClick` is currently missing in forwarded props
  supportedProps.onClick = handleClick;
  supportedProps.onKeyDown = handleKeyDown;
  supportedProps.role = role;

  const handleRef = useComposedRefs(hostRef, props.ref);

  supportedProps.ref = handleRef;

  useEffect(() => {
    if (open) {
      hostRef.current?.showModal();
    } else {
      hostRef.current?.close();
    }
  }, [open]);

  const ownerState = useOwnerState({
    hideBackdrop,
  });

  return (
    <ModalRoot
      ownerState={ownerState}
      style={[{ '--backdrop-color': backdropColor }, style]}
      {...supportedProps}
    />
  );
};

Modal.displayName = 'Modal';
