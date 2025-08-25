import type { AnyFunction } from '@react-universal/utils';
import { isEqualShallow, isFunction } from '@react-universal/utils';
import { isClient, isWindowDefined, useIsomorphicLayoutEffect } from '@tamagui/constants';
import type { MeasureInWindowOnSuccessCallback, MeasureOnSuccessCallback } from 'react-native';

const layoutHandlers = new WeakMap<HTMLElement, AnyFunction>();
const nodes = new Set<HTMLElement>();
const intersectionState = new WeakMap<HTMLElement, boolean>();

// Single persistent IntersectionObserver for all nodes
let globalIntersectionObserver: IntersectionObserver | undefined;

type LayoutMeasurementStrategy = 'off' | 'sync' | 'async';

let strategy: LayoutMeasurementStrategy = 'async';

export function setOnLayoutStrategy(state: LayoutMeasurementStrategy) {
  strategy = state;
}

export interface LayoutValue {
  height: number;
  pageX: number;
  pageY: number;
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

const nodeRectCache = new WeakMap<HTMLElement, DOMRect>();
const parentRectCache = new WeakMap<HTMLElement, DOMRect>();
const lastChangeTime = new WeakMap<HTMLElement, number>();

const requestAnimationFrame = isWindowDefined ? window.requestAnimationFrame : undefined;

// Prevent thrashing during first hydration (somewhat, streaming gets trickier)
let avoidUpdates = true;
const queuedUpdates = new Map<HTMLElement, AnyFunction>();

export function enable() {
  if (avoidUpdates) {
    avoidUpdates = false;
    if (queuedUpdates) {
      for (const cb of queuedUpdates.values()) {
        cb();
      }
      queuedUpdates.clear();
    }
  }
}

function startGlobalObservers() {
  if (!isClient || globalIntersectionObserver != null) {
    return;
  }
  globalIntersectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const node = entry.target as HTMLElement;
        if (intersectionState.get(node) !== entry.isIntersecting) {
          intersectionState.set(node, entry.isIntersecting);
        }
      }
    },
    { threshold: 0 },
  );
}

if (isClient) {
  if (requestAnimationFrame != null) {
    const supportsCheckVisibility = 'checkVisibility' in document.body;

    const boundingRects = new WeakMap<any, DOMRectReadOnly | undefined>();

    async function updateLayoutIfChanged(node: HTMLElement) {
      if (intersectionState.get(node) === false) {
        // Avoid due to not intersecting
        return;
      }
      // Triggers style recalculation in Safari which is slower than not
      if (process.env.TAMAGUI_ONLAYOUT_VISIBILITY_CHECK === '1') {
        if (supportsCheckVisibility && !(node as any).checkVisibility()) {
          // Avoid due to not visible
          return;
        }
      }

      const onLayout = layoutHandlers.get(node);
      if (!isFunction(onLayout)) {
        return;
      }

      const parentNode = node.parentElement;
      if (!parentNode) {
        return;
      }

      let nodeRect: DOMRectReadOnly;
      let parentRect: DOMRectReadOnly;

      if (strategy === 'async') {
        const [nr, pr] = await Promise.all([
          boundingRects.get(node) || getBoundingClientRectAsync(node),
          boundingRects.get(parentNode) || getBoundingClientRectAsync(parentNode),
        ]);

        if (nr === false || pr === false) {
          return;
        }

        nodeRect = nr;
        parentRect = pr;
      } else {
        nodeRect = node.getBoundingClientRect();
        parentRect = parentNode.getBoundingClientRect();
      }

      const cachedRect = nodeRectCache.get(node);
      const cachedParentRect = nodeRectCache.get(parentNode);

      if (
        cachedRect == null ||
        // Has changed one rect
        (!isEqualShallow(cachedRect, nodeRect) &&
          (cachedParentRect == null || !isEqualShallow(cachedParentRect, parentRect)))
      ) {
        nodeRectCache.set(node, nodeRect);
        parentRectCache.set(parentNode, parentRect);

        const event = getElementLayoutEvent(nodeRect, parentRect);

        if (avoidUpdates) {
          queuedUpdates.set(node, () => onLayout(event));
        } else {
          onLayout(event);
        }
      }
    }

    // note that getBoundingClientRect() does not thrash layout if its after an animation frame
    // ok new note: *if* it needed recalc then yea, but browsers often skip that, so it does
    // which is why we use async strategy in general
    requestAnimationFrame(layoutOnAnimationFrame);

    // only run once in a few frames, this could be adjustable
    let frameCount = 0;

    const userSkipVal = process.env.TAMAGUI_LAYOUT_FRAME_SKIP;
    const RUN_EVERY_X_FRAMES = userSkipVal ? +userSkipVal : 10;

    async function layoutOnAnimationFrame() {
      if (strategy !== 'off') {
        if (nodes.size === 0 || frameCount++ % RUN_EVERY_X_FRAMES !== 0) {
          // skip a few frames to avoid work
          requestAnimationFrame!(layoutOnAnimationFrame);
          return;
        }

        if (frameCount === Number.MAX_SAFE_INTEGER) {
          frameCount = 0;
        }

        // do a 1 rather than N IntersectionObservers for performance
        await new Promise<void>((res) => {
          const io = new IntersectionObserver(
            (entries) => {
              io.disconnect();
              for (const entry of entries) {
                boundingRects.set(entry.target, entry.boundingClientRect);
              }
              res();
            },
            { threshold: 0 },
          );
          for (const node of nodes) {
            if (node.parentElement instanceof HTMLElement) {
              io.observe(node);
              io.observe(node.parentElement);
            }
          }
        });

        for (const node of nodes) {
          updateLayoutIfChanged(node);
        }
      }

      requestAnimationFrame!(layoutOnAnimationFrame);
    }
  } else if (process.env.NODE_ENV !== 'production') {
    console.warn(
      'React Universal: No requestAnimationFrame - please polyfill for onLayout to work correctly',
    );
  }
}

