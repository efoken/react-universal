import { isFunction } from './is';

type IdleRequestCallback = (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void;

type IdleRequestOptions = {
  timeout?: number;
};

const _requestIdleCallback = (callback: IdleRequestCallback) =>
  setTimeout(() => {
    const start = Date.now();
    callback({
      didTimeout: false,
      timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
    });
  }, 1);

const _cancelIdleCallback = (handle: ReturnType<typeof setTimeout>) => {
  clearTimeout(handle);
};

const supported = typeof window !== 'undefined' && isFunction(window.requestIdleCallback);

export const requestIdleCallback: (
  callback: IdleRequestCallback,
  options?: IdleRequestOptions,
) => ReturnType<typeof setTimeout> = supported ? window.requestIdleCallback : _requestIdleCallback;

export const cancelIdleCallback: (handle: ReturnType<typeof setTimeout>) => void = supported
  ? window.cancelIdleCallback
  : _cancelIdleCallback;
