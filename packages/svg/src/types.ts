import type {
  AccessibilityProps,
  PlatformMethods,
  ResponderEvent,
  RNStyle,
  StyleProp,
  SxProps,
} from '@react-universal/core';
import type { AnyObject } from '@react-universal/utils';
import type { ImageProps as RNImageProps, ViewProps as RNViewProps } from 'react-native';

type Units = 'userSpaceOnUse' | 'objectBoundingBox';

interface FontProps {
  fontFamily?: string;
  fontFeatureSettings?: string;
  fontSize?: string | number;
  fontStretch?:
    | 'normal'
    | 'wider'
    | 'narrower'
    | 'ultra-condensed'
    | 'extra-condensed'
    | 'condensed'
    | 'semi-condensed'
    | 'semi-expanded'
    | 'expanded'
    | 'extra-expanded'
    | 'ultra-expanded';
  fontStyle?: NonNullable<RNStyle['fontStyle']>;
  fontVariant?: 'normal' | 'small-caps';
  fontVariantLigatures?: 'normal' | 'none';
  fontVariationSettings?: string;
  fontWeight?: NonNullable<RNStyle['fontWeight']>;
  kerning?: string | number;
  letterSpacing?: string | number;
  textAnchor?: 'start' | 'middle' | 'end';
  textDecoration?: 'none' | 'underline' | 'overline' | 'line-through' | 'blink';
  wordSpacing?: string | number;
}

interface ClipProps {
  clipPath?: string;
  clipRule?: 'evenodd' | 'nonzero';
}

interface FillProps {
  fill?: string;
  fillOpacity?: string | number;
  fillRule?: 'evenodd' | 'nonzero';
}

interface ResponderProps extends Pick<RNViewProps, 'pointerEvents'> {}

interface StrokeProps {
  stroke?: string;
  strokeDasharray?: string | number | (string | number)[];
  strokeDashoffset?: string | number;
  strokeLinecap?: 'butt' | 'square' | 'round';
  strokeLinejoin?: 'miter' | 'bevel' | 'round';
  strokeMiterlimit?: string | number;
  strokeOpacity?: string | number;
  strokeWidth?: string | number;
  vectorEffect?: 'none' | 'non-scaling-stroke' | 'nonScalingStroke' | 'default' | 'inherit' | 'uri';
}

export interface TransformProps {
  origin?: string | number | (string | number)[];
  originX?: string | number;
  originY?: string | number;
  rotation?: string | number;
  scale?: string | number | (string | number)[];
  scaleX?: string | number;
  scaleY?: string | number;
  skewX?: string | number;
  skewY?: string | number;
  transform?: [number, number, number, number, number, number] | string;
  translate?: string | number | (string | number)[];
  translateX?: string | number;
  translateY?: string | number;
  x?: string | number;
  y?: string | number;
}

export interface TouchableProps {
  disabled?: boolean;
  onPress?: (event: ResponderEvent) => void;
  onPressIn?: (event: ResponderEvent) => void;
  onPressOut?: (event: ResponderEvent) => void;
  onLongPress?: (event: ResponderEvent) => void;
  delayPressIn?: number;
  delayPressOut?: number;
  delayLongPress?: number;
}

interface BaseFilterProps {
  filter?: string;
}

interface BaseMarkerProps {
  marker?: string;
  markerEnd?: string;
  markerMid?: string;
  markerStart?: string;
}

interface BaseMaskProps {
  mask?: string;
}

interface BasePathStyle
  extends BaseFilterProps,
    BaseMaskProps,
    BaseMarkerProps,
    ClipProps,
    FillProps,
    StrokeProps,
    TransformProps {}

interface BasePathProps
  extends BaseFilterProps,
    BaseMaskProps,
    BaseMarkerProps,
    ClipProps,
    FillProps,
    ResponderProps,
    StrokeProps,
    TransformProps,
    TouchableProps {
  id?: string;
}

interface BaseTextProps extends BasePathProps, FontProps {
  alignmentBaseline?:
    | 'baseline'
    | 'text-bottom'
    | 'alphabetic'
    | 'ideographic'
    | 'middle'
    | 'central'
    | 'mathematical'
    | 'text-top'
    | 'bottom'
    | 'center'
    | 'top'
    | 'text-before-edge'
    | 'text-after-edge'
    | 'before-edge'
    | 'after-edge'
    | 'hanging';
  baselineShift?: 'sub' | 'super' | 'baseline' | (string & {}) | number | (string | number)[];
  fontData?: AnyObject<unknown>;
  fontFeatureSettings?: string;
  lengthAdjust?: 'spacing' | 'spacingAndGlyphs';
  textLength?: string | number;
  verticalAlign?: string | number;
}

export interface GStyle extends BasePathStyle, FontProps {
  opacity?: string | number;
}

export interface GProps extends BasePathProps, FontProps {
  children?: React.ReactNode;
  opacity?: string | number;
  style?: StyleProp<GStyle>;
}

export interface SvgMethods extends Omit<PlatformMethods, 'blur' | 'focus'> {}

export interface SvgProps
  extends Omit<GProps, 'style'>,
    Pick<RNViewProps, 'hitSlop' | 'style'>,
    AccessibilityProps {
  color?: string;
  height?: string | number;
  preserveAspectRatio?: string;
  /**
   * The system prop that allows defining system overrides as well as additional
   * CSS styles.
   */
  sx?: SxProps;
  title?: string;
  viewBox?: string;
  width?: string | number;
  xmlns?: string;
}

export interface CircleStyle extends BasePathStyle {
  cx?: string | number;
  cy?: string | number;
  opacity?: string | number;
  r?: string | number;
}

