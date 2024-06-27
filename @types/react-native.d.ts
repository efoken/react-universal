import 'react-native';

declare module 'react-native' {
  interface TextStyle {
    caretColor?: React.CSSProperties['caretColor'];
    caretShape?: React.CSSProperties['caretShape'];
  }

  interface ViewStyle {
    listStyleType?: React.CSSProperties['listStyleType'];
    touchAction?: React.CSSProperties['touchAction'];
    WebkitBoxOrient?: React.CSSProperties['WebkitBoxOrient'];
    WebkitLineClamp?: React.CSSProperties['WebkitLineClamp'];
    WebkitOverflowScrolling?: React.CSSProperties['WebkitOverflowScrolling'];
    whiteSpace?: React.CSSProperties['whiteSpace'];
    wordWrap?: React.CSSProperties['wordWrap'];
  }
}
