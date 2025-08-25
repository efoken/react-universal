import type { AnyObject } from '@react-universal/utils';
import { useIsomorphicLayoutEffect } from '@tamagui/constants';
import type {
  MeasureInWindowOnSuccessCallback,
  MeasureLayoutOnSuccessCallback,
  MeasureOnSuccessCallback,
} from 'react-native';
import { createMeasure, createMeasureInWindow, createMeasureLayout } from './useElementLayout';

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
      node.measure ||= createMeasure(node);
      node.measureInWindow ||= createMeasureInWindow(node);
      node.measureLayout ||= createMeasureLayout(node) as any;
    }
  }, [hostRef]);

  return hostRef as React.RefObject<T & PlatformMethods>;
}
