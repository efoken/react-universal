'use client';

import type {
  ButtonProps,
  HeadingProps,
  ImageMethods,
  ImageProps,
  LinkProps,
  TextMethods,
  TextProps,
  ViewMethods,
  ViewProps,
} from '@react-universal/components';
import {
  Button as ButtonRoot,
  Heading,
  Image,
  Link,
  Text,
  View,
} from '@react-universal/components';
import type { RNStyle, StyleProp } from '@react-universal/core';
import { styled } from '@react-universal/core';
import type { AnyObject } from '@react-universal/utils';
import { forwardRef } from 'react';

function createComponent<T = any, P extends { style?: StyleProp<any> } = AnyObject>(
  Base: React.ComponentType<P>,
  name: Capitalize<string>,
  defaultProps: Partial<P> = {},
  styles?: RNStyle,
) {
  const ComponentRoot = styled<any>(Base, { name, slot: 'Root' })(styles);
  const Component = forwardRef<T, Omit<P, 'as'>>((props, ref) => (
    <ComponentRoot ref={ref} {...defaultProps} {...props} />
  ));
  Component.displayName = name;
  return Component;
}

/**
 * "a" (inline)
 */
export const A = createComponent<HTMLAnchorElement & TextMethods, LinkProps>(Link, 'A');

/**
 * "article" (block)
 */
export const Article = createComponent<
  HTMLElement & ViewMethods,
  Omit<ViewProps, 'href' | 'hrefAttrs'>
>(View, 'Article', { role: 'article' });

/**
 * "aside" (block)
 */
export const Aside = createComponent<
  HTMLElement & ViewMethods,
  Omit<ViewProps, 'href' | 'hrefAttrs'>
>(View, 'Aside', { role: 'complementary' });

/**
 * "b" (inline)
 */
export const B = createComponent<HTMLElement & TextMethods, Omit<TextProps, 'href' | 'hrefAttrs'>>(
  Text,
  'B',
  { as: 'b' },
  { fontWeight: 700 },
);

/**
 * "button" (block)
 */
export const Button = createComponent<
  HTMLButtonElement & ViewMethods,
  Omit<ButtonProps, 'href' | 'hrefAttrs'>
>(ButtonRoot, 'Button');

/**
 * "code" (inline)
 */
export const Code = createComponent<
  HTMLElement & TextMethods,
  Omit<TextProps, 'href' | 'hrefAttrs'>
>(Text, 'Code', { role: 'code' }, { fontFamily: 'monospace' });

/**
 * "div" (block)
 */
export const Div = createComponent<
  HTMLDivElement & ViewMethods,
  Omit<ViewProps, 'href' | 'hrefAttrs'>
>(View, 'Div');

/**
 * "em" (inline)
 */
export const Em = createComponent<HTMLElement & TextMethods, Omit<TextProps, 'href' | 'hrefAttrs'>>(
  Text,
  'Em',
  { as: 'em' },
  { fontStyle: 'italic' },
);

/**
 * "footer" (block)
 */
export const Footer = createComponent<
  HTMLElement & ViewMethods,
  Omit<ViewProps, 'href' | 'hrefAttrs'>
>(View, 'Footer', { role: 'contentinfo' });

/**
 * "h1-h6" (block)
 */
export const H1 = createComponent<
  HTMLHeadingElement & TextMethods,
  Omit<HeadingProps, 'href' | 'hrefAttrs'>
>(Heading, 'H1', { 'aria-level': 1 });
export const H2 = createComponent<
  HTMLHeadingElement & TextMethods,
  Omit<HeadingProps, 'href' | 'hrefAttrs'>
>(Heading, 'H2', { 'aria-level': 2 });
export const H3 = createComponent<
  HTMLHeadingElement & TextMethods,
  Omit<HeadingProps, 'href' | 'hrefAttrs'>
>(Heading, 'H3', { 'aria-level': 3 });
export const H4 = createComponent<
  HTMLHeadingElement & TextMethods,
  Omit<HeadingProps, 'href' | 'hrefAttrs'>
>(Heading, 'H4', { 'aria-level': 4 });
export const H5 = createComponent<
  HTMLHeadingElement & TextMethods,
  Omit<HeadingProps, 'href' | 'hrefAttrs'>
>(Heading, 'H5', { 'aria-level': 5 });
export const H6 = createComponent<
  HTMLHeadingElement & TextMethods,
  Omit<HeadingProps, 'href' | 'hrefAttrs'>
>(Heading, 'H6', { 'aria-level': 6 });

/**
 * "header" (block)
 */
export const Header = createComponent<
  HTMLElement & ViewMethods,
  Omit<ViewProps, 'href' | 'hrefAttrs'>
>(View, 'Header', { role: 'banner' });

/**
 * "i" (inline)
 */
export const I = createComponent<HTMLElement & TextMethods, Omit<TextProps, 'href' | 'hrefAttrs'>>(
  Text,
  'I',
  { as: 'i' },
  { fontStyle: 'italic' },
);

/**
 * "img" (inline)
 */
export const Img = createComponent<HTMLImageElement & ImageMethods, ImageProps>(Image, 'Img');

/**
 * "main" (block)
 */
export const Main = createComponent<
  HTMLElement & ViewMethods,
  Omit<ViewProps, 'href' | 'hrefAttrs'>
>(View, 'Main', { role: 'main' });

/**
 * "mark" (inline)
 */
export const Mark = createComponent<
  HTMLElement & TextMethods,
  Omit<TextProps, 'href' | 'hrefAttrs'>
>(Text, 'Mark', { as: 'mark' });

/**
 * "nav" (block)
 */
export const Nav = createComponent<
  HTMLElement & ViewMethods,
  Omit<ViewProps, 'href' | 'hrefAttrs'>
>(View, 'Nav', { role: 'navigation' });

/**
 * "p" (block)
 */
export const P = createComponent<
  HTMLParagraphElement & TextMethods,
  Omit<TextProps, 'href' | 'hrefAttrs'>
>(Text, 'P', { role: 'paragraph' });

/**
 * "section" (block)
 */
export const Section = createComponent<
  HTMLElement & ViewMethods,
  Omit<ViewProps, 'href' | 'hrefAttrs'>
>(View, 'Section', { role: 'region' });

/**
 * "span" (inline)
 */
export const Span = createComponent<
  HTMLSpanElement & TextMethods,
  Omit<TextProps, 'href' | 'hrefAttrs'>
>(Text, 'Span');

/**
 * "strong" (inline)
 */
export const Strong = createComponent<
  HTMLElement & TextMethods,
  Omit<TextProps, 'href' | 'hrefAttrs'>
>(Text, 'Strong', { as: 'strong' }, { fontWeight: 700 });