export function getElementLayoutEvent(
  nodeRect: DOMRectReadOnly,
  parentRect: DOMRectReadOnly,
): LayoutEvent {
  return {
    nativeEvent: {
      layout: getRelativeDimensions(nodeRect, parentRect),
      target: nodeRect,
    },
    timeStamp: Date.now(),
  };
}

function getRelativeDimensions(a: DOMRectReadOnly, b: DOMRectReadOnly) {
  const x = a.left - b.left;
  const y = a.top - b.top;
  return { x, y, width: a.width, height: a.height, pageX: a.left, pageY: a.top };
}

export function useElementLayout(
  ref: React.RefObject<HTMLElement | null>,
  onLayout?: ((event: LayoutEvent) => void) | null,
) {
  // Ensure always up to date so we can avoid re-running effect
  const node = ensureWebElement(ref.current);
  if (node && onLayout) {
    layoutHandlers.set(node, onLayout);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: We only check if `onLayout` is defined
  useIsomorphicLayoutEffect(() => {
    if (onLayout == null) {
      return;
    }
    const node = ref.current;
    if (!node) {
      return;
    }

    nodes.add(node);

    // Add node to intersection observer
    startGlobalObservers();
    if (globalIntersectionObserver) {
      globalIntersectionObserver.observe(node);
      // Initialize as intersecting by default
      intersectionState.set(node, true);
    }

    // Always do one immediate sync layout event no matter the strategy for accuracy
    const parentNode = node.parentNode;
    if (parentNode) {
      onLayout(
        getElementLayoutEvent(
          node.getBoundingClientRect(),
          (parentNode as HTMLElement).getBoundingClientRect(),
        ),
      );
    }

    return () => {
      nodes.delete(node);
      layoutHandlers.delete(node);
      nodeRectCache.delete(node);
      lastChangeTime.delete(node);
      intersectionState.delete(node);

      // Remove from intersection observer
      if (globalIntersectionObserver) {
        globalIntersectionObserver.unobserve(node);
      }
    };
  }, [ref, !!onLayout]);
}

function ensureWebElement<X>(x: X): HTMLElement | undefined {
  if (typeof HTMLElement === 'undefined') {
    return undefined;
  }
  return x instanceof HTMLElement ? x : undefined;
}

export function getBoundingClientRectAsync(
  node: HTMLElement | null,
): Promise<DOMRectReadOnly | false> {
  return new Promise<DOMRectReadOnly | false>((res) => {
    if (node == null || node.nodeType !== 1) {
      return res(false);
    }

    const io = new IntersectionObserver(
      (entries) => {
        io.disconnect();
        return res(entries[0].boundingClientRect);
      },
      { threshold: 0 },
    );
    io.observe(node);
  });
}

async function measureNode(
  node: HTMLElement,
  relativeTo?: HTMLElement | null,
): Promise<null | LayoutValue> {
  const relativeNode = relativeTo || node?.parentElement;
  if (relativeNode instanceof HTMLElement) {
    const [nodeDim, relativeNodeDim] = await Promise.all([
      getBoundingClientRectAsync(node),
      getBoundingClientRectAsync(relativeNode),
    ]);
    if (relativeNodeDim && nodeDim) {
      return getRelativeDimensions(nodeDim, relativeNodeDim);
    }
  }
  return null;
}

export async function measure(
  node: HTMLElement,
  callback: MeasureOnSuccessCallback,
): Promise<LayoutValue | null> {
  const out = await measureNode(
    node,
    node.parentNode instanceof HTMLElement ? node.parentNode : null,
  );
  if (out) {
    callback?.(out.x, out.y, out.width, out.height, out.pageX, out.pageY);
  }
  return out;
}

export function createMeasure(
  node: HTMLElement,
): (callback: MeasureOnSuccessCallback) => Promise<LayoutValue | null> {
  return (callback) => measure(node, callback);
}

export interface WindowLayout {
  height: number;
  pageX: number;
  pageY: number;
  width: number;
}

export async function measureInWindow(
  node: HTMLElement,
  callback: MeasureInWindowOnSuccessCallback,
): Promise<WindowLayout | null> {
  const out = await measureNode(node, null);
  if (out) {
    callback?.(out.pageX, out.pageY, out.width, out.height);
  }
  return out;
}

export function createMeasureInWindow(
  node: HTMLElement,
): (callback: MeasureInWindowOnSuccessCallback) => Promise<WindowLayout | null> {
  return (callback) => measureInWindow(node, callback);
}

export async function measureLayout(
  node: HTMLElement,
  relativeNode: HTMLElement,
  callback: MeasureOnSuccessCallback,
): Promise<LayoutValue | null> {
  const out = await measureNode(node, relativeNode);
  if (out) {
    callback?.(out.x, out.y, out.width, out.height, out.pageX, out.pageY);
  }
  return out;
}

export function createMeasureLayout(
  node: HTMLElement,
): (relativeTo: HTMLElement, callback: MeasureOnSuccessCallback) => Promise<LayoutValue | null> {
  return (relativeTo, callback) => measureLayout(node, relativeTo, callback);
}
