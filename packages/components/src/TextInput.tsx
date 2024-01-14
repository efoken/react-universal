'use client';

import { SxProps, styled } from '@universal-ui/styles';
import { forwardRef } from 'react';
import {
  Platform,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

export interface TextInputProps extends RNTextInputProps {
  sx?: SxProps;
}

const TextInputRoot = styled(RNTextInput, {
  shouldForwardProp: (prop) => prop !== 'sx',
})();

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({ accessibilityLabel, 'aria-label': ariaLabel, ...props }, ref) => (
    <TextInputRoot
      ref={ref}
      {...(Platform.OS === 'web'
        ? { 'aria-label': ariaLabel ?? accessibilityLabel }
        : { accessibilityLabel: ariaLabel ?? accessibilityLabel })}
      {...props}
    />
  ),
);
