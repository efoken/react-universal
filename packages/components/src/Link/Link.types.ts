import type { SxProps } from '@react-universal/core';
import type { TextProps } from '../Text';

export interface LinkProps extends Omit<TextProps, 'as' | 'hrefAttrs'> {
  download?: any;
  /**
   * The URL to link to when the link is clicked.
   */
  href?: string;
  rel?: string;
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
  target?: React.HTMLAttributeAnchorTarget;
}
