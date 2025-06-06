import { normalizeLayoutEvent, normalizeRole, styled } from '@react-universal/core';
import { Image as RNImage } from 'react-native';
import type { ImageType } from './Image.types';

const ImageRoot = styled(RNImage, {
  name: 'Image',
  slot: 'Root',
})(({ theme }) => ({
  borderColor: theme.colors.border.default,
  position: 'static',
}));

export const Image = (({ lang, onLayout, ref, role, style, ...props }) => (
  <ImageRoot
    ref={ref as any}
    accessibilityLanguage={lang}
    role={normalizeRole(role)}
    style={style as any}
    onLayout={normalizeLayoutEvent(onLayout)}
    {...props}
  />
)) as ImageType;

Image.displayName = 'Image';

Image.abortPrefetch = RNImage.abortPrefetch?.bind(Image);
Image.getSize = RNImage.getSize.bind(Image);
Image.getSizeWithHeaders = RNImage.getSizeWithHeaders.bind(Image);
Image.prefetch = RNImage.prefetch.bind(Image);
Image.prefetchWithMetadata = RNImage.prefetchWithMetadata.bind(Image);
Image.queryCache = RNImage.queryCache?.bind(Image);
Image.resolveAssetSource = RNImage.resolveAssetSource.bind(Image);
