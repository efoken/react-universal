import { normalizeLayoutEvent, normalizeRole, styled } from '@universal-ui/core';
import { forwardRef } from 'react';
import { View as RNView } from 'react-native';
import type { ViewProps, ViewType } from './View.types';

const ViewRoot = styled(RNView, {
  name: 'View',
  slot: 'Root',
})({
  position: 'static',
});

export const View = forwardRef<any, ViewProps>(({ onLayout, role, style, ...props }, ref) => (
  <ViewRoot
    ref={ref}
    role={normalizeRole(role)}
    style={style as any}
    onLayout={normalizeLayoutEvent(onLayout)}
    {...props}
  />
)) as unknown as ViewType;

View.displayName = 'View';
