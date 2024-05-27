import type { BreakpointValue } from '../breakpoints';
import type { Theme } from '../theme/defaultTheme';
import type { SimpleStyleFunction } from '../types';
import type { BorderProps } from './borders';
import type { FlexboxProps } from './flexbox';
import { columnGap, gap, rowGap } from './flexbox';
import type { GridProps } from './grid';
import type { LayoutProps } from './layout';
import { maxInlineSize, maxW, maxWidth, sizingTransform } from './layout';
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
  boxShadow?: BreakpointValue<string>;
  color?: BreakpointValue<string>;
  opacity?: BreakpointValue<number>;
  pointerEvents?: BreakpointValue<any>;
  typography?: BreakpointValue<string>;
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

export type SxConfig = Record<keyof SxStyleObject, SxConfigRecord>;

export const defaultSxConfig: SxConfig = {
  // Borders
  borderBottomColor: { themeKey: 'colors' },
  borderBottomWidth: {},
  borderColor: { themeKey: 'colors' },
  borderEndColor: { themeKey: 'colors' },
  borderEndWidth: {},
  borderLeftColor: { themeKey: 'colors' },
  borderLeftWidth: {},
  borderRadius: { themeKey: 'radii' },
  borderRightColor: { themeKey: 'colors' },
  borderRightWidth: {},
  borderStartColor: { themeKey: 'colors' },
  borderStartWidth: {},
  borderTopColor: { themeKey: 'colors' },
  borderTopWidth: {},
  borderWidth: {},
  outlineColor: { themeKey: 'colors' },
  outlineOffset: {},
  outlineWidth: {},

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
  m: { style: margin },
  margin: { style: margin },
  marginBlock: { style: padding },
  marginBlockEnd: { style: padding },
  marginBlockStart: { style: padding },
  marginBottom: { style: margin },
  marginEnd: { style: margin },
  marginInline: { style: padding },
  marginInlineEnd: { style: padding },
  marginInlineStart: { style: padding },
  marginLeft: { style: margin },
  marginRight: { style: margin },
  marginStart: { style: margin },
  marginTop: { style: margin },
  marginX: { style: margin },
  marginY: { style: margin },
  mb: { style: margin },
  me: { style: margin },
  ml: { style: margin },
  mr: { style: margin },
  ms: { style: margin },
  mt: { style: margin },
  mx: { style: margin },
  my: { style: margin },
  p: { style: padding },
  padding: { style: padding },
  paddingBlock: { style: padding },
  paddingBlockEnd: { style: padding },
  paddingBlockStart: { style: padding },
  paddingBottom: { style: padding },
  paddingEnd: { style: padding },
  paddingInline: { style: padding },
  paddingInlineEnd: { style: padding },
  paddingInlineStart: { style: padding },
  paddingLeft: { style: padding },
  paddingRight: { style: padding },
  paddingStart: { style: padding },
  paddingTop: { style: padding },
  paddingX: { style: padding },
  paddingY: { style: padding },
  pb: { style: padding },
  pe: { style: padding },
  pl: { style: padding },
  pr: { style: padding },
  ps: { style: padding },
  pt: { style: padding },
  px: { style: padding },
  py: { style: padding },

  // Flexbox
  alignContent: {},
  alignItems: {},
  alignSelf: {},
  columnGap: { style: columnGap },
  flex: {},
  flexBasis: {},
  flexDir: { cssProperty: 'flexDirection' },
  flexDirection: {},
  flexGrow: {},
  flexShrink: {},
  flexWrap: {},
  gap: { style: gap },
  justifyContent: {},
  justifyItems: {},
  justifySelf: {},
  order: {},
  rowGap: { style: rowGap },

  // Grid
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
  bottom: {},
  inset: {},
  insetBlock: {},
  insetBlockEnd: {},
  insetBlockStart: {},
  insetEnd: {},
  insetInline: {},
  insetInlineEnd: {},
  insetInlineStart: {},
  insetStart: {},
  left: {},
  position: {},
  right: {},
  top: {},
  zIndex: { themeKey: 'zIndices' },

  // Shadows
  boxShadow: { themeKey: 'shadows' },

  // Layout
  aspectRatio: {},
  blockSize: { transform: sizingTransform },
  boxSizing: {},
  display: {},
  h: { cssProperty: 'height', transform: sizingTransform },
  height: { transform: sizingTransform },
  inlineSize: { transform: sizingTransform },
  maxBlockSize: { transform: sizingTransform },
  maxH: { cssProperty: 'maxHeight', transform: sizingTransform },
  maxHeight: { transform: sizingTransform },
  maxInlineSize: { style: maxInlineSize },
  maxW: { style: maxW },
  maxWidth: { style: maxWidth },
  minBlockSize: { transform: sizingTransform },
  minH: { cssProperty: 'minHeight', transform: sizingTransform },
  minHeight: { transform: sizingTransform },
  minInlineSize: { transform: sizingTransform },
  minW: { cssProperty: 'minWidth', transform: sizingTransform },
  minWidth: { transform: sizingTransform },
  overflow: {},
  overflowX: {},
  overflowY: {},
  overscroll: {},
  overscrollBehavior: {},
  overscrollBehaviorX: {},
  overscrollBehaviorY: {},
  overscrollX: {},
  overscrollY: {},
  visibility: {},
  w: { cssProperty: 'width', transform: sizingTransform },
  width: { transform: sizingTransform },

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
