import { isFunction, noop } from '@react-universal/utils';

export function passRef<T>(
  value: T,
  ref: React.ForwardedRef<T>,
  onMount?: () => void,
  onUnmount?: () => void,
) {
  const passRef = () => {
    if (isFunction(ref)) {
      return ref(value);
    }
    if (ref != null) {
      ref.current = value;
    }
    return noop;
  };

  const refReturnFn = passRef();

  onMount?.();

  return () => {
    refReturnFn?.();
    onUnmount?.();
  };
}
