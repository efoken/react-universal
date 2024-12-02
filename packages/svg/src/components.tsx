'use client';

import type { ResponderEvent, StyleProp } from '@react-universal/core';
import { createElement, styled } from '@react-universal/core';
import { type AnyObject, isArray, isNumber, isString } from '@react-universal/utils';
import { forwardRef } from 'react';
import type {
  CircleProps,
  ClipPathProps,
  DefsProps,
  EllipseProps,
  ForeignObjectProps,
  GProps,
  ImageProps,
  LineProps,
  LinearGradientProps,
  MarkerProps,
  MaskProps,
  PathProps,
  PatternProps,
  PolygonProps,
  PolylineProps,
  RadialGradientProps,
  RectProps,
  StopProps,
  SvgMethods,
  SvgProps,
  SymbolProps,
  TSpanProps,
  TextPathProps,
  TextProps,
  TouchableProps,
  TransformProps,
  UseProps,
} from './types';

function stringifyTransformProps(props: TransformProps) {
  const transforms: string[] = [];
  if (props.translate != null) {
    transforms.push(`translate(${props.translate.toString()})`);
  }
  if (props.translateX != null || props.translateY != null) {
    transforms.push(`translate(${props.translateX ?? 0}, ${props.translateY ?? 0})`);
  }
  if (props.scale != null) {
    transforms.push(`scale(${props.scale.toString()})`);
  }
  if (props.scaleX != null || props.scaleY != null) {
    transforms.push(`scale(${props.scaleX ?? 1}, ${props.scaleY ?? 1})`);
  }
  if (props.rotation != null) {
    transforms.push(`rotate(${props.rotation})`);
  }
  if (props.skewX != null) {
    transforms.push(`skewX(${props.skewX})`);
  }
  if (props.skewY != null) {
    transforms.push(`skewY(${props.skewY})`);
  }
  return transforms;
}

function parseTransformProp(transform: TransformProps['transform'], props?: TransformProps) {
  const transforms: string[] = [];
  if (props != null) {
    transforms.push(...stringifyTransformProps(props));
  }
  if (isArray(transform)) {
    if (isNumber(transform[0])) {
      transforms.push(`matrix(${transform.join(' ')})`);
    }
  } else if (isString(transform)) {
    transforms.push(transform);
  }
  return transforms.length > 0 ? transforms.join(' ') : undefined;
}

function hasTouchableProps(props: TouchableProps) {
  return (
    props.onPress != null ||
    props.onPressIn != null ||
    props.onPressOut != null ||
    props.onLongPress != null
  );
}

function createComponent<
  T = any,
  P extends Pick<SvgProps, 'fontFamily' | 'fontSize' | 'fontStyle' | 'fontWeight' | 'onPress'> &
    Omit<TransformProps, 'x' | 'y'> &
    Pick<LinearGradientProps, 'gradientTransform'> &
    Pick<PatternProps, 'patternTransform'> & {
      children?: React.ReactNode;
      parent?: React.ComponentType;
      style?: StyleProp<any>;
    } = Record<string, never>,
