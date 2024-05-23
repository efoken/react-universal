import { useIsomorphicLayoutEffect } from '@tamagui/constants';
import { getRect } from '@universal-ui/utils';
import type {
  MeasureInWindowOnSuccessCallback,
  MeasureOnSuccessCallback,
  NativeMethods,
} from 'react-native';
import { measureLayout } from './useElementLayout';

export function usePlatformMethods(hostRef: React.RefObject<HTMLElement>) {
  useIsomorphicLayoutEffect(() => {
    const node = hostRef.current as (HTMLElement & NativeMethods) | null;
    if (node != null) {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      node.measure ||= (callback: MeasureOnSuccessCallback) =>
        measureLayout(node, null, callback);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      node.measureLayout ||= (relativeToNode: any, success: any) =>
        measureLayout(node, relativeToNode, success);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      node.measureInWindow ||= (callback: MeasureInWindowOnSuccessCallback) => {
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
