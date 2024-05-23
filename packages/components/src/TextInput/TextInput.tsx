'use client';

import type { SxProps } from '@universal-ui/core';
import { isWeb, styled } from '@universal-ui/core';
import { forwardRef } from 'react';
import type { TextInputProps as RNTextInputProps } from 'react-native';
import { TextInput as RNTextInput } from 'react-native';

export interface TextInputProps extends RNTextInputProps {
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

const TextInputRoot = styled(RNTextInput, {
  shouldForwardProp: (prop) => prop !== 'theme' && prop !== 'sx',
})();

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({ accessibilityLabel, 'aria-label': ariaLabel, ...props }, ref) => (
    <TextInputRoot
      ref={ref}
      {...(isWeb
        ? { 'aria-label': ariaLabel ?? accessibilityLabel }
        : { accessibilityLabel: ariaLabel ?? accessibilityLabel })}
      {...props}
    />
  ),
);

TextInput.displayName = 'TextInput';