>(
  Base: keyof React.ReactSVG | React.ComponentType<any>,
  name: Capitalize<string>,
  prepareProps: (props: React.PropsWithoutRef<P>) => React.PropsWithoutRef<P> = (props) => props,
) {
  const Component = forwardRef<T, P>(
    (
      {
        fontFamily,
        fontSize,
        fontStyle,
        fontWeight,
        gradientTransform,
        onPress,
        origin,
        originX,
        originY,
        patternTransform,
        rotation,
        scale,
        scaleX,
        scaleY,
        skewX,
        skewY,
        style,
        transform,
        translate,
        translateX,
        translateY,
        ...props
      },
      ref,
    ) => {
      const cleanProps: typeof props & {
        gradientTransform?: string;
        onClick?: (event: any) => void;
        // biome-ignore lint/suspicious/noConfusingVoidType:
        onResponderGrant?: (event: ResponderEvent) => void | boolean;
        onResponderMove?: (event: ResponderEvent) => void;
        onResponderRelease?: (event: ResponderEvent) => void;
        onResponderTerminate?: (event: ResponderEvent) => void;
        onResponderTerminationRequest?: (event: ResponderEvent) => boolean;
        onStartShouldSetResponder?: (event: ResponderEvent) => boolean;
        patternTransform?: string;
        ref?: any;
        style?: any;
        transform?: string;
        'transform-origin'?: string;
      } = {
        ...(hasTouchableProps({ onPress, ...props }) &&
          {
            // onStartShouldSetResponder: self.touchableHandleStartShouldSetResponder,
            // onResponderTerminationRequest: self.touchableHandleResponderTerminationRequest,
            // onResponderGrant: self.touchableHandleResponderGrant,
            // onResponderMove: self.touchableHandleResponderMove,
            // onResponderRelease: self.touchableHandleResponderRelease,
            // onResponderTerminate: self.touchableHandleResponderTerminate,
          }),
        ...(prepareProps({ translate, ...props } as React.PropsWithoutRef<P>) as typeof props),
      };

      if (origin != null) {
        cleanProps['transform-origin'] = origin.toString().replace(',', ' ');
      } else if (originX != null || originY != null) {
        cleanProps['transform-origin'] = `${originX ?? 0} ${originY ?? 0}`;
      }

      if (transform != null) {
        cleanProps.transform = parseTransformProp(transform, {
          rotation,
          scale,
          scaleX,
          scaleY,
          skewX,
          skewY,
          translate,
          translateX,
          translateY,
        });
      }
      if (gradientTransform != null) {
        cleanProps.gradientTransform = parseTransformProp(gradientTransform);
      }
      if (patternTransform != null) {
        cleanProps.patternTransform = parseTransformProp(patternTransform);
      }

      cleanProps.ref = ref;
      cleanProps.style = [style, { fontFamily, fontSize, fontStyle, fontWeight }];

      if (onPress != null) {
        cleanProps.onClick = onPress;
      }

      return isString(Base) ? (
        createElement(Base, cleanProps satisfies React.SVGProps<SVGElement>)
      ) : (
        <Base {...cleanProps} />
      );
    },
  );

  Component.displayName = name;

  return Component;
}

const SvgRoot = styled('svg', {
  name: 'Svg',
  slot: 'Root',
})({
  display: 'block',
});

export const Svg = createComponent<SVGSVGElement & SvgMethods, SvgProps>(SvgRoot, 'Svg');

export const Circle = createComponent<SVGCircleElement, CircleProps>('circle', 'Circle');
export const ClipPath = createComponent<SVGClipPathElement, ClipPathProps>('clipPath', 'ClipPath');
export const Defs = createComponent<SVGDefsElement, DefsProps>('defs', 'Defs');
export const Ellipse = createComponent<SVGEllipseElement, EllipseProps>('ellipse', 'Ellipse');
export const ForeignObject = createComponent<SVGForeignObjectElement, ForeignObjectProps>(
  'foreignObject',
  'ForeignObject',
);
export const G = createComponent<SVGGElement, GProps>(
  'g',
  'G',
  ({ translate, x, y, ...props }) => ({
    translate: translate ?? (x != null || y != null ? `${x ?? 0}, ${y ?? 0}` : undefined),
    ...props,
  }),
);
export const Image = createComponent<SVGImageElement, ImageProps>('image', 'Image');
export const Line = createComponent<SVGLineElement, LineProps>('line', 'Line');
export const LinearGradient = createComponent<SVGLinearGradientElement, LinearGradientProps>(
  'linearGradient',
  'LinearGradient',
);
export const Marker = createComponent<SVGMarkerElement, MarkerProps>('marker', 'Marker');
export const Mask = createComponent<SVGMaskElement, MaskProps>('mask', 'Mask');
export const Path = createComponent<SVGPathElement, PathProps>('path', 'Path');
export const Pattern = createComponent<SVGPatternElement, PatternProps>('pattern', 'Pattern');
export const Polygon = createComponent<SVGPolygonElement, PolygonProps>('polygon', 'Polygon');
export const Polyline = createComponent<SVGPolylineElement, PolylineProps>('polyline', 'Polyline');
export const RadialGradient = createComponent<SVGRadialGradientElement, RadialGradientProps>(
  'radialGradient',
  'RadialGradient',
);
export const Rect = createComponent<SVGRectElement, RectProps>('rect', 'Rect');
export const Stop = createComponent<SVGStopElement, StopProps>('stop', 'Stop');
// biome-ignore lint/suspicious/noShadowRestrictedNames:
export const Symbol = createComponent<SVGSymbolElement, SymbolProps>('symbol', 'Symbol');
export const Text = createComponent<SVGTextElement, TextProps>('text', 'Text');
export const TextPath = createComponent<SVGTextPathElement, TextPathProps>('textPath', 'TextPath');
export const TSpan = createComponent<SVGTSpanElement, TSpanProps>('tspan', 'TSpan');
export const Use = createComponent<SVGUseElement, UseProps>('use', 'Use');
