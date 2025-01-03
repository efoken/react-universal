import { normalizeLayoutEvent, normalizeRole, styled } from '@react-universal/core';
import { forwardRef } from 'react';
import { Text as RNText } from 'react-native';
import type { TextProps, TextType } from './Text.types';

const TextRoot = styled(RNText, {
  name: 'Text',
  slot: 'Root',
})(({ theme }) => ({
  borderColor: theme.colors.border.default,
  fontFamily: theme.fonts.body,
  position: 'static',
}));

export const Text = forwardRef<any, TextProps>(
  ({ 'aria-hidden': ariaHidden, lang, onLayout, role, style, ...props }: TextProps, ref) => (
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
) as TextType;

Text.displayName = 'Text';
