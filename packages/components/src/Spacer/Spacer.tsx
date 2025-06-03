'use client';

import type { SxProps } from '@react-universal/core';
import { styled } from '@react-universal/core';
import type { ViewMethods, ViewProps } from '../View';
import { View } from '../View';

export interface SpacerMethods extends ViewMethods {}

export interface SpacerProps extends ViewProps {
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type SpacerType = React.FC<
  React.PropsWithoutRef<SpacerProps> & React.RefAttributes<HTMLDivElement & SpacerMethods>
>;

const SpacerRoot = styled(View, {
  name: 'Spacer',
  slot: 'Root',
})({
  alignSelf: 'stretch',
  flex: 1,
  justifySelf: 'stretch',
});

export const Spacer: React.FC<SpacerProps & React.RefAttributes<HTMLDivElement & SpacerMethods>> = (
  props,
) => <SpacerRoot {...props} />;

Spacer.displayName = 'Spacer';
