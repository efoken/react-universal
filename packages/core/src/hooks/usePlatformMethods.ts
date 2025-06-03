import type { AnyObject } from '@react-universal/utils';
import { getRect } from '@react-universal/utils';
import { useIsomorphicLayoutEffect } from '@tamagui/constants';
import type React from 'react';
import type {
  MeasureInWindowOnSuccessCallback,
  MeasureLayoutOnSuccessCallback,
  MeasureOnSuccessCallback,
} from 'react-native';
import { measureLayout } from './useElementLayout';

export interface PlatformComponent<P>
  extends Pick<React.ComponentClass<P>, Exclude<keyof React.ComponentClass<P>, 'new'>> {
  new (props: P, context?: any): React.Component<P> & Readonly<PlatformMethods>;
}

export interface PlatformMethods {
  blur(): void;
  focus(): void;
  measure(callback: MeasureOnSuccessCallback): void;
  measureInWindow(callback: MeasureInWindowOnSuccessCallback): void;
  measureLayout(
    relativeToNativeComponentRef: Omit<PlatformMethods, 'refs'> | number,
    callback: MeasureLayoutOnSuccessCallback,
    error?: () => void,
  ): void;
  setNativeProps(nativeProps: AnyObject): void;
}

export function usePlatformMethods<T extends HTMLElement>(hostRef: React.RefObject<T | null>) {
  useIsomorphicLayoutEffect(() => {
    const node = hostRef.current as (T & PlatformMethods) | null;
    if (node != null) {
      node.measure ||= (callback) => measureLayout(node, null, callback);
      node.measureLayout ||= (relativeToNativeComponentRef: any, callback) =>
        measureLayout(node, relativeToNativeComponentRef, callback);
      node.measureInWindow ||= (callback) => {
        if (node == null) {
          return;
        }
        setTimeout(() => {
          const { height, left, top, width } = getRect(node)!;
          callback(left, top, width, height);
        }, 0);
      };
    }
  }, [hostRef]);

  return hostRef as React.RefObject<T & PlatformMethods>;
}
