'use client';

import type { AnyProps } from '@react-universal/core';
import {
  forwardedProps,
  getLocaleDirection,
  styled,
  useElementLayout,
  usePlatformMethods,
} from '@react-universal/core';
import { noop, pick } from '@react-universal/utils';
import { useComposedRefs } from '@tamagui/compose-refs';
import { forwardRef, useRef } from 'react';
import type { ImageMethods, ImageProps, ImageType } from './Image.types';
import { ImageLoader } from './ImageLoader';

function pickProps<T extends AnyProps>(props: T) {
  return pick(props, {
    ...forwardedProps.defaultProps,
    ...forwardedProps.accessibilityProps,
    ...forwardedProps.clickProps,
    ...forwardedProps.focusProps,
    ...forwardedProps.keyboardProps,
    ...forwardedProps.mouseProps,
    ...forwardedProps.touchProps,
    ...forwardedProps.styleProps,
    alt: true,
    crossOrigin: true,
    decoding: true,
    fetchPriority: true,
    height: true,
    lang: true,
    loading: true,
    referrerPolicy: true,
    sizes: true,
    src: true,
    srcSet: true,
    useMap: true,
    width: true,
  });
}

const ImageRoot = styled('img', {
  name: 'Image',
  slot: 'Root',
})({
  display: 'block',
});

export const Image = forwardRef<HTMLImageElement & ImageMethods, ImageProps>(
  ({ dir, onError, onLayout, onLoad, onProgress, onPartialLoad, ...props }, ref) => {
    const hostRef = useRef<HTMLImageElement>(null);

    useElementLayout(hostRef, onLayout);

    const langDirection = props.lang == null ? undefined : getLocaleDirection(props.lang);
    const componentDirection = dir ?? langDirection;

    const supportedProps: AnyProps = pickProps(props);
    supportedProps.dir = componentDirection;

    const platformMethodsRef = usePlatformMethods(hostRef);
    const handleRef = useComposedRefs<HTMLImageElement>(hostRef, platformMethodsRef, ref);

    supportedProps.ref = handleRef;

    return <ImageRoot {...supportedProps} />;
  },
) as ImageType;

Image.displayName = 'Image';

Image.getSize = ImageLoader.getSize.bind(Image);
Image.getSizeWithHeaders = ImageLoader.getSize.bind(Image);
Image.prefetch = ImageLoader.prefetch.bind(Image);
Image.prefetchWithMetadata = ImageLoader.prefetch.bind(Image);
Image.queryCache = ImageLoader.queryCache.bind(Image);
Image.resolveAssetSource = noop as any;
