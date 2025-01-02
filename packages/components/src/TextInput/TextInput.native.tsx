import {
  normalizeLayoutEvent,
  normalizeResponderEvent,
  normalizeRole,
  styled,
} from '@react-universal/core';
import { normalizeEvent } from '@react-universal/utils';
import { forwardRef, useState } from 'react';
import type {
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData as RNTextInputContentSizeChangeEventData,
  TextInputSelectionChangeEventData as RNTextInputSelectionChangeEventData,
} from 'react-native';
import { TextInput as RNTextInput } from 'react-native';
import type { TextInputProps, TextInputType } from './TextInput.types';

const TextInputRoot = styled(RNTextInput, {
  name: 'TextInput',
  slot: 'Root',
})(({ theme }) => ({
  fontFamily: theme.fonts.body,
  position: 'static',
}));

export const TextInput = forwardRef<any, TextInputProps>(
  (
    {
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
      role,
      style,
      ...props
    }: TextInputProps,
    ref,
  ) => {
    const [text, setText] = useState<string>();

    const handleChangeText = (nextText: string) => {
      setText(nextText);
      onChangeText?.(nextText);
    };

    const handleContentSizeChange = (
      event: NativeSyntheticEvent<RNTextInputContentSizeChangeEventData>,
    ) => {
      onContentSizeChange?.({
        nativeEvent: {
          contentSize: event.nativeEvent.contentSize,
        },
      });
    };

    const handleSelectionChange = (
      event: NativeSyntheticEvent<RNTextInputSelectionChangeEventData>,
    ) => {
      onSelectionChange?.(normalizeEvent(event, { text }));
    };

    return (
      <TextInputRoot
        ref={ref}
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
        {...props}
      />
    );
  },
) as TextInputType;

TextInput.displayName = 'TextInput';
