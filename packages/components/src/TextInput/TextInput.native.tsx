import {
  normalizeLayoutEvent,
  normalizeResponderEvent,
  normalizeRole,
  styled,
} from '@react-universal/core';
import { normalizeEvent } from '@react-universal/utils';
import { useState } from 'react';
import type {
  TextInputContentSizeChangeEvent as RNTextInputContentSizeChangeEvent,
  TextInputSelectionChangeEvent as RNTextInputSelectionChangeEvent,
} from 'react-native';
import { TextInput as RNTextInput } from 'react-native';
import type { TextInputProps } from './TextInput.types';

const TextInputRoot = styled(RNTextInput, {
  name: 'TextInput',
  slot: 'Root',
})(({ theme }) => ({
  fontFamily: theme.fonts.body,
  position: 'static',
}));

export const TextInput: React.FC<TextInputProps & { ref?: React.Ref<any> }> = ({
  'aria-label': ariaLabel,
  lang,
  onChangeText,
  onContentSizeChange,
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
  onSelectionChange,
  onStartShouldSetResponder,
  onStartShouldSetResponderCapture,
  onTouchCancel,
  onTouchEnd,
  onTouchEndCapture,
  onTouchMove,
  onTouchStart,
  role,
  style,
  ...props
}) => {
  const [text, setText] = useState<string>();

  const handleChangeText = (nextText: string) => {
    setText(nextText);
    onChangeText?.(nextText);
  };

  const handleContentSizeChange = (event: RNTextInputContentSizeChangeEvent) => {
    onContentSizeChange?.({
      nativeEvent: {
        contentSize: event.nativeEvent.contentSize,
      },
    });
  };

  const handleSelectionChange = (event: RNTextInputSelectionChangeEvent) => {
    onSelectionChange?.(normalizeEvent(event, { text }));
  };

  return (
    <TextInputRoot
      accessibilityLabel={ariaLabel}
      accessibilityLanguage={lang}
      role={normalizeRole(role)}
      style={style as any}
      onChangeText={handleChangeText}
      onContentSizeChange={handleContentSizeChange}
      onLayout={normalizeLayoutEvent(onLayout)}
      onMoveShouldSetResponder={normalizeResponderEvent(onMoveShouldSetResponder)}
      onMoveShouldSetResponderCapture={normalizeResponderEvent(onMoveShouldSetResponderCapture)}
      onResponderEnd={normalizeResponderEvent(onResponderEnd)}
      onResponderGrant={normalizeResponderEvent(onResponderGrant)}
      onResponderMove={normalizeResponderEvent(onResponderMove)}
      onResponderReject={normalizeResponderEvent(onResponderReject)}
      onResponderRelease={normalizeResponderEvent(onResponderRelease)}
      onResponderStart={normalizeResponderEvent(onResponderStart)}
      onResponderTerminate={normalizeResponderEvent(onResponderTerminate)}
      onResponderTerminationRequest={normalizeResponderEvent(onResponderTerminationRequest)}
      onSelectionChange={handleSelectionChange}
      onStartShouldSetResponder={normalizeResponderEvent(onStartShouldSetResponder)}
      onStartShouldSetResponderCapture={normalizeResponderEvent(onStartShouldSetResponderCapture)}
      onTouchCancel={normalizeResponderEvent(onTouchCancel)}
      onTouchEnd={normalizeResponderEvent(onTouchEnd)}
      onTouchEndCapture={normalizeResponderEvent(onTouchEndCapture)}
      onTouchMove={normalizeResponderEvent(onTouchMove)}
      onTouchStart={normalizeResponderEvent(onTouchStart)}
      {...props}
    />
  );
};

TextInput.displayName = 'TextInput';
