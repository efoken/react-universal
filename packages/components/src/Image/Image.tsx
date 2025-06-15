'use client';

import {
  type ForwardedProps,
  forwardedProps,
  getLocaleDirection,
  styled,
  useElementLayout,
  usePlatformMethods,
} from '@react-universal/core';
import { noop, pick } from '@react-universal/utils';
import { useComposedRefs } from '@tamagui/compose-refs';
import { useRef } from 'react';
import type { ImageMethods, ImageProps } from './Image.types';
import { ImageLoader } from './ImageLoader';

function pickProps<T extends { ref?: React.Ref<any> }>(
  props: T,
): ForwardedProps<NonNullable<T['ref']> extends React.Ref<infer T> ? T : HTMLElement> {
  // @ts-expect-error
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

export const Image = ({
  dir,
  onError,
  onLayout,
  onLoad,
  onPartialLoad,
  onProgress,
  ...props
}: ImageProps & { ref?: React.Ref<HTMLImageElement & ImageMethods> }): React.ReactNode => {
  const hostRef = useRef<HTMLImageElement>(null);

  useElementLayout(hostRef, onLayout);

  const langDirection = props.lang == null ? undefined : getLocaleDirection(props.lang);
  const componentDirection = dir ?? langDirection;

  const supportedProps = pickProps(props);
  supportedProps.dir = componentDirection;

  const platformMethodsRef = usePlatformMethods(hostRef);
  const handleRef = useComposedRefs(hostRef, platformMethodsRef, props.ref);

  supportedProps.ref = handleRef;

  return <ImageRoot {...supportedProps} />;
};

Image.displayName = 'Image';

Image.getSize = ImageLoader.getSize.bind(Image);
Image.getSizeWithHeaders = ImageLoader.getSize.bind(Image);
Image.prefetch = ImageLoader.prefetch.bind(Image);
Image.prefetchWithMetadata = ImageLoader.prefetch.bind(Image);
Image.queryCache = ImageLoader.queryCache.bind(Image);
Image.resolveAssetSource = noop as any;
