'use client';

import type {
  OverridableComponent,
  OverridableProps,
  SxProps,
} from '@universal-ui/core';
import { styled } from '@universal-ui/core';
import { View } from '../View';

export interface BoxOwnProps {
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type BoxProps<C extends React.ElementType = typeof View> =
  OverridableProps<BoxOwnProps, C> & {
    as?: React.ElementType;
  };

export const Box = styled(View, {
  label: 'Box',
})() as OverridableComponent<BoxOwnProps, typeof View>;
