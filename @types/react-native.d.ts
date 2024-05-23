import 'react-native';

declare module 'react-native' {
  interface ViewStyle {
    boxSizing?: React.CSSProperties['boxSizing'];
    listStyleType?: React.CSSProperties['listStyleType'];
    overflowX?: React.CSSProperties['overflowX'];
    overflowY?: React.CSSProperties['overflowY'];
    scrollbarWidth?: React.CSSProperties['scrollbarWidth'];
    textOverflow?: React.CSSProperties['textOverflow'];
    touchAction?: React.CSSProperties['touchAction'];
    WebkitLineClamp?: React.CSSProperties['WebkitLineClamp'];
    whiteSpace?: React.CSSProperties['whiteSpace'];
    wordWrap?: React.CSSProperties['wordWrap'];
  }
}
