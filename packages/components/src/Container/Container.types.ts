import type { Breakpoint, SxProps } from '@react-universal/core';
import type { ViewMethods, ViewProps } from '../View';

export interface ContainerMethods extends ViewMethods {}

export interface ContainerProps extends ViewProps {
  /**
   * Set the max-width to match the min-width of the current breakpoint. This is
   * useful if you'd prefer to design for a fixed set of sizes instead of trying
   * to accommodate a fully fluid viewport. It's fluid by default.
   * @default false
   */
  fixed?: boolean;
  /**
   * Determine the max-width of the container. The container width grows with
   * the size of the screen. Set to `false` to disable max-width.
   * @default 'lg'
   */
  maxWidth?: Breakpoint | false;
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
}

export type ContainerOwnerState = Required<Pick<ContainerProps, 'fixed' | 'maxWidth'>>;
