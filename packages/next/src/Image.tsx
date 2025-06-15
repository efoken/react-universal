'use client';

import type { ImageStyle } from '@react-universal/components';
import type { StyleProp, SxProps } from '@react-universal/core';
import { css, styled } from '@react-universal/core';
import type { ImageProps as NextImageProps } from 'next/image';
import NextImage from 'next/image';

export interface ImageProps extends Omit<NextImageProps, 'className' | 'style'> {
  style?: StyleProp<ImageStyle>;
  sx?: SxProps;
}

export const Image = styled(
  ({ className, style, ...props }: NextImageProps) => (
    <NextImage {...css.props(style)} {...props} />
  ),
  {
    name: 'Image',
    slot: 'Root',
  },
)({
  display: 'block',
}) as React.FC<React.PropsWithoutRef<ImageProps> & { ref?: React.Ref<HTMLImageElement> }>;
