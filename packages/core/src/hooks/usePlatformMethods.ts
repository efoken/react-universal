import { getRect } from '@react-universal/utils';
import { useIsomorphicLayoutEffect } from '@tamagui/constants';
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
    relativeToNode: React.ElementRef<PlatformComponent<unknown>> | number,
    callback: MeasureLayoutOnSuccessCallback,
    error?: () => void,
  ): void;
}

export function usePlatformMethods<T extends HTMLElement>(hostRef: React.RefObject<T>) {
  useIsomorphicLayoutEffect(() => {
    const node = hostRef.current as (T & PlatformMethods) | null;
    if (node != null) {
      node.measure ||= (callback) => measureLayout(node, null, callback);
      node.measureLayout ||= (relativeToNode: any, callback) =>
        measureLayout(node, relativeToNode, callback);
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

  return hostRef;
}
