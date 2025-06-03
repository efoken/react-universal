import type { SxProps } from '@react-universal/core';
import type { TextMethods, TextProps } from '../Text';

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

export type LinkType = React.FC<
  React.PropsWithoutRef<LinkProps> & React.RefAttributes<HTMLAnchorElement & TextMethods>
>;
