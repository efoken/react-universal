import { BorderProps } from './borders';
import { Theme } from './defaultTheme';
import { FlexboxProps } from './flexbox';
import { GridProps, columnGap, gap, rowGap } from './grid';
import { LayoutProps, maxWidth, sizingTransform } from './layout';
import { MarginProps, PaddingProps, margin, padding } from './spacing';
import { SimpleStyleFunction } from './types';

export type SxStyleObject = BorderProps &
  MarginProps &
  PaddingProps &
  FlexboxProps &
  GridProps &
  LayoutProps;

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
    themeKey: 'zIndex',
  },
  top: {},
  right: {},
  bottom: {},
  left: {},

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
    style: maxWidth,
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
  typography: {
    cssProperty: false,
    themeKey: 'typography',
  },
};
