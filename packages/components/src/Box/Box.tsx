'use client';

import type { SxProps } from '@react-universal/core';
import { styled } from '@react-universal/core';
import type { ViewMethods, ViewProps } from '../View';
import { View } from '../View';

export interface BoxMethods extends ViewMethods {}

export interface BoxProps extends ViewProps {
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export const Box = styled(View, {
  name: 'Box',
})({
  flexDirection: 'row',
}) as React.FC<BoxProps & { ref?: React.Ref<HTMLElement & BoxMethods> }>;
