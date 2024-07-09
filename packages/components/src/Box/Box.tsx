'use client';

import type { SxProps } from '@universal-ui/core';
import { styled } from '@universal-ui/core';
import type { ViewMethods, ViewProps } from '../View';
import { View } from '../View';

export interface BoxProps extends ViewProps {
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type BoxType = React.FC<BoxProps & React.RefAttributes<ViewMethods>> & ViewMethods;

export const Box = styled(View, {
  name: 'Box',
})({
  flexDirection: 'row',
}) as unknown as BoxType;
