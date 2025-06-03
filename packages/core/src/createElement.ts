'use client';

import type { AnyObject } from '@react-universal/utils';
import { isString } from '@react-universal/utils';
import { createElement as createReactElement } from 'react';
import { LocaleProvider } from './contexts/LocaleContext';
import { css } from './css';
import type { AccessibilityRole, StyleProp } from './types';

const roleComponents: Partial<Record<AccessibilityRole, keyof React.JSX.IntrinsicElements>> = {
  article: 'article',
  banner: 'header',
  blockquote: 'blockquote',
  button: 'button',
  code: 'code',
  complementary: 'aside',
  contentinfo: 'footer',
  deletion: 'del',
  emphasis: 'em',
  figure: 'figure',
  form: 'form',
  insertion: 'ins',
  list: 'ul',
  listitem: 'li',
  main: 'main',
  navigation: 'nav',
  paragraph: 'p',
  region: 'section',
  strong: 'strong',
};

function propsToAccessibilityComponent(
  props: { 'aria-level'?: number; role?: AccessibilityRole } = {},
) {
  if (props.role != null) {
    if (props.role === 'heading') {
      const level = props['aria-level'];
      if (level != null) {
        return `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      }
      return 'h1';
    }
    return roleComponents[props.role];
  }
}

function hyphenateString(str: string) {
  return str.replaceAll(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

function createDOMProps(
  type: React.ElementType,
  {
    'aria-disabled': ariaDisabled,
    'aria-readonly': ariaReadOnly,
    'aria-required': ariaRequired,
    dataSet,
    role,
    style,
    tabIndex,
    testID,
    ...props
  }: {
    'aria-disabled'?: boolean;
    'aria-readonly'?: boolean;
    'aria-required'?: boolean;
    dataSet?: AnyObject;
    role?: AccessibilityRole;
    style?: StyleProp<AnyObject>;
    tabIndex?: 0 | -1;
    testID?: string;
    [key: string]: any;
  } = {},
) {
  const domProps = { ...props };

  // ACCESSIBILITY
  if (ariaDisabled === true) {
    domProps['aria-disabled'] = true;
    // Enhance with native semantics
    if (
      type === 'button' ||
      type === 'form' ||
      type === 'input' ||
      type === 'select' ||
      type === 'textarea'
    ) {
      domProps.disabled = true;
    }
  }
  if (ariaReadOnly != null) {
    domProps['aria-readonly'] = ariaReadOnly;
    // Enhance with native semantics
    if (type === 'input' || type === 'select' || type === 'textarea') {
      domProps.readOnly = ariaReadOnly;
    }
  }
  if (ariaRequired != null) {
    domProps['aria-required'] = ariaRequired;
    // Enhance with native semantics
    if (type === 'input' || type === 'select' || type === 'textarea') {
      domProps.required = ariaRequired;
    }
  }

  if (role != null) {
    // 'presentation' synonym has wider browser support
    domProps.role =
      role === 'none'
        ? 'presentation'
        : propsToAccessibilityComponent({ role, ...props }) == null
          ? role
          : undefined;
  }

  // Replace 'dataSet' with 'data-*'
  if (dataSet != null) {
    for (const [dataProp, dataValue] of Object.entries(dataSet)) {
      const dataName = hyphenateString(dataProp);
      if (dataValue != null) {
        domProps[`data-${dataName}`] = dataValue;
      }
    }
  }

  // FOCUS
  if (tabIndex === 0 || tabIndex === -1) {
    domProps.tabIndex = tabIndex;
  } else if (
    // These native elements are keyboard focusable by default
    type === 'a' ||
    type === 'button' ||
    type === 'input' ||
    type === 'select' ||
    type === 'textarea'
  ) {
    if (ariaDisabled === true) {
      domProps.tabIndex = -1;
    }
  } else if (
    // These roles are made keyboard focusable by default
    role === 'button' ||
    role === 'checkbox' ||
    role === 'link' ||
    role === 'radio' ||
    role === 'textbox' ||
    role === 'switch'
  ) {
    domProps.tabIndex = 0;
  }

  // Resolve styles
  Object.assign(domProps, css.props([style]));

  // Automated test IDs
  if (testID != null) {
    domProps['data-testid'] = testID;
  }

  if (domProps.type == null && type === 'button') {
    domProps.type = 'button';
  }

  return domProps;
}

export function createElement<T extends keyof React.JSX.IntrinsicElements>(
  type: React.ElementType<any, T>,
  props?: AnyObject,
): any;

export function createElement<P extends AnyObject>(type: React.ElementType<P>, props?: P): any;

export function createElement<P extends AnyObject>(type: React.ElementType<P>, props = {} as P) {
  // Use equivalent platform elements where possible.
  const Component = isString(type) ? (propsToAccessibilityComponent(props) ?? type) : type;
  const domProps = createDOMProps(Component, props);

  const element = createReactElement(Component, domProps as P);

  // Update locale context if element's writing direction prop changes
  const elementWithLocaleProvider = domProps.dir
    ? createReactElement(LocaleProvider, {
        // biome-ignore lint/correctness/noChildrenProp: `children` prop is required
        children: element,
        direction: domProps.dir,
        locale: domProps.lang,
      })
    : element;

  return isString(type) ? elementWithLocaleProvider : createReactElement(type, props);
}
