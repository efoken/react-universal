import { normalizeLayoutEvent, normalizeRole, styled } from '@universal-ui/core';
import { normalizeEvent } from '@universal-ui/utils';
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
})({
  position: 'static',
});

export const TextInput = forwardRef<any, TextInputProps>(
  (
    {
      'aria-label': ariaLabel,
      onContentSizeChange,
      onLayout,
      onChangeText,
      onSelectionChange,
      role,
      style,
      ...props
    },
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
        role={normalizeRole(role)}
        style={style as any}
        onChangeText={handleChangeText}
        onContentSizeChange={handleContentSizeChange}
        onLayout={normalizeLayoutEvent(onLayout)}
        onSelectionChange={handleSelectionChange}
        {...props}
      />
    );
  },
) as unknown as TextInputType;

TextInput.displayName = 'TextInput';
