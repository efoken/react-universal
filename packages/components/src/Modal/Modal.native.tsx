import type { ResponderEvent } from '@react-universal/core';
import {
  normalizeLayoutEvent,
  normalizeResponderEvent,
  normalizeRole,
  styled,
  useBackHandler,
  useOwnerState,
} from '@react-universal/core';
import { Modal as RNModal, Pressable as RNPressable } from 'react-native';
import type { ModalOwnerState, ModalProps } from './Modal.types';

const ModalRoot = styled(RNModal, {
  name: 'Modal',
  slot: 'Root',
})();

const ModalBackdrop = styled(RNPressable, {
  name: 'Modal',
  slot: 'Backdrop',
})<{ ownerState: ModalOwnerState }>({
  variants: {
    hideBackdrop: {
      true: {
        display: 'none',
      },
    },
  },
});

export const Modal: React.FC<ModalProps & { ref?: React.Ref<any> }> = ({
  backdropColor,
  children,
  hideBackdrop = false,
  lang,
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
  onStartShouldSetResponder,
  onStartShouldSetResponderCapture,
  onTouchCancel,
  onTouchEnd,
  onTouchEndCapture,
  onTouchMove,
  onTouchStart,
  open,
  role,
  style,
  ...props
}) => {
  const handleAccessibilityEscape = () => {
    onClose?.({}, 'escapeKeyDown');
  };

  const handleBackdropPress = (event: ResponderEvent) => {
    onClose?.(event, 'backdropPress');
  };

  useBackHandler(() => {
    if (open) {
      onClose?.({}, 'hardwareBackPress');
    }
    return true;
  });

  const ownerState = useOwnerState({
    backdropColor,
    hideBackdrop,
  });

  if (!open) {
    return null;
  }

  return (
    <ModalRoot
      navigationBarTranslucent
      statusBarTranslucent
      transparent
      accessibilityLanguage={lang}
      animationType="fade"
      aria-live="polite"
      aria-modal={role === 'dialog' || role === 'alertdialog' ? true : undefined}
      role={normalizeRole(role)}
      style={style as any}
      supportedOrientations={['portrait', 'landscape']}
      visible={open}
      onAccessibilityEscape={handleAccessibilityEscape}
      onLayout={normalizeLayoutEvent(onLayout)}
      onMoveShouldSetResponder={normalizeResponderEvent(onMoveShouldSetResponder)}
      onMoveShouldSetResponderCapture={normalizeResponderEvent(onMoveShouldSetResponderCapture)}
      onRequestClose={onClose}
      onResponderEnd={normalizeResponderEvent(onResponderEnd)}
      onResponderGrant={normalizeResponderEvent(onResponderGrant)}
      onResponderMove={normalizeResponderEvent(onResponderMove)}
      onResponderReject={normalizeResponderEvent(onResponderReject)}
      onResponderRelease={normalizeResponderEvent(onResponderRelease)}
      onResponderStart={normalizeResponderEvent(onResponderStart)}
      onResponderTerminate={normalizeResponderEvent(onResponderTerminate)}
      onResponderTerminationRequest={normalizeResponderEvent(onResponderTerminationRequest)}
      onStartShouldSetResponder={normalizeResponderEvent(onStartShouldSetResponder)}
      onStartShouldSetResponderCapture={normalizeResponderEvent(onStartShouldSetResponderCapture)}
      onTouchCancel={normalizeResponderEvent(onTouchCancel)}
      onTouchEnd={normalizeResponderEvent(onTouchEnd)}
      onTouchEndCapture={normalizeResponderEvent(onTouchEndCapture)}
      onTouchMove={normalizeResponderEvent(onTouchMove)}
      onTouchStart={normalizeResponderEvent(onTouchStart)}
      {...props}
    >
      {!hideBackdrop && (
        <ModalBackdrop
          ownerState={ownerState}
          role="presentation"
          style={{ backgroundColor: backdropColor }}
          onPress={normalizeResponderEvent(handleBackdropPress)}
        />
      )}
      {children}
    </ModalRoot>
  );
};

Modal.displayName = 'Modal';
