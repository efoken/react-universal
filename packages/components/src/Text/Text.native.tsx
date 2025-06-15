import { normalizeLayoutEvent, normalizeRole, styled } from '@react-universal/core';
import { Text as RNText } from 'react-native';
import type { TextProps } from './Text.types';

const TextRoot = styled(RNText, {
  name: 'Text',
  slot: 'Root',
})(({ theme }) => ({
  borderColor: theme.colors.border.default,
  fontFamily: theme.fonts.body,
  position: 'static',
}));

export const Text: React.FC<TextProps & { ref?: React.Ref<any> }> = ({
  'aria-hidden': ariaHidden,
  lang,
  onLayout,
  role,
  style,
  ...props
}) => (
  <TextRoot
    accessibilityElementsHidden={ariaHidden}
    accessibilityLanguage={lang}
    aria-hidden={ariaHidden}
    importantForAccessibility={ariaHidden ? 'no-hide-descendants' : undefined}
    role={normalizeRole(role)}
    style={style as any}
    onLayout={normalizeLayoutEvent(onLayout)}
    {...props}
  />
);

Text.displayName = 'Text';
