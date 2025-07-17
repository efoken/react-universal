import { flip, shift, size, useFloating } from '@floating-ui/react-native';
import { normalizeRole, styled, useEnhancedEffect, useKeyboard } from '@react-universal/core';
import { useComposedRefs } from '@tamagui/compose-refs';
import { useEffect, useMemo, useRef } from 'react';
import { View as RNView, useWindowDimensions } from 'react-native';
import type { PopoverProps } from './Popover.types';
import { parseModifiers, resolveAnchor } from './Popover.utils';

const PopoverRoot = styled(RNView, {
  name: 'Popover',
  slot: 'Root',
})(({ theme }) => ({
  backgroundColor: theme.colors.background.default,
  borderColor: theme.colors.border.default,
  zIndex: 1,
}));

export const Popover: React.FC<PopoverProps & { ref?: React.Ref<any> }> = ({
  anchor: _anchor,
  children,
  lang,
  modifiers: _modifiers = [],
  open,
  placement = 'bottom',
  ref,
  role = 'tooltip',
  strategy: _strategy,
  style,
  ...props
}) => {
  const hostRef = useRef<RNView>(null);

  const anchor = resolveAnchor(_anchor);

  const modifiers = useMemo(
    () =>
      parseModifiers([
        {
          name: 'flip',
          enabled: true,
        },
        {
          name: 'shift',
          enabled: true,
        },
        ..._modifiers,
      ]),
    [_modifiers],
  );

  const { floatingStyles, refs, ...floating } = useFloating({
    middleware: [
      modifiers.flip?.enabled ? flip(modifiers.flip.options) : false,
      modifiers.shift?.enabled ? shift(modifiers.shift.options) : false,
      modifiers.size?.enabled ? size(modifiers.size.options) : false,
    ],
    placement,
    sameScrollView: true,
  });

  useEffect(() => {
    refs.setReference(anchor);
  }, [anchor, refs]);

  const dimensions = useWindowDimensions();
  const { open: keyboardOpen } = useKeyboard();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only trigger when `dimensions` change
  useEnhancedEffect(() => {
    floating.update();
  }, [dimensions, keyboardOpen]);

  const handleRef = useComposedRefs(hostRef, refs.setFloating, ref);

  const positioned =
    (floating.x == null || !Number.isNaN(floating.x)) &&
    (floating.y == null || !Number.isNaN(floating.y));

  return (
    open && (
      <PopoverRoot
        ref={handleRef}
        accessibilityLanguage={lang}
        collapsable={false}
        role={normalizeRole(role)}
        style={[
          style as any,
          positioned && {
            ...floatingStyles,
            opacity: Math.max(floating.x, floating.y) > 0 ? 1 : 0,
          },
        ]}
        {...props}
      >
        {children}
      </PopoverRoot>
    )
  );
};
