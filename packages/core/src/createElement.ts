'use client';

import { isString } from '@universal-ui/utils';
import { createElement as createReactElement } from 'react';
import { unstable_createElement } from 'react-native-web';

export function createElement(
  type: React.ElementType,
  props: any,
  options?: { writingDirection?: 'ltr' | 'rtl' },
) {
  return isString(type)
    ? unstable_createElement(type, props, options)
    : createReactElement(type, props);
}
