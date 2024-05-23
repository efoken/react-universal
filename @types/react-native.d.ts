import 'react-native';

declare module 'react-native' {
  interface ViewStyle {
    boxSizing?: React.CSSProperties['boxSizing'];
    listStyleType?: React.CSSProperties['listStyleType'];
    textOverflow?: React.CSSProperties['textOverflow'];
    WebkitLineClamp?: React.CSSProperties['WebkitLineClamp'];
    whiteSpace?: React.CSSProperties['whiteSpace'];
    wordWrap?: React.CSSProperties['wordWrap'];
  }
}
