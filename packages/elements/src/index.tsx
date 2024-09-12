'use client';

import type {
  HeadingProps,
  LinkProps,
  TextMethods,
  TextProps,
  ViewMethods,
  ViewProps,
} from '@react-universal/components';
import { Heading, Link, Text, View } from '@react-universal/components';
import type { RNStyle, StyleProp } from '@react-universal/core';
import { styled } from '@react-universal/core';
import { forwardRef } from 'react';

function createComponent<T = any, P extends { style?: StyleProp<any> } = {}>(
  Base: React.ComponentType<P>,
  name: Capitalize<string>,
  defaultProps: Partial<P> = {},
  styles?: RNStyle,
) {
  const ComponentRoot = styled<any>(Base, { name, slot: 'Root' })(styles);
  const Component = forwardRef<T, P>((props, ref) => (
    <ComponentRoot ref={ref} {...defaultProps} {...props} />
  ));
  Component.displayName = name;
  return Component;
}

export const Article = createComponent<HTMLElement & ViewMethods, ViewProps>(View, 'Article', {
  role: 'article',
});
export const Aside = createComponent<HTMLElement & ViewMethods, ViewProps>(View, 'Aside', {
  role: 'complementary',
});
export const Div = createComponent<HTMLDivElement & ViewMethods, ViewProps>(View, 'Div');
export const Footer = createComponent<HTMLElement & ViewMethods, ViewProps>(View, 'Footer', {
  role: 'contentinfo',
});
export const Header = createComponent<HTMLElement & ViewMethods, ViewProps>(View, 'Header', {
  role: 'banner',
});
export const Main = createComponent<HTMLElement & ViewMethods, ViewProps>(View, 'Main', {
  role: 'main',
});
export const Nav = createComponent<HTMLElement & ViewMethods, ViewProps>(View, 'Nav', {
  role: 'navigation',
});
export const Section = createComponent<HTMLElement & ViewMethods, ViewProps>(View, 'Section', {
  role: 'region',
});

export const H1 = createComponent<HTMLHeadingElement & TextMethods, HeadingProps>(Heading, 'H1', {
  'aria-level': 1,
});
export const H2 = createComponent<HTMLHeadingElement & TextMethods, HeadingProps>(Heading, 'H2', {
  'aria-level': 2,
});
export const H3 = createComponent<HTMLHeadingElement & TextMethods, HeadingProps>(Heading, 'H3', {
  'aria-level': 3,
});
export const H4 = createComponent<HTMLHeadingElement & TextMethods, HeadingProps>(Heading, 'H4', {
  'aria-level': 4,
});
export const H5 = createComponent<HTMLHeadingElement & TextMethods, HeadingProps>(Heading, 'H5', {
  'aria-level': 5,
});
export const H6 = createComponent<HTMLHeadingElement & TextMethods, HeadingProps>(Heading, 'H6', {
  'aria-level': 6,
});

export const P = createComponent<HTMLParagraphElement & TextMethods, TextProps>(Text, 'P', {
  role: 'paragraph',
});

export const A = createComponent<HTMLAnchorElement & TextMethods, LinkProps>(Link, 'A');

export const Code = createComponent<HTMLElement & TextMethods, TextProps>(
  Text,
  'Code',
  { role: 'code' },
  { fontFamily: 'monospace' },
);
export const Em = createComponent<HTMLElement & TextMethods, TextProps>(
  Text,
  'Em',
  { as: 'em' },
  { fontStyle: 'italic' },
);
export const Mark = createComponent<HTMLElement & TextMethods, TextProps>(Text, 'Code', {
  as: 'mark',
});
export const Span = createComponent<HTMLSpanElement & TextMethods, TextProps>(Text, 'Span');
export const Strong = createComponent<HTMLElement & TextMethods, TextProps>(
  Text,
  'Strong',
  { as: 'strong' },
  { fontWeight: 700 },
);
