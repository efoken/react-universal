import 'react-native';

declare module 'react-native' {
  interface ViewStyle {
    WebkitBoxOrient?: React.CSSProperties['WebkitBoxOrient'];
    WebkitLineClamp?: React.CSSProperties['WebkitLineClamp'];
    WebkitOverflowScrolling?: React.CSSProperties['WebkitOverflowScrolling'];
  }
}