export interface CircleProps extends BasePathProps {
  cx?: string | number;
  cy?: string | number;
  opacity?: string | number;
  r?: string | number;
  style?: StyleProp<CircleStyle>;
}

export interface ClipPathProps {
  children?: React.ReactNode;
  id?: string;
  style?: StyleProp<Record<string, never>>;
}

export interface DefsProps {
  children?: React.ReactNode;
  id?: string;
  style?: StyleProp<Record<string, never>>;
}

export interface EllipseStyle extends BasePathStyle {
  cx?: string | number;
  cy?: string | number;
  opacity?: string | number;
  rx?: string | number;
  ry?: string | number;
}

export interface EllipseProps extends BasePathProps {
  cx?: string | number;
  cy?: string | number;
  opacity?: string | number;
  rx?: string | number;
  ry?: string | number;
  style?: StyleProp<EllipseStyle>;
}

export interface ForeignObjectProps {
  children?: React.ReactNode;
  height?: string | number;
  width?: string | number;
  x?: string | number;
  y?: string | number;
}

export interface ImageProps extends BasePathProps {
  height?: string | number;
  href?: RNImageProps['source'] | string;
  onLoad?: RNImageProps['onLoad'];
  opacity?: string | number;
  preserveAspectRatio?: string;
  width?: string | number;
  x?: string | number;
  y?: string | number;
}

export interface LinearGradientProps {
  children?: React.ReactNode[];
  gradientTransform?: TransformProps['transform'];
  gradientUnits?: Units;
  id?: string;
  x1?: string | number;
  x2?: string | number;
  y1?: string | number;
  y2?: string | number;
}

export interface LineProps extends BasePathProps {
  opacity?: string | number;
  x1?: string | number;
  x2?: string | number;
  y1?: string | number;
  y2?: string | number;
}

export interface MarkerProps {
  children?: React.ReactNode;
  id?: string;
  markerHeight?: string | number;
  markerUnits?: 'strokeWidth' | 'userSpaceOnUse';
  markerWidth?: string | number;
  orient?: 'auto' | 'auto-start-reverse' | (string & {}) | number;
  preserveAspectRatio?: string;
  refX?: string | number;
  refY?: string | number;
  viewBox?: string;
}

export interface MaskProps extends BasePathProps {
  children?: React.ReactNode;
  height?: string | number;
  id?: string;
  maskContentUnits?: Units;
  maskType?: 'alpha' | 'luminance';
  maskUnits?: Units;
  style?: StyleProp<{
    maskType?: 'alpha' | 'luminance';
  }>;
  width?: string | number;
  x?: string | number;
  y?: string | number;
}

export interface PathProps extends BasePathProps {
  d?: string;
  opacity?: string | number;
}

export interface PatternProps extends TransformProps {
  children?: React.ReactNode;
  height?: string | number;
  id?: string;
  patternContentUnits?: Units;
  patternTransform?: TransformProps['transform'];
  patternUnits?: Units;
  preserveAspectRatio?: string;
  viewBox?: string;
  width?: string | number;
  x?: string | number;
  y?: string | number;
}

export interface PolygonStyle extends BasePathStyle {
  opacity?: string | number;
}

export interface PolygonProps extends BasePathProps {
  opacity?: string | number;
  points?: string | number | (string | number)[];
  style?: StyleProp<PolygonStyle>;
}

export interface PolylineProps extends BasePathProps {
  opacity?: string | number;
  points?: string | number | (string | number)[];
}

export interface RadialGradientProps {
  children?: React.ReactNode[];
  cx?: string | number;
  cy?: string | number;
  fx?: string | number;
  fy?: string | number;
  gradientTransform?: TransformProps['transform'];
  gradientUnits?: Units;
  id?: string;
  r?: string | number;
  rx?: string | number;
  ry?: string | number;
}

export interface RectStyle extends BasePathStyle {
  height?: string | number;
  opacity?: string | number;
  rx?: string | number;
  ry?: string | number;
  width?: string | number;
  x?: string | number;
  y?: string | number;
}

export interface RectProps extends BasePathProps {
  height?: string | number;
  opacity?: string | number;
  rx?: string | number;
  ry?: string | number;
  style?: StyleProp<RectStyle>;
  width?: string | number;
  x?: string | number;
  y?: string | number;
}

export interface StopProps {
  offset?: string | number;
  parent?: React.ComponentType;
  stopColor?: string;
  stopOpacity?: string | number;
}

export interface SymbolProps {
  children?: React.ReactNode;
  id?: string;
  opacity?: string | number;
  preserveAspectRatio?: string;
  viewBox?: string;
}

export interface TextPathProps extends BaseTextProps {
  children?: React.ReactNode;
  href?: string;
  method?: 'align' | 'stretch';
  midLine?: 'sharp' | 'smooth';
  side?: string;
  spacing?: 'auto' | 'exact';
  startOffset?: string | number;
}

export interface TextProps extends BaseTextProps {
  children?: React.ReactNode;
  dx?: string | number | (string | number)[];
  dy?: string | number | (string | number)[];
  inlineSize?: string | number;
  opacity?: string | number;
  rotate?: string | number | (string | number)[];
  style?: StyleProp<{
    whiteSpace?: 'normal' | 'preserve';
  }>;
  x?: string | number;
  y?: string | number;
}

export interface TSpanProps extends BasePathProps, FontProps {
  children?: React.ReactNode;
  dx?: string | number | (string | number)[];
  dy?: string | number | (string | number)[];
  inlineSize?: string | number;
  rotate?: string | number | (string | number)[];
  x?: string | number;
  y?: string | number;
}

export interface UseProps extends BasePathProps {
  children?: React.ReactNode;
  height?: string | number;
  href?: string;
  opacity?: string | number;
  width?: string | number;
  x?: string | number;
  y?: string | number;
}
