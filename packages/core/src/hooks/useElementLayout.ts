import { getBoundingClientRect, isFunction } from '@react-universal/utils';
import { isWindowDefined, useIsomorphicLayoutEffect } from '@tamagui/constants';
import type { MeasureOnSuccessCallback } from 'react-native';

const layoutHandlers = new WeakMap<Element, (event: LayoutEvent) => void>();
const resizeListeners = new Set<() => void>();

export interface LayoutValue {
  height: number;
  left: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

export interface LayoutEvent {
  nativeEvent: {
    layout: LayoutValue;
    target: any;
  };
  timeStamp: number;
}

function getRelativeDimensions(a: DOMRectReadOnly, b: DOMRectReadOnly) {
  const x = a.left - b.left;
  const y = a.top - b.top;
  return { x, y, width: a.width, height: a.height, left: a.left, top: a.top };
}

function getBoundingClientRectAsync(element: HTMLElement): Promise<DOMRectReadOnly | undefined> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(getBoundingClientRect(element));
    }, 10);
    const observer = new IntersectionObserver(
      (entries, ob) => {
        clearTimeout(timer);
        ob.disconnect();
        resolve(entries[0]?.boundingClientRect);
      },
      {
        threshold: 0.0001,
      },
    );
    observer.observe(element);
  });
}

const cache = new WeakMap();

export function measureLayout(
  node: HTMLElement,
  relativeTo: HTMLElement | null,
  callback: MeasureOnSuccessCallback,
) {
  const relativeNode = relativeTo ?? node?.parentNode;
  if (relativeNode instanceof HTMLElement) {
    const now = Date.now();
    cache.set(node, now);
    Promise.all([getBoundingClientRectAsync(node), getBoundingClientRectAsync(relativeNode)]).then(
      ([nodeDim, relativeNodeDim]) => {
        if (relativeNodeDim && nodeDim && cache.get(node) === now) {
          const { x, y, width, height, left, top } = getRelativeDimensions(
            nodeDim,
            relativeNodeDim,
          );
          callback(x, y, width, height, left, top);
        }
      },
    );
  }
}

export async function measureElement(target: HTMLElement): Promise<LayoutEvent> {
  return new Promise((res) => {
    measureLayout(target, null, (x, y, width, height, left, top) => {
      res({
        nativeEvent: {
          layout: { x, y, width, height, left, top },
          target,
        },
        timeStamp: Date.now(),
      });
    });
  });
}

let resizeObserver: ResizeObserver | null = null;

if (isWindowDefined && 'ResizeObserver' in window) {
  // node resize/move
  resizeObserver = new ResizeObserver((entries) => {
    for (const { target } of entries) {
      const onLayout = layoutHandlers.get(target);
      if (!isFunction(onLayout)) {
        return;
      }
      measureElement(target as HTMLElement).then((event) => {
        onLayout(event);
      });
    }
  });

  // window resize
  if (isFunction(window.addEventListener)) {
    let timer: ReturnType<typeof setTimeout>;
    window.addEventListener('resize', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        for (const listener of resizeListeners) {
          listener();
        }
      }, 4);
    });
  }
}

export function useElementLayout(
  ref: React.RefObject<HTMLElement>,
  onLayout?: ((event: LayoutEvent) => void) | null,
) {
  // Two effects because expensive to re-run on every change of onLayout
  useIsomorphicLayoutEffect(() => {
    if (!onLayout) {
      return;
    }
    const node = ref.current;
    if (!node) {
      return;
    }
    layoutHandlers.set(node, onLayout);
  }, [ref, onLayout]);

  useIsomorphicLayoutEffect(() => {
    if (!resizeObserver) {
      return;
    }
    const node = ref.current;
    if (!node) {
      return;
    }
    if (!layoutHandlers.has(node)) {
      return;
    }
    const handleResize = () => {
      measureElement(node).then(onLayout);
    };
    resizeListeners.add(handleResize);
    resizeObserver.observe(node);
    return () => {
      resizeListeners.delete(handleResize);
      resizeObserver?.unobserve(node);
    };
  }, [ref]);
}
