import type { BreakpointValue } from '../breakpoints';
import type { Theme } from '../theme/defaultTheme';
import type { SimpleStyleFunction } from '../types';
import type { BorderProps } from './borders';
import type { FlexboxProps } from './flexbox';
import type { GridProps } from './grid';
import { columnGap, gap, rowGap } from './grid';
import type { LayoutProps } from './layout';
import { maxW, maxWidth, sizingTransform } from './layout';
import type { PositionProps } from './positions';
import type { MarginProps, PaddingProps } from './spacing';
import { margin, padding } from './spacing';
import type { TypographyProps } from './typography';

type CSSCustomProps = Record<`--${string}`, string>;

interface OtherProps extends CSSCustomProps {
  backdropFilter?: BreakpointValue<string>;
  backgroundClip?: BreakpointValue<string>;
  backgroundColor?: BreakpointValue<string>;
  backgroundImage?: BreakpointValue<string>;
  bgColor?: BreakpointValue<string>;
  color?: BreakpointValue<string>;
  opacity?: BreakpointValue<number>;
  pointerEvents?: BreakpointValue<any>;
}

export type SxStyleObject = BorderProps &
  MarginProps &
  PaddingProps &
  FlexboxProps &
  GridProps &
  PositionProps &
  LayoutProps &
  TypographyProps &
  OtherProps;

export type SxProps =
  | SxStyleObject
  | ((theme: Theme) => SxStyleObject)
  | readonly (boolean | SxStyleObject | ((theme: Theme) => SxStyleObject))[];

export interface SxConfigRecord {
  cssProperty?: keyof React.CSSProperties | false;
  style?: SimpleStyleFunction<any>;
  themeKey?: string;
  transform?: (propValue: string | number) => string | number;
}

export type SxConfig = Record<string, SxConfigRecord>;

export const defaultSxConfig: SxConfig = {
  // Borders
  borderWidth: {},
  borderTopWidth: {},
  borderRightWidth: {},
  borderBottomWidth: {},
  borderLeftWidth: {},
  borderStartWidth: {},
  borderEndWidth: {},
  borderColor: {
    themeKey: 'colors',
  },
  borderTopColor: {
    themeKey: 'colors',
  },
  borderRightColor: {
    themeKey: 'colors',
  },
  borderBottomColor: {
    themeKey: 'colors',
  },
  borderLeftColor: {
    themeKey: 'colors',
  },
  borderStartColor: {
    themeKey: 'colors',
  },
  borderEndColor: {
    themeKey: 'colors',
  },
  outlineWidth: {},
  outlineColor: {
    themeKey: 'colors',
  },
  borderRadius: {
    themeKey: 'radii',
  },

  // Colors
  color: {
    themeKey: 'colors',
  },
  bgColor: {
    themeKey: 'colors',
    cssProperty: 'backgroundColor',
  },
  backgroundColor: {
    themeKey: 'colors',
  },

  // Spacing
  p: {
    style: padding,
  },
  pt: {
    style: padding,
  },
  pr: {
    style: padding,
  },
  pb: {
    style: padding,
  },
  pl: {
    style: padding,
  },
  ps: {
    style: padding,
  },
  pe: {
    style: padding,
  },
  px: {
    style: padding,
  },
  py: {
    style: padding,
  },
  padding: {
    style: padding,
  },
  paddingTop: {
    style: padding,
  },
  paddingRight: {
    style: padding,
  },
  paddingBottom: {
    style: padding,
  },
  paddingLeft: {
    style: padding,
  },
  paddingStart: {
    style: padding,
  },
  paddingEnd: {
    style: padding,
  },
  paddingX: {
    style: padding,
  },
  paddingY: {
    style: padding,
  },
  m: {
    style: margin,
  },
  mt: {
    style: margin,
  },
  mr: {
    style: margin,
  },
  mb: {
    style: margin,
  },
  ml: {
    style: margin,
  },
  ms: {
    style: margin,
  },
  me: {
    style: margin,
  },
  mx: {
    style: margin,
  },
  my: {
    style: margin,
  },
  margin: {
    style: margin,
  },
  marginTop: {
    style: margin,
  },
  marginRight: {
    style: margin,
  },
  marginBottom: {
    style: margin,
  },
  marginLeft: {
    style: margin,
  },
  marginStart: {
    style: margin,
  },
  marginEnd: {
    style: margin,
  },
  marginX: {
    style: margin,
  },
  marginY: {
    style: margin,
  },

  // Flexbox
  flexBasis: {},
  flexDir: {
    cssProperty: 'flexDirection',
  },
  flexDirection: {},
  flexWrap: {},
  justifyItems: {},
  justifyContent: {},
  alignItems: {},
  alignContent: {},
  order: {},
  flex: {},
  flexGrow: {},
  flexShrink: {},
  alignSelf: {},
  justifySelf: {},

  // Grid
  gap: {
    style: gap,
  },
  rowGap: {
    style: rowGap,
  },
  columnGap: {
    style: columnGap,
  },
  gridColumn: {},
  gridRow: {},
  gridAutoFlow: {},
  gridAutoColumns: {},
  gridAutoRows: {},
  gridTemplateColumns: {},
  gridTemplateRows: {},
  gridTemplateAreas: {},
  gridArea: {},

  // Positions
  position: {},
  zIndex: {
    themeKey: 'zIndices',
  },
  top: {},
  right: {},
  bottom: {},
  left: {},
  start: {},
  end: {},

  // Shadows
  boxShadow: {
    themeKey: 'shadows',
  },

  // Layout
  w: {
    cssProperty: 'width',
    transform: sizingTransform,
  },
  maxW: {
    style: maxW,
  },
  minW: {
    cssProperty: 'minWidth',
    transform: sizingTransform,
  },
  width: {
    transform: sizingTransform,
  },
  maxWidth: {
    style: maxWidth,
  },
  minWidth: {
    transform: sizingTransform,
  },
  h: {
    cssProperty: 'height',
    transform: sizingTransform,
  },
  maxH: {
    cssProperty: 'maxHeight',
    transform: sizingTransform,
  },
  minH: {
    cssProperty: 'minHeight',
    transform: sizingTransform,
  },
  height: {
    transform: sizingTransform,
  },
  maxHeight: {
    transform: sizingTransform,
  },
  minHeight: {
    transform: sizingTransform,
  },
  boxSizing: {},
  display: {},
  aspectRatio: {},
  overflow: {},
  overflowX: {},
  overflowY: {},
  overscroll: {},
  overscrollBehavior: {},
  visibility: {},

  // Typography
  fontFamily: {
    // themeKey: 'typography',
  },
  fontSize: {
    // themeKey: 'typography',
  },
  fontStyle: {
    // themeKey: 'typography',
  },
  fontWeight: {
    // themeKey: 'typography',
  },
  letterSpacing: {},
  textTransform: {},
  lineHeight: {},
  textAlign: {},
  textWrap: {},
  typography: {
    cssProperty: false,
    themeKey: 'typography',
  },
};
