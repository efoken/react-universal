'use client';

import { OverridableComponent, SxProps, styled } from '@universal-ui/styles';
import { forwardRef } from 'react';
import {
  Platform,
  Text as RNText,
  TextProps as RNTextProps,
} from 'react-native';

export interface TextProps extends RNTextProps {
  sx?: SxProps;
}

const TextRoot = styled(RNText)();

export const Text = forwardRef<RNText, TextProps>(
  (
    {
      accessibilityElementsHidden,
      'aria-hidden': ariaHidden,
      importantForAccessibility,
      ...props
    },
    ref,
  ) => (
    <TextRoot
      ref={ref}
      {...(Platform.OS === 'web'
        ? { 'aria-hidden': ariaHidden }
        : {
            accessibilityElementsHidden:
              ariaHidden ?? accessibilityElementsHidden,
            importantForAccessibility: ariaHidden
              ? 'no-hide-descendants'
              : importantForAccessibility,
          })}
      {...props}
    />
  ),
) as OverridableComponent<TextProps, typeof RNText>;
