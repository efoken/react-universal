'use client';

import type { SxProps } from '@react-universal/core';
import { styled } from '@react-universal/core';
import type { ViewProps } from '../View';
import { View } from '../View';

export interface SpacerProps extends ViewProps {
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

const SpacerRoot = styled(View, {
  name: 'Spacer',
  slot: 'Root',
})({
  alignSelf: 'stretch',
  flex: 1,
  justifySelf: 'stretch',
});

export const Spacer: React.FC<SpacerProps & { ref?: React.Ref<HTMLElement> }> = (props) => (
  <SpacerRoot {...props} />
);

Spacer.displayName = 'Spacer';
