import { createElement as createReactElement } from 'react';

export function createElement(type: React.ElementType, props: any) {
  return createReactElement(type, props);
}
