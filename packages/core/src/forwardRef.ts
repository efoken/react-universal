import { forwardRef as forwardReactRef } from 'react';
import type { AnyProps, OverridableComponent } from './types';

export function forwardRef<T extends React.ComponentClass, P extends AnyProps>(
  render: React.ForwardRefRenderFunction<InstanceType<T>, P>,
): OverridableComponent<P, T>;

export function forwardRef<T extends React.ElementType, P extends AnyProps>(
  render: React.ForwardRefRenderFunction<T, P>,
): OverridableComponent<P, T> {
  return forwardReactRef(render) as any;
}
