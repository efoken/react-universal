import { normalizeLayoutEvent, normalizeRole, styled } from '@universal-ui/core';
import { forwardRef } from 'react';
import { Text as RNText } from 'react-native';
import type { TextProps, TextType } from './Text.types';

const TextRoot = styled(RNText, {
  name: 'Text',
  slot: 'Root',
})(({ theme }) => ({
  fontFamily: theme.fonts.body.family,
  fontStyle: 'normal',
  fontWeight: 'normal',
  position: 'static',
}));

export const Text = forwardRef<any, TextProps>(
  ({ 'aria-hidden': ariaHidden, lang, onLayout, role, style, ...props }, ref) => (
    <TextRoot
      ref={ref}
      accessibilityElementsHidden={ariaHidden}
      accessibilityLanguage={lang}
      aria-hidden={ariaHidden}
      importantForAccessibility={ariaHidden ? 'no-hide-descendants' : undefined}
      role={normalizeRole(role)}
      style={style as any}
      onLayout={normalizeLayoutEvent(onLayout)}
      {...props}
    />
  ),
) as unknown as TextType;

Text.displayName = 'Text';
