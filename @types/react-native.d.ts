import 'react-native';

declare module 'react-native' {
  interface ViewStyle {
    listStyleType?: React.CSSProperties['listStyleType'];
    scrollbarWidth?: React.CSSProperties['scrollbarWidth'];
    textOverflow?: React.CSSProperties['textOverflow'];
    touchAction?: React.CSSProperties['touchAction'];
    WebkitLineClamp?: React.CSSProperties['WebkitLineClamp'];
    WebkitBoxOrient?: React.CSSProperties['WebkitBoxOrient'];
    whiteSpace?: React.CSSProperties['whiteSpace'];
    wordWrap?: React.CSSProperties['wordWrap'];
  }
}
